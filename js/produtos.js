"use strict";

const url = `http://10.107.142.2:8080/produtos`;

const getProdutos = async () =>{
    const response = await fetch(url);
    return response.json();
};

const postProduto = (produto) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(produto),
        headers: {
            'content-type': 'application/json'
        }
    };

    fetch(url, options);
};

const deletarProduto = (id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    };

    fetch(`${url}/${id}`,options);
}

const putProduto = (produto) => {
    const id = produto.id;

    const options = {
        method: 'PUT',
        body: JSON.stringify(produto),
        headers: {
            'content-type': 'application/json'
        }
    }

    fetch(`${url}/${id}`, options);
};

export {getProdutos, postProduto, deletarProduto};