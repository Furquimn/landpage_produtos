document.getElementById('form_produto').addEventListener('submit', (event) => {
    event.preventDefault();


    const form = event.target;
    const formData = new FormData(form);

    fetch('http://localhost:3000/api/produtos', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('feedback_sistema').textContent = 'Produto salvo com ID: ' + data.id;
            form.reset();
            carregarProdutos();
        })
        .catch(error => {
            console.error('Erro ao enviar produto', error);
            document.getElementById('feedback_sistema').textContent = 'Erro ao enviar produto';
        });
});

function carregarProdutos() {
    fetch('http://localhost:3000/api/produtos')
        .then(response => response.json())
        .then(data => {
            const produtosContainer = document.getElementById('produtos_container');
            produtosContainer.innerHTML = '';

            data.forEach(produto => {
                const cardProduto = document.createElement('div')
                cardProduto.classList.add("card_produto");

                const produtoImg = document.createElement('img');
                produtoImg.src = produto.imagem;
                produtoImg.alt = produto.titulo;

                const produtoTitulo = document.createElement('h2');
                produtoTitulo.textContent = produto.titulo;

                const produtoDescricao = document.createElement('p');
                produtoDescricao.textContent = produto.descricao;

                const produtoBtn = document.createElement('a');
                produtoBtn.href = produto.link;
                produtoBtn.textContent = "veja o produto"

                const botaoExcluir = document.createElement('button');
                botaoExcluir.textContent = 'Excluir';
                botaoExcluir.addEventListener('click', () => deletarProduto(produto.id));

                cardProduto.appendChild(produtoImg);
                cardProduto.appendChild(produtoTitulo);
                cardProduto.appendChild(produtoDescricao);
                cardProduto.appendChild(produtoBtn);
                cardProduto.appendChild(botaoExcluir);
                

                produtosContainer.appendChild(cardProduto);
            });
        })
        .catch(error => console.error('Erro ao carregar Json', error));
}

function deletarProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        fetch(`http://localhost:3000/api/produtos/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    carregarProdutos();
                } else {
                    alert("Erro ao deletar o produto.");
                }
            })
            .catch(error => console.error('Erro ao deletar produto:', error));
    }
}

carregarProdutos();