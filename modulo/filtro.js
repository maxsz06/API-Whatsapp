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

     usuarios.push(
        status,
        dadoUser.account,
        dadoUser.nickname,
        dadoUser["created-since"],
        dadoUser["profile-image"],
        dadoUser.number,
        dadoUser.background,
        contatos
      );

    });

  return usuarios;
}

function getDadosProfile(number){

    let status = false
    let usuarios = [];

    const numeroUser = number

    whatsinfo.contatos["whats-users"].forEach(function(dadoUser){
        if(dadoUser.number == numeroUser){
            status = true

            usuarios.push(
                status,
                dadoUser.account,
                dadoUser.nickname,
                dadoUser["created-since"],
                dadoUser.number,
                dadoUser.background
            )
        }
    })
    return usuarios
}
console.log(getDadosProfile(11987876567))
