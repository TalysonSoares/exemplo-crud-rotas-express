const {pegarUsuarioLogado} = require('../usuario/usuario');
const fs = require('fs');

let carrinho = JSON.parse(fs.readFileSync(__dirname + "/carrinho.json"));

function buscarCarrinhoDoUsuario(token) {
    if (!token) {
        return false;
    }

    let usuario = pegarUsuarioLogado(token);

    let resultado = carrinho.filter(cadaItem => cadaItem.usuario === usuario.id);

    return JSON.stringify(resultado);
}

function addAoCarrinho(token, dados) {
    if(!token) {
        return false;
    }
    let usuario = pegarUsuarioLogado(token);

    let identificadores = carrinho.map(item => item.id)

    let novoId = Math.max(...identificadores) + 1;

    let novoItem = {
        id: novoId,
        produto: dados.produto,
        quantidade: dados.quantidade,
        usuario: usuario.id
    }

    //adicionando novo item ao carrinho
    carrinho.push(novoItem)

    //reescrevendo o arquivo
    fs.writeFileSync(__dirname+'/carrinho.json', JSON.stringify(carrinho));
    return novoItem;
}

module.exports = {
    buscarCarrinhoDoUsuario,
    addAoCarrinho
}
