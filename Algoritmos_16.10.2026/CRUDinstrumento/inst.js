class Instrumento{
    constructor(idInstrumento, nome, tipoInstrumento, material, preco, posicaoNaLista) {
        this.idInstrumento = idInstrumento; //idLivro
        this.nome = nome; //titulo
        this.tipoInstrumento = tipoInstrumento; //autor
        this.material = material; //numeroPaginas
        this.preco = preco; 
        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}