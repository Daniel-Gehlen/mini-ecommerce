function renderizarProdutos(produtos) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  if (produtos.length === 0) {
    grid.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  produtos.forEach((produto, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="https://picsum.photos/300/200?random=${index}" alt="${
      produto.nome
    }" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${produto.nome}</h3>
                <p class="product-price">R$ ${produto.preco.toFixed(2)}</p>
                <p class="product-stock">Estoque: ${produto.estoque}</p>
                <button class="add-to-cart" data-id="${produto.id}" ${
      produto.estoque <= 0 ? "disabled" : ""
    }>
                    ${
                      produto.estoque <= 0
                        ? "Sem estoque"
                        : "Adicionar ao carrinho"
                    }
                </button>
            </div>
        `;
    grid.appendChild(card);
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const produtoId = e.target.getAttribute("data-id");
      const produto = apiProdutos.getById(produtoId);
      apiCarrinho.add(produto);
      atualizarCarrinho();
      alert("Produto adicionado ao carrinho!");
    });
  });
}

function editarProduto(produtoId) {
  const produto = apiProdutos.getById(produtoId);
  if (produto) {
    produtoEditando = produto;
    document.getElementById("productId").value = produto.id;
    document.getElementById("productName").value = produto.nome;
    document.getElementById("productPrice").value = produto.preco;
    document.getElementById("productStock").value = produto.estoque;
    document.getElementById("productImage").value = produto.imagem;
    document
      .getElementById("productForm")
      .scrollIntoView({ behavior: "smooth" });
  }
}

function excluirProduto(produtoId) {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    apiProdutos.delete(produtoId);
    renderizarProdutos(apiProdutos.getAll());
  }
}

let produtoEditando = null;
