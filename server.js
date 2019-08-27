const utils = require('./token/ali_token/utils/utils')
const model = require('./token/ali_token/handle/model/model')
const contracts = require('./token/ali_token/handle/modify/contracts')
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/api/contracts/createContract', async function(req, res){
    console.log("createContract")
    var contract_name = req.body.contract_name
    var content = JSON.stringify(req.body.content)
    var created = Date.now().toString()
    var result = await contracts.createContract(res,contract_name,content,created)
    var createTable = await contracts.createTable(res,req.body.contract_name,req.body.content)
});

app.get('/api/contracts/queryContracts',async function(req,res){
    console.log("queryContracts")
    var result = await contracts.queryContracts(res)
})

/*
app.post('/api/contracts/deployContract', async function(req, res){
    console.log("deployContract")
    var id = req.body.id
    var result = await deploy.deployContract(res,id)
});
*/

app.post('/api/models/saveData',async function(req,res){
    console.log("saveData")
    var result = await model.batchSaveData(res,req.body.contract_name,req.body.content) 
});


app.get('/api/models/queryData',async function(req,res){
    console.log("queryData")
    var result = await model.queryData(res,req.body.contract_name,req.body.filter)
});


http.createServer(app).listen(3000, function(){
    console.log("server start");
});
