// Compiled using ts2gas 3.4.4 (TypeScript 3.6.3)
var exports = exports || {};
var module = module || { exports: exports };
function isExistClient(email, fs) {
    var clients = fs.query("clients/").where("email", "==", email).execute();
    if (clients.length !== 0) {
        return true;
    }
    else {
        return false;
    }
}
