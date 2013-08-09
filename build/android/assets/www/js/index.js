/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {

    // <editor-fold defaultstate="collapsed" desc="MÉTODOS DE ACESSO DIRETO">
    $("#logar").on("click", function() {
        var _nome = $("#cpf").val();
        var _cpf = $("#senha").val();

        if (Login(_nome, _cpf)) {
            $(window.document.location).attr('href', "/html/dadosUsuario.html");
        }
    });
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="REQUISIÇÕES WEBSERVICE">
    function ConsumirWebServiceLogin(cpf, senha) {
        $.support.cors = true;
        $.ajax({
            type: "GET",
            url: "http://177.72.160.246:8082/WebService/ServicoMobile.svc/User/Login/?cpf=" + cpf + "&senha=" + senha,
            dataType: "json",
            cache: false,
            async: false,
            error: function(request, error) {
               alert(error);
            },
            success: function(data, status, req) {
                if (data.WS_LoginResult.Erro === null) {
                    var store = new Lawnchair({name: 'pontoMB'}, function(store) {
                        var user = {
                            key: 'userInfo',
                            cpf: cpf,
                            senha: senha,
                            nome: data.WS_LoginResult.Nome,
                            nasc: data.WS_LoginResult.DtNascimento,
                            pis: data.WS_LoginResult.PIS,
                            funcao: data.WS_LoginResult.Funcao,
                            empresa: data.WS_LoginResult.Empresa
                        };
                        store.save(user);
                        location.href = "html/dadosUsuario.html";
                    });
                }else{
                    alert(data.WS_LoginResult.Erro);
                }
            }
        });
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="CONTROLE">

    function Login(cpf, senha) {
        if (ValidarDadosLogin(cpf, senha)) {
            ConsumirWebServiceLogin(cpf, senha);
        } 
    }

    function ValidarDadosLogin(cpf, senha) {
        if (cpf === "") {
            alert("Digite o Login");
            return false;
        } else if (senha === "") {
            alert("Digite uma senha.");
            return false;
        } else {
            return true;
        }
    }
    // </editor-fold>
});