let listaPelucia = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let pelucia = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaPelucia.length; i++) {
        const pelucia = listaPelucia[i];
        if (pelucia.idPelucia == chave) {
            pelucia.posicaoNaLista = i;
            return listaPelucia[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const idPelucia = document.getElementById("inputIDpelucia").value;
    if (isNaN(idPelucia) || !Number.isInteger(Number(idPelucia))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputIDpelucia").focus();
        return;
    }

    if (idPelucia) { // se digitou um idPelucia
        pelucia = procurePorChavePrimaria(idPelucia);
        if (pelucia) { //achou na lista
            mostrarDadosVeiculo(pelucia);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputIDpelucia").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputIDpelucia").focus();

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

    let idPelucia;
    if (pelucia == null) {
        idPelucia = parseInt(document.getElementById("inputIDpelucia").value);
    } else {
        idPelucia = pelucia.idPelucia;
    }

    const nome = document.getElementById("inputNome").value;
    const personagem = document.getElementById("inputPersonagem").value;
    const preco = parseInt(document.getElementById("inputPreco").value);
    const TamanhoCM = parseInt(document.getElementById("inputTamanho").value);

    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (idPelucia && personagem && nome && preco && TamanhoCM) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                pelucia = new Pelucia(idPelucia, personagem, nome, preco, TamanhoCM);
                listaPelucia.push(pelucia);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                peluciaAlterado = new Pelucia(idPelucia, personagem, nome, preco, TamanhoCM);
                listaPelucia[pelucia.posicaoNaLista] = celularAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaPelucia.length; i++) {
                    if (pelucia.posicaoNaLista != i) {
                        novaLista.push(listaPelucia[i]);
                    }
                }
                listaPelucia = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputIDpelucia").focus();
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
            linha.idPelucia + " - " +
            linha.nome + " - " +
            linha.personagem + " - " +
            linha.TamanhoCM + " - " +
            linha.preco + " <br> " ;
            
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaPelucia);
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

// Função para mostrar os dados do pelucia nos campos
function mostrarDadosVeiculo(pelucia) {
    document.getElementById("inputIDpelucia").value = pelucia.idPelucia;
    document.getElementById("inputNome").value = pelucia.modelo;
    document.getElementById("inputPreco").value = pelucia.preco;
    document.getElementById("inputTamanho").value = pelucia.TamanhoCM;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputPersonagem").value = "";
    document.getElementById("inputPreco").value = "";
    document.getElementById("inputTamanho").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputIDpelucia").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputPersonagem").readOnly = soLeitura;
    document.getElementById("inputPreco").readOnly = soLeitura;
    document.getElementById("inputTamanho").readOnly = soLeitura;
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
    document.getElementById("inputIDpelucia").focus();
}