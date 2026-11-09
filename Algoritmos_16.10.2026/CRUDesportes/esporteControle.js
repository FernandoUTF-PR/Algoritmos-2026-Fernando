let listaJogador = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let jogador = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaJogador.length; i++) {
        const jogador = listaJogador[i];
        if (jogador.idJogador == chave) {
            jogador.posicaoNaLista = i;
            return listaJogador[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const idJogador = document.getElementById("inputIdJogador").value;
    if (isNaN(idJogador) || !Number.isInteger(Number(idJogador))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputIdJogador").focus();
        return;
    }

    if (idJogador) { // se digitou um idJogador
        jogador = procurePorChavePrimaria(idJogador);
        if (jogador) { //achou na lista
            mostrarDadosCafé(jogador);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputIdJogador").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputIdJogador").focus();

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

    let idJogador;
    if (jogador == null) {
        idJogador = parseInt(document.getElementById("inputIdJogador").value);
    } else {
        idJogador = jogador.idJogador;
    }

    const nickname = document.getElementById("inputApel").value; 
    const jogoPrincipal = document.getElementById("inputPrincipal").value; 
    const quantidadeVitorias = parseInt(document.getElementById("inputNota").value); 
    const taxaDeVitoria = parseInt(document.getElementById("inputVitoria").value);
   
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (idJogador && nickname && jogoPrincipal && nickname && taxaDeVitoria) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                jogador = new Jogador(idJogador, nickname, jogoPrincipal, quantidadeVitorias, taxaDeVitoria);
                listaJogador.push(jogador);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                jogadorAlterado = new Jogador(idJogador, nickname, jogoPrincipal, quantidadeVitorias, taxaDeVitoria);
                listaJogador[jogador.posicaoNaLista] = jogadorAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaJogador.length; i++) {
                    if (jogador.posicaoNaLista != i) {
                        novaLista.push(listaJogador[i]);
                    }
                }
                listaJogador = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputIdJogador").focus();
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
            linha.idJogador + " - " +
            linha.nickname + " - " +
            linha.jogoPrincipal + " - " +
            linha.quantidadeVitorias + " - " +
            linha.taxaDeVitoria + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaJogador);
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

// Função para mostrar os dados do jogador nos campos
function mostrarDadosJogador(jogador) {
    document.getElementById("inputIdJogador").value = jogador.idJogador;
    document.getElementById("inputApel").value = jogador.nickname
    document.getElementById("inputPrincipal").value = jogador.jogoPrincipal;
    document.getElementById("inputNota").value = jogador.quantidadeVitorias;
    document.getElementById("inputVitoria").value = jogador.taxaDeVitoria;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputApel").value = "";
    document.getElementById("inputPrincipal").value = "";
    document.getElementById("inputNota").value = "";
    document.getElementById("inputVitoria").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputIdJogador").readOnly = !soLeitura;
    document.getElementById("inputApel").readOnly = soLeitura;
    document.getElementById("inputPrincipal").readOnly = soLeitura;
    document.getElementById("inputNota").readOnly = soLeitura;
    document.getElementById("inputVitoria").readOnly = soLeitura;
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
    document.getElementById("inputIdJogador").focus();
}