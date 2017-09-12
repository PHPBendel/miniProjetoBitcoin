$(document).ready(function(){


//Faz a chamada pra o proxy, que retorna o JSON
$.getJSON('proxy.php', function(data) {

    var xbt = data.best_offer["xbt-brl"]; //Seleciona a propriedade no JSON
    
    //Faz a formatação para mostrar o valor correto
    //Segundo valor / Primeiro valor
    var div = xbt.split("/"); 
    var bitcoins  = parseFloat(div[1]) / parseFloat(div[0]);              

    //Faz o tratamento para mostrar o valor no formato de moeda correto
    var num = 'R$ ' + bitcoins.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");  

    //Passa o valor para o  input
    $('#bitcoin').val(num);
});

});