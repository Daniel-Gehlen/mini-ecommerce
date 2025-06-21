function setupUI() {
    document.getElementById('cartBtn').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.add('open');
        document.getElementById('overlay').classList.add('active');
        renderizarCarrinho();
    });

    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
    });

    document.getElementById('overlay').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
        document.getElementById('confirmationModal').classList.remove('active');
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        const carrinho = apiCarrinho.get();

        let semEstoque = false;
        carrinho.forEach(item => {
            const produto = apiProdutos.getById(item.produto.id);
            if (item.quantidade > produto.estoque) {
                semEstoque = true;
            }
        });

        if (semEstoque) {
            alert('Alguns itens não têm estoque suficiente. Ajuste as quantidades antes de finalizar a compra.');
            return;
        }

        carrinho.forEach(item => {
            const produto = apiProdutos.getById(item.produto.id);
            apiProdutos.update(produto.id, {
                estoque: produto.estoque - item.quantidade
            });
        });

        apiCarrinho.clear();
        atualizarCarrinho();
        renderizarCarrinho();
        renderizarProdutos(apiProdutos.getAll());

        document.getElementById('confirmationModal').classList.add('active');
        document.getElementById('overlay').classList.add('active');
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('confirmationModal').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    });

    document.getElementById('confirmClose').addEventListener('click', () => {
        document.getElementById('confirmationModal').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    });

    document.getElementById('searchBtn').addEventListener('click', () => {
        const termo = document.getElementById('searchInput').value.trim();
        if (termo) {
            const resultados = apiProdutos.search(termo);
            renderizarProdutos(resultados);
        } else {
            renderizarProdutos(apiProdutos.getAll());
        }
    });

    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const termo = document.getElementById('searchInput').value.trim();
            if (termo) {
                const resultados = apiProdutos.search(termo);
                renderizarProdutos(resultados);
            } else {
                renderizarProdutos(apiProdutos.getAll());
            }
        }
    });

    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const produto = {
            nome: document.getElementById('productName').value,
            preco: parseFloat(document.getElementById('productPrice').value),
            estoque: parseInt(document.getElementById('productStock').value),
            imagem: document.getElementById('productImage').value
        };

        if (produtoEditando) {
            apiProdutos.update(produtoEditando.id, produto);
            produtoEditando = null;
        } else {
            apiProdutos.create(produto);
        }

        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        renderizarProdutos(apiProdutos.getAll());
    });

    document.getElementById('clearForm').addEventListener('click', () => {
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        produtoEditando = null;
    });
}
