function calcTax(n) {

    var tax

    if (!underscoreGS._isNumber(n)){
        return 'not a number'
    }

    if (n <= 100000) {
        tax = (n/100) * 4
        return tax < 2000 ? 2000 : Math.ceil(tax)
    }

    if (n > 100000 && n <= 200000) {
        var o = n - 100000
        tax = (Math.ceil((o/100) * 3)) + 4000
        return tax
    }

    if (n > 200000 && n <= 1000000) {
        var o = n - 200000
        tax = (Math.ceil((o/100) * 2)) + 7000
        return tax
    }

    if (n > 1000000 && n <= 2000000) {
        var o = n - 1000000
        tax = (Math.ceil((o/100) * 1)) + 23000
        return tax
    }

    if (n > 2000000) {
        var o = n - 1000000
        tax = (Math.ceil((o/100) * 0.5)) + 33000
        return tax > 200000 ? 200000 : tax
    }
}