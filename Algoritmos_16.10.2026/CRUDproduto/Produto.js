class Produto {
    constructor(idProduto, nome, quantidadeNoEstoque, pesoMedioUnitario, posicaoNaLista) {
        this.numero = idProduto;
        this.nome = nome;
        this.quantidadeNoEstoque = quantidadeNoEstoque;
        this.pesoMedioUnitario = pesoMedioUnitario;
        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}