let listaCafe = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let cafe = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaCafe.length; i++) {
        const cafe = listaCafe[i];
        if (cafe.idCafe == chave) {
            cafe.posicaoNaLista = i;
            return listaCafe[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const idCafe = document.getElementById("inputIDcafe").value;
    if (isNaN(idCafe) || !Number.isInteger(Number(idCafe))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputIDcafe").focus();
        return;
    }

    if (idCafe) { // se digitou um idCafe
        cafe = procurePorChavePrimaria(idCafe);
        if (cafe) { //achou na lista
            mostrarDadosCafé(cafe);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputIDcafe").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputIDcafe").focus();

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

    let idCafe;
    if (cafe == null) {
        idCafe = parseInt(document.getElementById("inputIDcafe").value);
    } else {
        idCafe = cafe.idCafe;
    }

    const nomeGrao = document.getElementById("inputGrao").value; 
    const fazendaOrigem = document.getElementById("inputOrigem").value; 
    const notaAvaliacao = parseInt(document.getElementById("inputNota").value); 
    const altitudeMetros = parseInt(document.getElementById("inputAltitude").value);
   
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (idCafe && nomeGrao && fazendaOrigem && nomeGrao && altitudeMetros) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                cafe = new Cafe(idCafe, nomeGrao, fazendaOrigem, notaAvaliacao, altitudeMetros);
                listaCafe.push(cafe);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                cafeAlterado = new Cafe(idCafe, nomeGrao, fazendaOrigem, notaAvaliacao, altitudeMetros);
                listaCafe[cafe.posicaoNaLista] = cafeAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaCafe.length; i++) {
                    if (cafe.posicaoNaLista != i) {
                        novaLista.push(listaCafe[i]);
                    }
                }
                listaCafe = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputIDcafe").focus();
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
            linha.idCafe + " - " +
            linha.nomeGrao + " - " +
            linha.fazendaOrigem + " - " +
            linha.notaAvaliacao + " - " +
            linha.altitudeMetros + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaCafe);
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

// Função para mostrar os dados do cafe nos campos
function mostrarDadosCafe(cafe) {
    document.getElementById("inputIDcafe").value = cafe.idCafe;
    document.getElementById("inputGrao").value = cafe.nomeGrao
    document.getElementById("inputOrigem").value = cafe.fazendaOrigem;
    document.getElementById("inputNota").value = cafe.notaAvaliacao;
    document.getElementById("inputAltitude").value = cafe.altitudeMetros;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputGrao").value = "";
    document.getElementById("inputOrigem").value = "";
    document.getElementById("inputNota").value = "";
    document.getElementById("inputAltitude").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputIDcafe").readOnly = !soLeitura;
    document.getElementById("inputGrao").readOnly = soLeitura;
    document.getElementById("inputOrigem").readOnly = soLeitura;
    document.getElementById("inputNota").readOnly = soLeitura;
    document.getElementById("inputAltitude").readOnly = soLeitura;
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
    document.getElementById("inputIDcafe").focus();
}