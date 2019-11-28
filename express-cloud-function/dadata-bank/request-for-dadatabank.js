exports.requestForDadataBank = function (req, res) {
    let resData = {}
    const data = req.body.data
    resData.nameBank = data.name.payment
    resData.corrAccount = data.correspondent_account
    resData.bic = data.bic

    res.send(JSON.stringify(resData))
}