class Planta {
    constructor(idPlanta, nomeCientifico, nomePopular, FrequenciaRegaDias, preco, posicaoNaLista) {
        this.idPlanta = idPlanta; //idLivro
        this.nomeCientifico = nomeCientifico; //titulo
        this.nomePopular = nomePopular; //autor
        this.FrequenciaRegaDias = FrequenciaRegaDias; //numeroPaginas
        this.preco = preco; 
        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}