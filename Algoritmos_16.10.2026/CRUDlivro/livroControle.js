let listaLivro = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let livro = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaLivro.length; i++) {
        const livro = listaLivro[i];
        if (livro.idLivro == chave) {
            livro.posicaoNaLista = i;
            return listaLivro[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const idLivro = document.getElementById("inputIDlivro").value;
    if (isNaN(idLivro) || !Number.isInteger(Number(idLivro))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputIDlivro").focus();
        return;
    }

    if (idLivro) { // se digitou um idLivro
        livro = procurePorChavePrimaria(idLivro);
        if (livro) { //achou na lista
            mostrarDadoslivro(livro);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputIDlivro").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputIDlivro").focus();

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

    let idLivro;
    if (livro == null) {
        idLivro = parseInt(document.getElementById("inputIDlivro").value);
    } else {
        idLivro = livro.idLivro;
    }

    const autor = document.getElementById("inputAutor").value; 
    const titulo = document.getElementById("inputTitulo").value; 
    const numeroPaginas = parseInt(document.getElementById("inputPaginas").value); 
    const preco = parseInt(document.getElementById("inputPreco").value);
   
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (idLivro && titulo && autor && preco && numeroPaginas) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                livro = new Livro(idLivro, titulo, autor, preco, numeroPaginas);
                listaLivro.push(livro);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                livroAlterado = new Livro(idLivro, titulo, autor, preco, numeroPaginas);
                listaLivro[livro.posicaoNaLista] = livroAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaLivro.length; i++) {
                    if (livro.posicaoNaLista != i) {
                        novaLista.push(listaLivro[i]);
                    }
                }
                listaLivro = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputIDlivro").focus();
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
            linha.idLivro + " - " +
            linha.numeroPaginas + " - " +
            linha.titulo + " - " +
            linha.preco + " - " +
            linha.autor + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaLivro);
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

// Função para mostrar os dados do livro nos campos
function mostrarDadoslivro(livro) {
    document.getElementById("inputIDlivro").value = livro.idLivro;
    document.getElementById("inputPaginas").value = livro.numeroPaginas
    document.getElementById("inputTitulo").value = livro.titulo;
    document.getElementById("inputPreco").value = livro.preco;
    document.getElementById("inputAutor").value = livro.autor;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputPaginas").value = "";
    document.getElementById("inputTitulo").value = "";
    document.getElementById("inputPreco").value = "";
    document.getElementById("inputAutor").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputIDlivro").readOnly = !soLeitura;
    document.getElementById("inputPaginas").readOnly = soLeitura;
    document.getElementById("inputTitulo").readOnly = soLeitura;
    document.getElementById("inputPreco").readOnly = soLeitura;
    document.getElementById("inputAutor").readOnly = soLeitura;
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
    document.getElementById("inputIDlivro").focus();
}