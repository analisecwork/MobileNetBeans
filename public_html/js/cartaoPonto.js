/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function() {

    var _cpf;
    var i = 0;
    var qntCartoes;

    $("#btAdiantarMes").attr('disabled', 'disabled');

    $("#btVoltar").click(function() {
        $(window.document.location).attr('href', "dadosUsuario.html");
    });

    var store = new Lawnchair({name: 'pontoMB'}, function(store) {
        store.get('userInfo', function(user) {
            _cpf = user.cpf;
        });
    });

    function GetDadosCartaoPonto() {
        $.support.cors = true;
        $.ajax({
            type: "GET",
            url: "http://177.72.160.246:8082/WebService/ServicoMobile.svc/User/CartaoPonto/?cpf=" + _cpf,
            dataType: "json",
            cache: false,
            async: false,
            error: function(request, error) {
                document.write('Ajax Error: ' + error);
            },
            success: function(data, status, req) {

                if (data.WS_GetCartaoPontoResult[i].qntMesesCartao === 0) {
                    alert("Nâo foram encontradas marcações.")
                    location.href = "dadosUsuario.html";
                } else {
                    for (var j = 0; j < data.WS_GetCartaoPontoResult[i].qntCartoesMes; j++) {
                        qntCartoes = data.WS_GetCartaoPontoResult[i].qntMesesCartao;
                        $("#mes2").text(data.WS_GetCartaoPontoResult[i].mes);
                        $("#tb").last().append("<tr><td>" + data.WS_GetCartaoPontoResult[i].listaCartaoPonto[j].Dia +
                                "<br/>" + data.WS_GetCartaoPontoResult[i].listaCartaoPonto[j].Data + "</td>" +
                                "<td>" + data.WS_GetCartaoPontoResult[i].listaCartaoPonto[j].EntradaSaida1 +
                                "<br/>" + data.WS_GetCartaoPontoResult[i].listaCartaoPonto[j].EntradaSaida2 + "</td>" +
                                "<td>" + data.WS_GetCartaoPontoResult[i].listaCartaoPonto[j].HorasTrabalhadas + "</td>" +
                                "</tr>");
                    }
                }
            }
        });
    }
    GetDadosCartaoPonto();

    $("#btAdiantarMes").click(function() {
        i = parseInt(i) - 1;
        LimparTabela();
        if (i >= 0) {
            GetDadosCartaoPonto();
            $("#btVoltarMes").removeAttr('disabled');
        }
        if (i === 0) {
            $("#btAdiantarMes").attr('disabled', 'disabled');
        }
    });

    $("#btVoltarMes").click(function() {
        i = parseInt(i) + 1;
        LimparTabela();
        if (i <= qntCartoes - 1) {
            GetDadosCartaoPonto();
            $("#btAdiantarMes").removeAttr('disabled');
        }
        if (qntCartoes === 0) {
            $("#btVoltarMes").attr('disabled', 'disabled');
        }
        if (i === qntCartoes - 1) {
            $("#btVoltarMes").attr('disabled', 'disabled');
        }
    });

    function LimparTabela() {
        $("#tb tr").remove();
    }

});

