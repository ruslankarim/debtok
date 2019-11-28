var app = new App()
var firestore = FirestoreApp.getFirestore(Config.firestore.email, Config.firestore.key, Config.firestore.projectId)
app.use(function(req,res,next){
    req.user = 'user'
    next()
})

app.use(function (req,res,next) {
    Logger.log(req.email)
    req.isCient = isExistClient(req.email, firestore)
    next()
})

app.post( '/', function(req, res, next){
    Logger.log(req.isClient)
    if(!req.isClient) res.send('нет')
    const data = {qwe: req.user}
    res.set('content-type','application/json')
    res.send(JSON.stringify(data))
    res.end()
})

app.get( '/isclientexist', function(req, res, next) {
    const data = {qwe: req.isCient}
    res.set('content-type', 'application/json')
    res.send(JSON.stringify(data))
    res.end()
})


function doGet(e) { return app.doGet(e)  }
function doPost(e) { return app.doPost(e) }