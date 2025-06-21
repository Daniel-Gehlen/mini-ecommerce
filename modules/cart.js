function renderizarCarrinho() {
    const carrinho = apiCarrinho.get();
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    carrinho.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="https://picsum.photos/80/80?random=${index}" alt="${item.produto.nome}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.produto.nome}</h4>
                <p class="cart-item-price">R$ ${(item.produto.preco * item.quantidade).toFixed(2)}</p>
                <div class="cart-item-actions">
                    <button class="quantity-btn minus" data-id="${item.produto.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantidade}" min="1" max="${item.produto.estoque}" data-id="${item.produto.id}">
                    <button class="quantity-btn plus" data-id="${item.produto.id}">+</button>
                    <button class="remove-item" data-id="${item.produto.id}">Remover</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

  document.querySelectorAll(".plus").forEach((button) => {
    button.addEventListener("click", (e) => {
      const produtoId = e.target.getAttribute("data-id");
      const item = carrinho.find((item) => item.produto.id === produtoId);
      if (item && item.quantidade < item.produto.estoque) {
        apiCarrinho.update(produtoId, item.quantidade + 1);
        renderizarCarrinho();
        atualizarCarrinho();
      }
    });
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const produtoId = e.target.getAttribute("data-id");
      const novaQuantidade = parseInt(e.target.value);
      const item = carrinho.find((item) => item.produto.id === produtoId);

      if (item) {
        if (novaQuantidade > item.produto.estoque) {
          e.target.value = item.produto.estoque;
          apiCarrinho.update(produtoId, item.produto.estoque);
        } else if (novaQuantidade < 1) {
          e.target.value = 1;
          apiCarrinho.update(produtoId, 1);
        } else {
          apiCarrinho.update(produtoId, novaQuantidade);
        }
        renderizarCarrinho();
        atualizarCarrinho();
      }
    });
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const produtoId = e.target.getAttribute("data-id");
      apiCarrinho.remove(produtoId);
      renderizarCarrinho();
      atualizarCarrinho();
    });
  });
}

function atualizarCarrinho() {
  const totalItems = apiCarrinho.getTotalItems();
  document.getElementById("cartCount").textContent = totalItems;
}
