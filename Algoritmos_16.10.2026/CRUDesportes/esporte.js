class Jogador {
    constructor(idJogador, nickname, jogoPrincipal, quantidadeVitorias, taxaDeVitoria, posicaoNaLista) {
        this.idJogador = idJogador; //idLivro
        this.nickname = nickname; //titulo
        this.jogoPrincipal = jogoPrincipal; //autor
        this.quantidadeVitorias = quantidadeVitorias; //numeroPaginas
        this.taxaDeVitoria = taxaDeVitoria; 
        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}