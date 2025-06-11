fetch('produtos.json')
        .then(response => response.json())
        .then(data => {
            const produtosContainer = document.getElementById('produtos_container');

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

                cardProduto.appendChild(produtoImg);
                cardProduto.appendChild(produtoTitulo);
                cardProduto.appendChild(produtoDescricao);
                cardProduto.appendChild(produtoBtn);

                produtosContainer.appendChild(cardProduto);
            });
        })
        .catch(error => console.error('Erro ao carregar Json', error));