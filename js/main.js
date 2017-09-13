$(document).ready(function() {

    var sn = SchemeNumber;
    var fn = sn.fn;


    //Faz a chamada pra o proxy, que retorna o JSON
    $.getJSON('proxy.php', function(data) {

        var MAX_BTC = new SchemeNumber('1');

        var page;
        var qntsPaginas = data.length;
        var arrayOfResults = data;


        var totalOfBitcoins = new SchemeNumber('0');
        var totalOfReais = new SchemeNumber('0');
        var foundPrice = false;

        for (page = 0; page < qntsPaginas && !foundPrice; page++) {
            var sell = arrayOfResults[page];


            for (var c = 0; c < sell.length &&
                fn['<'](totalOfBitcoins, MAX_BTC); c++) {

                var bitcoin = new SchemeNumber(sell[c][0]);
                var reais = new SchemeNumber(sell[c][1]);
                var newBitcoinTotal = fn['+'](totalOfBitcoins, bitcoin);


                if (fn['<='](newBitcoinTotal, MAX_BTC)) {
                    totalOfBitcoins = newBitcoinTotal;
                    totalOfReais = fn['+'](totalOfReais, reais);
                } else {
                    var bitcoinToConsider = fn['-'](bitcoin, (fn['-'](newBitcoinTotal, MAX_BTC)));
                    var pricePerBitcoin = fn['/'](reais, bitcoin);
                    var reaisToConsider = fn['*'](bitcoinToConsider, pricePerBitcoin);
                    totalOfBitcoins = fn['+'](totalOfBitcoins, bitcoinToConsider);
                    totalOfReais = fn['+'](totalOfReais, reaisToConsider);

                    foundPrice = fn['/'](totalOfReais, totalOfBitcoins).toFixed(2);
                }
            }
        }


        if (foundPrice) {
            var finalValue = (parseFloat(foundPrice)).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
            $('#bitcoin').val(finalValue);
        }

    });


});