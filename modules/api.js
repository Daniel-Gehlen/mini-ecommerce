const apiProdutos = {
  getAll: () => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    return produtos;
  },
  getById: (id) => {
    const produtos = apiProdutos.getAll();
    return produtos.find((p) => p.id === id);
  },
  create: (produto) => {
    const produtos = apiProdutos.getAll();
    produto.id = Date.now().toString();
    produtos.push(produto);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    return produto;
  },
  update: (id, produtoAtualizado) => {
    let produtos = apiProdutos.getAll();
    const index = produtos.findIndex((p) => p.id === id);
    if (index !== -1) {
      produtos[index] = { ...produtos[index], ...produtoAtualizado };
      localStorage.setItem("produtos", JSON.stringify(produtos));
      return produtos[index];
    }
    return null;
  },
  delete: (id) => {
    let produtos = apiProdutos.getAll();
    produtos = produtos.filter((p) => p.id !== id);
    localStorage.setItem("produtos", JSON.stringify(produtos));
  },
  search: (termo) => {
    const produtos = apiProdutos.getAll();
    return produtos.filter((p) =>
      p.nome.toLowerCase().includes(termo.toLowerCase())
    );
  },
};

const apiCarrinho = {
  get: () => {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
  },
  add: (produto, quantidade = 1) => {
    const carrinho = apiCarrinho.get();
    const itemExistente = carrinho.find(
      (item) => item.produto.id === produto.id
    );

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      carrinho.push({ produto, quantidade });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    return carrinho;
  },
  update: (produtoId, quantidade) => {
    const carrinho = apiCarrinho.get();
    const item = carrinho.find((item) => item.produto.id === produtoId);

    if (item) {
      if (quantidade <= 0) {
        return apiCarrinho.remove(produtoId);
      }
      item.quantidade = quantidade;
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
    return carrinho;
  },
  remove: (produtoId) => {
    let carrinho = apiCarrinho.get();
    carrinho = carrinho.filter((item) => item.produto.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    return carrinho;
  },
  clear: () => {
    localStorage.removeItem("carrinho");
    return [];
  },
  getTotal: () => {
    const carrinho = apiCarrinho.get();
    return carrinho.reduce((total, item) => {
      return total + item.produto.preco * item.quantidade;
    }, 0);
  },
  getTotalItems: () => {
    const carrinho = apiCarrinho.get();
    return carrinho.reduce((total, item) => {
      return total + item.quantidade;
    }, 0);
  },
};
