'use strict';

import{openModal, closeModal} from "./modal.js";

import{getProdutos, postProduto, deletarProduto} from "./produtos.js";

import {preview} from "./preview.js";

const criarLinha = ( {foto, nome, preco, categoria, id}) => {
        const linhas = document.createElement('tr');
        linhas.innerHTML = `
        <td>
            <img src="${foto}" class="produto-image" />
        </td>
        
            <td>${nome}</td>
                <td>${preco}</td>
                        <td>${categoria}</td>
            <td>
                           
                <button type="button" class="button green" data-idproduto=${id}>
                    editar
                </button>
                            
                <button type="button" class="button red" data-idproduto=${id}>
                    excluir
                </button>
        </td>
        `;

        return linhas;
}

const carregarProdutos = async () => {
    const container = document.querySelector('.records tbody')
    const produtos = await getProdutos();
    const linhas = produtos.map(criarLinha);
    container.replaceChildren(...linhas)
}

const handleClickTbody = ({target}) => {
    if (target.type === 'button'){
    
    const acaoBotao = target.textContent.trim();

        if(acaoBotao === 'excluir'){
            deletarProduto(target.dataset.idproduto);
            carregarProdutos();
        }
    }
};

carregarProdutos()

const imagemPreview = () => preview ('inputFile', 'imagePreview');

const salvarProduto = () => {
        const produto = {
            nome: document.getElementById('product').value,
            preco: document.getElementById('price').value,
            categoria: document.getElementById('category').value,
            foto: document.getElementById('imagePreview').src
        };

        postProduto(produto);
        closeModal();
        carregarProdutos();
}

//  EVENTOS

document
    .getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('cancel').addEventListener('click', closeModal);

document.getElementById('inputFile').addEventListener('change', imagemPreview);

document.getElementById('save').addEventListener('click', salvarProduto);

document.querySelector('.records tbody').addEventListener('click', handleClickTbody);