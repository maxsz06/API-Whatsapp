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
app.get("/v1/senai/dados/mensagens-trocadas/palavra-chave/:palavra",function(request, response){
  let palavra = request.params.palavra
  let infoFiltroPalavra = contatosWhats.pesquisarPalavraChave(palavra)

  if(infoFiltroPalavra.status){
    response.status(200).json(infoFiltroPalavra)
    }else{
      response.status(404);
      response.json({ mesage: "Palavra não Encontrada!!" });
    }
})

app.get ('/v1/senai/dados/user/mensagens-trocadas/:number',function(request, response){
  let number = request.params.number 
  number = number.trim().replace(/\s+/g, "")
  let infoMensagens = contatosWhats.getMensagensTrocadas(number)

  if(infoMensagens.status){
    response.status(200).json(infoMensagens)
    }else{
      response.status(404);
      response.json({ mesage: "Numero não encontrado!!" });
    }
})

app.get("/v1/senai/dados/mensagens-trocadas/numero/:number/",function(request, response){ // Resposnavel por mostrar Mensagens trocadas pelo Usuario  pelo paramentro (numero,nomeContato)
  let number = request.params.number
  let nome = request.query.nomeContato
  number = number.trim().replace(/\s+/g, "")
  let infoMensagemUser = contatosWhats.listarMensagens(number,nome) 

  if(infoMensagemUser.status){
    response.status(200).json(infoMensagemUser)
    }else{
      response.status(404);
      response.json({ mesage: "Numero não encontrado!!" });
    }

})

app.get("/v1/senai/dados/contato/user/numero/:number", function (request, response) {  
  let number = request.params.number
  number = number.trim().replace(/\s+/g, "")  //  reatribui o resultado

  let infoContact = contatosWhats.getdadosContatosUser(number)

  if (infoContact.status) {
      response.status(200).json(infoContact)
  } else {
      response.status(404).json({ mesage: "Numero não encontrado!!" })
  }
})

app.get("/v1/senai/dados/usuario/numero/:number",function(request, response){ // End point Responsavel por pegar dados do Perfil pelo (numero)
  let number = request.params.number
  number = number.trim().replace(/\s+/g, "")
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

app.get("/v1/senai/help", function (request, response) {
  let docAPI = {
    "API-description": "API para manipular dados de contatos e mensagens do WhatsApp",
    Date: "2026-04-15",
    Development: "Maxwillian Santana",
    GitHub: "https://github.com/maxsz06",
    Linkedin: "https://www.linkedin.com/in/maxw06",
    Version: "1.0",
    "Endpoints:": [
      {
        id: 1,
        rota: "/v1/senai/list/usuarios",
        obs: "Retorna a lista de todos os usuários cadastrados",
      },
      {
        id: 2,
        rota: "/v1/senai/dados/usuario/numero/:number",
        obs: "Retorna os dados do perfil filtrando pelo número do usuário",
      },
      {
        id: 3,
        rota: "/v1/senai/dados/contato/user/numero/:number",
        obs: "Retorna os dados dos contatos de um usuário filtrando pelo número",
      },
      {
        id: 4,
        rota: "/v1/senai/dados/user/mensagens-trocadas/:number",
        obs: "Retorna todas as mensagens trocadas por um usuário filtrando pelo número",
      },
      {
        id: 5,
        rota: "/v1/senai/dados/mensagens-trocadas/numero/:number?nomeContato=",
        obs: "Retorna mensagens trocadas filtrando pelo número e opcionalmente pelo nome do contato (query: nomeContato)",
      },
      {
        id: 6,
        rota: "/v1/senai/dados/mensagens-trocadas/palavra-chave/:palavra",
        obs: "Retorna mensagens que contenham a palavra-chave informada",
      },
    ],
  };

  response.json(docAPI);
});



//------------------------------------------------------------------------------------------------------

const PORT = process.env.PORT || 8080
app.listen(PORT, function () {
  console.log("API FUNCIONANDO E AGUARDANDO NOVAS REQUISIÇÕES ...");
});