import { useContext } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

//   Essa função tem o objetivo de mudar a quantidade de itens que foram add ou removidos do carrinho
  function mudarQuantidade(id, quantidade) {
    carrinho.map((itemDoCarrinho) =>{
        if (itemDoCarrinho.id === id) {
            itemDoCarrinho.quantidade += quantidade;
            return itemDoCarrinho;
        }
    })
  }


//   Essa e a função responsável por add um produto ao carrinho
  function addProduto(novoProduto) {
    const jaTemOProduto = carrinho.some((itemDoCarrinho) => {
      return itemDoCarrinho.id === novoProduto.id;
    });

    if (!jaTemOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }

    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1)

    setCarrinho( [...carrinhoAtualizado]);
  }

//   Essa e a função responsável por add um produto ao carrinho
  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    const oUltimo = produto.quantidade === 1;
    if (oUltimo) {
      return setCarrinho((carrinhoAnterior) => {
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id);
      });
    }

    const carrinhoAtualizado = mudarQuantidade(id, -1)

    setCarrinho([...carrinhoAtualizado]);
  }

  return {
    carrinho,
    setCarrinho,
    addProduto,
    removerProduto
  };
};
