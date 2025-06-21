document.addEventListener("DOMContentLoaded", () => {
  if (apiProdutos.getAll().length === 0) {
    const produtosExemplo = [
      {
        id: "1",
        nome: "Smartphone Premium",
        preco: 2999.99,
        estoque: 10,
      },
      {
        id: "2",
        nome: "Notebook Ultrafino",
        preco: 4599.99,
        estoque: 5,
      },
      {
        id: "3",
        nome: "Fones de Ouvido Sem Fio",
        preco: 599.99,
        estoque: 20,
      },
      {
        id: "4",
        nome: "Smartwatch Inteligente",
        preco: 899.99,
        estoque: 8,
      },
    ];
    produtosExemplo.forEach((p) => apiProdutos.create(p));
  }

  renderizarProdutos(apiProdutos.getAll());
  atualizarCarrinho();
  setupUI();
});
