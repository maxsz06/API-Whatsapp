/**********************************************************
 * Autor: Maxwillian Santana
 * Objetivo: Filtrar informações do arquivo contatos.js
 * Data 08/04/2026
 *********************************************************/

const whatsinfo = require("./contatos.js");

function getListadeUsuarios() {
  let status = false;
  let usuarios = [];
  let contatos = [];


  whatsinfo.contatos["whats-users"].forEach(function (dadoUser) {
    status = true;

    dadoUser.contacts.forEach(function(listaDeContatos){
        contatos.push(listaDeContatos.name)
    })

     usuarios.push({
        "status":status,
        "dados-user":dadoUser.account,
        "nome-user":dadoUser.nickname,
        "data-criacao":dadoUser["created-since"],
        "foto":dadoUser["profile-image"],
        "numero": dadoUser.number,
        "foto-fundo":dadoUser.background,
        "contatos":contatos
     });
    });

  return {usuarios,status};
}

function getDadosProfile(number){

    let status = false
    let usuarios = [];
    const numeroUser = number
    
    whatsinfo.contatos["whats-users"].forEach(function(dadoUser){
        if(dadoUser.number == numeroUser){
            status = true

            usuarios.push({
              "status":  status,
              "conta": dadoUser.account,
              "nome-conta": dadoUser.nickname,
              "data-criação": dadoUser["created-since"],
              "numero": dadoUser.number,
              "papel-parede": dadoUser.background
         })
        }
    })
    return {status,dados: usuarios}
}

function getdadosContatosUser(number) {
    let dadoContatos = []
    let status = false
    const numeroUser = number
    let usuario = {}

    whatsinfo.contatos["whats-users"].forEach(function (dadoUser) {
        if (dadoUser.number == numeroUser) {
            status = true

            dadoUser.contacts.forEach(function (infoContato) {
                dadoContatos.push({
                    "nome": infoContato.name,
                    "imagem": infoContato.image,
                    "descrição": infoContato.description
                })
            })

            usuario = {
                "nome-user": dadoUser.account,
                "numero": dadoUser.number,
                "contatos": dadoContatos
            }
        }
    })

    return { status, dados: usuario }
}

function getMensagensTrocadas(number) {
    let contatoUser = []
    let mensagens = []
    let status = false
    const numeroUser = number
    let usuario = {}

    whatsinfo.contatos["whats-users"].forEach(function (dadosUser) {
        if (dadosUser.number == numeroUser) {
            status = true

            dadosUser.contacts.forEach(function (dadosContatos) {
                contatoUser.push(dadosContatos.name)

                dadosContatos.messages.forEach(function (infoMensagens) {
                    mensagens.push({
                        "remetente": infoMensagens.sender,
                        "mensagem": infoMensagens.content,
                        "horário": infoMensagens.time
                    })
                })

                usuario = {
                    "nome-user": dadosUser.account,
                    "contato": dadosContatos.name,
                    "mensagens": mensagens
                }
            })
        }
    })

    return { status, dados: usuario }
}


function listarMensagens(number,nameConversa){

    const numeroUser = number
    let status = false
    let usuario = []
    let mensagens = []


    whatsinfo.contatos["whats-users"].forEach(function(dadosUser){

        if(dadosUser.number == numeroUser){
            status = true

            dadosUser.contacts.forEach(function(dadosContatos){
                if(nameConversa.toUpperCase() == dadosContatos.name.toLocaleUpperCase()){

                    dadosContatos.messages.forEach(function(infoMensagens){
                        mensagens.push({
                            "nome-contato":dadosContatos.name,
                            "remetente": infoMensagens.sender,
                            "mensagem": infoMensagens.content,
                            "horário": infoMensagens.time
                        })
                    })
                }
            })
        }
        usuario = {
            "nome": dadosUser.account,
            "numero": dadosUser.number,
            "conversas": mensagens
        }
    })
    return {status,usuario}
}

function pesquisarPalavraChave(palavra) {
    let status = false
    let resultado = []  // array em vez de objeto

    whatsinfo.contatos["whats-users"].forEach(function (dadosUser) {
        dadosUser.contacts.forEach(function (contatos) {
            contatos.messages.forEach(function (infoMensagens) {
                if (infoMensagens.content.toUpperCase().includes(palavra.toUpperCase())) {
                    resultado.push({   // push em vez de atribuição
                        "contato": contatos.name,
                        "mensagem": infoMensagens.content
                    })
                    status = true
                }
            })
        })
    })

    return { status, dados: resultado }
}

module.exports={
    getListadeUsuarios,
    getDadosProfile,
    getdadosContatosUser,
    getMensagensTrocadas,
    listarMensagens,
    pesquisarPalavraChave
}
