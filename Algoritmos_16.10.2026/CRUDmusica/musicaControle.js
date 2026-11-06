let listaMusica = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let musica = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaMusica.length; i++) {
        const musica = listaMusica[i];
        if (musica.idMusica == chave) {
            musica.posicaoNaLista = i;
            return listaMusica[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const idMusica = document.getElementById("inputIDmusica").value;
    if (isNaN(idMusica) || !Number.isInteger(Number(idMusica))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputIDmusica").focus();
        return;
    }

    if (idMusica) { // se digitou um idMusica
        musica = procurePorChavePrimaria(idMusica);
        if (musica) { //achou na lista
            mostrarDadosMusica(musica);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputIDmusica").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputIDmusica").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let idMusica;
    if (musica == null) {
        idMusica = parseInt(document.getElementById("inputIDmusica").value);
    } else {
        idMusica = musica.idMusica;
    }

    const titulo = document.getElementById("inputTitulo").value;
    const artista = document.getElementById("inputArtista").value;
    const genero = document.getElementById("inputGenero").value;
    const duracaoEmSegundos = parseInt(document.getElementById("inputDuracao").value);

    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (idMusica && titulo && artista && genero && duracaoEmSegundos) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                musica = new Musica(idMusica, titulo, artista, genero, duracaoEmSegundos);
                listaMusica.push(musica);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                musicaAlterado = new Musica(idMusica, titulo, artista, genero, duracaoEmSegundos);
                listaMusica[musica.posicaoNaLista] = musicaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaMusica.length; i++) {
                    if (musica.posicaoNaLista != i) {
                        novaLista.push(listaMusica[i]);
                    }
                }
                listaMusica = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputIDmusica").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.idMusica + " - " +
            linha.titulo + " - " +
            linha.artista + " - " +
            linha.duracaoEmSegundos + " - " +
            linha.genero + " <br> " ;
            
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaMusica);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do musica nos campos
function mostrarDadosMusica(musica) {
    document.getElementById("inputIDmusica").value = musica.idMusica;
    document.getElementById("inputArtista").value = musica.artista;
    document.getElementById("inputTitulo").value = musica.titulo;
    document.getElementById("inputGenero").value = musica.genero;
    document.getElementById("inputDuracao").value = musica.duracaoEmSegundos;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputArtista").value = "";
    document.getElementById("inputTitulo").value = "";
    document.getElementById("inputGenero").value = "";
    document.getElementById("inputDuracao").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputIDmusica").readOnly = !soLeitura;
    document.getElementById("inputArtista").readOnly = soLeitura;
    document.getElementById("inputTitulo").readOnly = soLeitura;
    document.getElementById("inputGenero").readOnly = soLeitura;
    document.getElementById("inputDuracao").readOnly = soLeitura;
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputIDmusica").focus();
}