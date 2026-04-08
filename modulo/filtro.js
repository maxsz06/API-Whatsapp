/**********************************************************
 * Autor: Maxwillian Santana
 * Objetivo: Filtrar informações do arquivo contatos.js
 * Data 08/04/2026
 *********************************************************/

const whatsinfo = require("./contatos.js");

function getListadeUsuarios() {
  let status = false;

  let usuarios = [];
  let dataCriacao = [];
  let contatos = [];


  
  whatsinfo.contatos["whats-users"].forEach(function (dadoUser) {

    dadoUser.contacts.forEach(function(listaDeContatos){
        contatos.push(listaDeContatos.name)
    })

      usuarios.push(
        dadoUser.account,
        dadoUser.nickname,
        dadoUser["created-since"],
        dadoUser["profile-image"],
        dadoUser.number,
        dadoUser.background,
        contatos
      );

    });
  status = true;

  return usuarios;
}
console.log(getListadeUsuarios());
