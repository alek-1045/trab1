const express = require("express")
const { response, request } = require("express")
const { Server } = require("http")
const app = express () 

app.use(express.json())

const mercadoria = [ 
    {produtoId: 1012, nome: "Pão", Quantidade:100, valorcompra: 12.00},
    {produtoId: 1014, nome: "Pastel", Quantidade:50, valorcompra: 8.00},
]

const checkmercadoriaInArry = (request, response, next) => {
    const {indice} = request.params

    if(!mercadoria[indice]){
        return response
            .status(400)
            .status({erro: "Não existe Produto com este id"})
    }
    return next()
}


const checkmercadoriaInExist = (request, response, next) =>{
    const {produtoId,nome,quantidade, situação} = request.body
    if(!mercadoria || !nome || !quantidade || !situação){
        return response
             .status(400)
             .json({erro: 'Não existe Produto com este id'})
    }
    return next()
}

app.use((request, response, next)=>{
    console.log('Controle de Estoque da Empresa ABC')
    return next()
})
app.get('/mercadoria',checkmercadoriaInArry, (request, response) =>{
    return response.json(mercadoria)
})

app.get('/mercadoria/:indice', checkmercadoriaInArry,(request, response) => {
    const {indice} = request.params;
    return response.json(mercadoria[indice])
})

app.post('/mercadoria', checkmercadoriaInExist, (request, response)=>{
    const mercadoria = request.body;
    mercadoria.push(mercadoria)
    return response.json(mercadoria)
})
app.put('/mercadoria/:indice',checkmercadoriaInArry, checkmercadoriaInExist,(request, response)=>{
    const {indice} = request.params;
    const mercadoria = request.body
    mercadoria[indice]= mercadoria
    return response.json(mercadoria)
})

app.delete('/mercadoria/:indice',checkmercadoriaInArry, checkmercadoriaInExist,(request, response)=>{
    const { indice } = request.params;
    console.log(mercadoria[indice])
    mercadoria.splice(indice, 1)
    return response.json(mercadoria)
})

app.listen(3333, () => {
    console.log("servidor rodando ")
})


