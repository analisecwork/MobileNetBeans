/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function() {
    CarregarDados();

    function CarregarDados() {
        var store = new Lawnchair({name: 'pontoMB'}, function(store) {
            store.get('userInfo', function(user) {
                $("#lbNomeUser").text(user.nome)
                $("#lbCpfUser").text(user.cpf);
                $("#lbNascUser").text(user.nasc);
                $("#lbPisUser").text(user.pis);
                $("#lbFuncUser").text(user.funcao);
                $("#lbEmpUser").text(user.empresa);
            });
        });
    }
    
    $("#btCartaoPonto").click( function () {
       $(window.document.location).attr('href', "cartaoPonto.html"); 
    });
});