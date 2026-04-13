/***************************************************************
 * Autor: Maxwillian
 * Objetivo: Arquivo Responsavel pela criaçãp da API do Projeto de Estados e Cidades
 * Data: 10/04/2026
 * Versão: 1.0
 * 
 ***************************************************************/

const express = require("express");
const cors = require("cors");
const { METHODS } = require("node:http");

const app = express(); // Criando um objeto para manipular o express

const corsOptions = {
  // Conjunto de permições a serem aplicadas no CORS da API

  origin: ["*"], // A origiem da requisisão, podendo ser um ip ou *(TODOS)
  methods: "GET", // São os verbos que seraão liberados na API (GET,POST,PUT,DELETE)
  allowedHeaders: ["Content-type", "Autorization"], // São Permissãoes de cabeçario do CORS
};

app.use(cors(corsOptions)); // Configura as permissões da API através do CORS

const contatosWhats = require("./modulo/filtro.js")

// ------------------------------------[END POINTS]-----------------------------------------------------


app.get("/v1/senai/dados/mensagens-trocadas/numero/:number",function(request, response){
  let number = request.params.number
  let infoMensagemUser = contatosWhats.getMensagensTrocadas(number) 

  if(infoMensagemUser.status){
    response.status(200).json(infoMensagemUser)
    }else{
      response.status(404);
      response.json({ mesage: "Numero não encontrado!!" });
    }

})

app.get("/v1/senai/dados/contato/user/numero/:number",function(request, response){ // End Point Responsavel por mostrar dados Do contato
  let number = request.params.number
  let infoContact = contatosWhats.getdadosContatosUser(number)

  if(infoContact.status){
    response.status(200).json(infoContact)
    }else{
      response.status(404);
      response.json({ mesage: "Numero não encontrado!!" });
    }
})

app.get("/v1/senai/dados/usuario/numero/:number",function(request, response){ // End point Responsavel por pegar dados do Perfil pelo (numero)
  let number = request.params.number
  let infoNumber = contatosWhats.getDadosProfile(number)

  if(infoNumber.status){
  response.status(200).json(infoNumber)
  }else{
    response.status(404);
    response.json({ mesage: "Numero não encontrado!!" });
  }
})



app.get('/v1/senai/list/usuarios',function(request,response){  // End point Responsavel por pegar as informações de Usuários
  
  let usuarios = contatosWhats.getListadeUsuarios()

  response.status(200).json(usuarios)
})


//------------------------------------------------------------------------------------------------------

app.listen(8080, function () {
  // Serve para inicializar a api para receber requisições
  console.log("API FUNCIONANDO E AGUARDANDO NOVAS REQUISIÇÕES ...");
});

