/**
 * Express router for appscript
 *
 * options:
 *          pathToQuery (true) Will create a '?path=/foo' alias for '/foo'
 *                             This is needed in most cases, since using urlpaths
 *                             (e.pathInfo) will trigger a login-screen eventhough
 *                             the app is deployed with ANYONE_ANONYMOUS-access.
 *                             The rooturl does not trigger this login-screen, which
 *                             allows us to serve multiple endpoints without a login-screen.
 *
 * @param {object} {pathToQuery:true}
 * @return {object} the express app
 */
function App(opts) {

    this.opts = opts || {}
    if( !this.opts.pathToQuery ) this.opts.pathToQuery = true
    this.routes = []

    var Response = function(){
        this._end = false
        this.data = false
        this.headers = {}
        this.send = function(data){
            this.data = data
        }
        this.end = function(){
            this._end = true
        }
        this.set = function(a,b){
            this.headers[ String(a).toLowerCase() ] = b
        }
    }

    var get = function(xs,x) {
        return String(x).split('.').reduce(function(acc, x) {
            if (acc == null) return;
            return acc[x];
        }, xs)
    }

    this.matchRoutePattern = matchRoutePattern = function matchRoutePattern(pattern, fullUrl, req) {
        if( pattern == '*' ) pattern = '.*'
        if( !pattern.match("/:") && pattern.split("/").length == 1 ) pattern = pattern+"/:id" // automatically parse url ids
        var url = fullUrl.split('?')[0]
        var names = []
        var regex = pattern.replace(/:([^/]+)/g, function(name){
            names.push(name.replace(/^:/, ''))
            return '([^/]+)'
        })
            .replace(/\//g, '\\/')
        if( regex == '*' ) return {}
        var r = new RegExp("^"+regex+"$")
        if (!r.test(url)) return {}
        var params = {}
        r.exec(url)
            .slice(1)
            .map(function(p){ params[ names.pop() ] = p })
        if( req ) req.route = pattern
        return params
    }

    this.reply = function(req,res){
        var isString = typeof res.data == "string"
        res.data =  !isString ? JSON.stringify(res.data) : res.data
        var mimetype = String(res.headers['content-type']).replace(/.*\//g,'').toUpperCase()  // JSON,JAVASCRIPT,HTML
        if( isString && mimetype == 'HTML' ) return HtmlService.createTemplate(res.data).evaluate()
        return ContentService.createTextOutput( req.query.callback ? req.query.callback+'('+res.data+')' : res.data)
            .setMimeType( req.query.callback ? ContentService.MimeType.JAVASCRIPT
                : mimetype ? ContentService.MimeType[mimetype] : ContentService.MimeType.JSON)
    }

    this.endpoint = function(method,path,cb,includeInClient){
        var handler = function(method,path,cb,req,res,next){
            req.route  = path
            req.params = matchRoutePattern(path,req.url,req)
            var matchUrl = this.opts.pathToQuery && path.replace && req.url.replace(/\?.*/g,'') == path.replace(/\?.*/g,'')
            var matchUrl = matchUrl ? matchUrl : path.test && path.test(req.url.replace(/\?.*/g,''))
            if( this.opts.debug ) Logger.log('finished='+res._end+' '+method+' '+path+': '+(matchUrl?"match!":"no match"))
            if( !res._end && ((req.method == method && matchUrl) || method == '*') ){
                cb(req,res,next)
                return res
            }else{
                next()
                return res
            }
        }.bind(this,method,path,cb)
        this.routes.push({method:method,path:path,handler:handler,client:includeInClient})
    }

    this.get      = this.endpoint.bind(this,"GET")
    this.post     = this.endpoint.bind(this,"POST")
    this.put      = this.endpoint.bind(this,"PUT")
    this.options  = this.endpoint.bind(this,"OPTIONS")
    this['d'+'elete']   = this.endpoint.bind(this,"DELETE")

    this.use      = this.endpoint.bind(this,"*",'*')

    this.process = function(req){
        var res = new Response()
        for( var i = 0; i < this.routes.length; i++ ){
            var next = false
            res = this.routes[i].handler(req,res,function(){ next = true })
            if( !next || res._end ) break;
        }
        return res
    }

    this.doGet = function(e) {
        var url = e.parameter.path ? e.parameter.path : e.pathInfo ? '/'+e.pathInfo : '/' // workaround because pathInfo doesn't seem to work for non-loggedin/google users (bug?)
        var req = { app:this, method: 'GET', url: url, query:e.parameter, e:e }
        var res = this.process(req)
        return this.reply( req, res )
    }

    this.doPost = function(e){
        var method = 'POST'
        if( this.opts.pathToQuery && e.parameter.method ) method = e.parameter.method
        var url = e.parameter.path ? e.parameter.path : e.pathInfo ? '/'+e.pathInfo : '/' // workaround because pathInfo doesn't seem to work for non-loggedin/google users (bug?)
        var body = get(e,'postData.contents')
            || get(e,'parameter.body')
            || "{}"
        body = body[0]== '{' ? JSON.parse(body) : body
        var req = { app:this, method: method, url: url, query:e.parameter, body: body, e:e }
        return this.reply( req, this.process(req) )
    }

    this.client = function(hook){
        return function(req,res,next){
            var code = '// Gexpress client'
            code += function Gclient(url_backend) {
                this.url_backend = url_backend
                this.request = function(method, url, body, query, headers) {
                    return new Promise( function(resolve, reject) {
                        if( method == 'GET' && body ){
                            query = Object.assign({body:body},query)
                            body = undefined
                        }
                        url = url[0] == '?' || url[0] == '/' ? url = this.url_backend + url : url
                        var q = url.match(/\?/) ? "" : "?"
                        if( query && Object.keys(query).length ) for( var i in query ) q += "&"+i+'='+encodeURIComponent( typeof query[i] == 'string' ? query[i] : JSON.stringify(query[i]) )
                        Gclient.fetch(url+q, {
                            method: method,
                            body: body ? JSON.stringify(body) : undefined,
                            headers: headers,
                            redirect:'follow',
                            mode: 'cors'
                        })
                            .then(function(r) {
                                return r.json()
                            })
                            .then(resolve)['c'+'atch'](reject)
                    })
                }
                this.get = function(path,body,query,headers){
                    return this.request('GET','?path='+path,body,query,headers)
                }
                this.post = function(path,body,query,headers){
                    return this.request('POST','?path='+path,body,query,headers)
                }
                this.put = function(path,body,query,headers){
                    return this.request('POST','?method=PUT&path='+path,body,query,headers)
                }
                this['d'+'elete'] = function(path,body,query,headers){
                    return this.request('POST','?method=DELETE&path='+path,body,query,headers)
                }
                this.options = function(path,body,query,headers){
                    return this.request('POST','?method=OPTIONS&path='+path,body,query,headers)
                }
                return this
            }.toString()+'\n'

            code += 'var gclient = Gclient("'+ ScriptApp.getService().getUrl() + '");\n'

            var globalvar = function(){
                var nodejs = (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
                if( !nodejs ){
                    Gclient.fetch = window.fetch.bind(window)
                    window.gclient = gclient
                }else{
                    module.exports = function(fetch){
                        Gclient.fetch = fetch
                        return gclient
                    }
                }
            }
            code += '('+globalvar.toString().trim()+")();\n\n"


            code = hook ? hook(code) : code

            code += '\n\n// USAGE:\n//\n'
            req.app.routes.map( function(endpoint){
                if( typeof endpoint.path != "string" ) return
                var path = String(endpoint.path + '"                                   ').substr(0,40)
                if( endpoint.method == 'GET'    ) code += '// gclient.get("'+path+').then( console.dir )\n'
                if( endpoint.method == 'POST'   ) code += '// gclient.post("'+path+').then( console.dir )\n'
                if( endpoint.method == 'DELETE' ) code += '// gclient.put("'+path+').then( console.dir )\n'
                if( endpoint.method == 'PUT'    ) code += '// gclient.delete("'+path+').then( console.dir )\n'
                if( endpoint.method == 'OPTIONS') code += '// gclient.options("'+path+').then( console.dir )\n'
            })
            code += '//\n// NOTE: all functions return promises\n'
            res.set('content-type','application/javascript')
            res.send(code)
            res.end()
        }
    }

    return this
}