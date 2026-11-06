class Livro {
    constructor(idLivro, titulo, autor, numeroPaginas, preco, posicaoNaLista) {
        this.idLivro = idLivro;
        this.titulo = titulo;
        this.autor = autor;
        this.numeroPaginas = numeroPaginas;
        this.preco = preco;
        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}