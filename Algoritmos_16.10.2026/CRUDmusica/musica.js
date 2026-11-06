

class Musica {
    constructor(idMusica, titulo, artista, duracaoEmSegundos, genero, posicaoNaLista) {
        this.idMusica = idMusica;
        this.titulo = titulo;
        this.artista = artista;
        this.duracaoEmSegundos = duracaoEmSegundos;
        this.genero = genero;
        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}