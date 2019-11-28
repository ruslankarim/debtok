var Middleware = function() {}

Middleware.prototype.use = function(fn) {
    var self = this
    this.go = (function(stack) {
        return function(next) {
            stack.call(self, function() {
                fn.call(self, next.bind(self))
            });
        }.bind(this)
    })(this.go)
}

Middleware.prototype.go = function(next) {
    next()
}
function Firestore() {
    function firestore(){
        return'firestore'
    }
    return firestore()
}

function Exist(flag) {
    if(flag) return flag
    if(!flag) throw new Error('err')
}

var middleware = new Middleware()

middleware.use(function(next) {
    var self = this
    try{
        self.firestore = Firestore()
    }catch (e) {

    }
    next()
})

middleware.use(function(next) {
    var self = this
    try{
        self.exist = Exist(true)
    }catch (e) {
        console.log(e)
    }
    next()
})

var start = new Date()
middleware.go(function() {
    console.log(this.firestore) // true
    console.log(this.exist)// true
    console.log(new Date() - start) // around 20
})
