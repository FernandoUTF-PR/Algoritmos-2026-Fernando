let listaInstrumento = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let instrumento = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaInstrumento.length; i++) {
        const instrumento = listaInstrumento[i];
        if (instrumento.idInstrumento == chave) {
            instrumento.posicaoNaLista = i;
            return listaInstrumento[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const idInstrumento = document.getElementById("inputIDinst").value;
    if (isNaN(idInstrumento) || !Number.isInteger(Number(idInstrumento))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputIDinst").focus();
        return;
    }

    if (idInstrumento) { // se digitou um idinstrumento
        instrumento = procurePorChavePrimaria(idInstrumento);
        if (instrumento) { //achou na lista
            mostrarDadosInstrumento(Instrumento);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputIDinst").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputIDinst").focus();

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

    let idInstrumento;
    if (instrumento == null) {
        idInstrumento = parseInt(document.getElementById("inputIDinst").value);
    } else {
        idInstrumento = instrumento.idInstrumento;
    }

    const nome = document.getElementById("inputNome").value; 
    const tipoInstrumento = document.getElementById("inputInst").value; 
    const material = document.getElementById("inputMat").value; 
    const preco = parseInt(document.getElementById("inputPreco").value);
   
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (idInstrumento && nome && tipoInstrumento && material && preco) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                instrumento = new Instrumento(idInstrumento, nome, tipoInstrumento, material, preco);
                listaInstrumento.push(instrumento);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                instrumentoAlterado = new Instrumento(idInstrumento, nome, tipoInstrumento, material, preco);
                listaInstrumento[instrumento.posicaoNaLista] = instrumentoAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaInstrumento.length; i++) {
                    if (instrumento.posicaoNaLista != i) {
                        novaLista.push(listaInstrumento[i]);
                    }
                }
                listaInstrumento = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputIDinst").focus();
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
            linha.idInstrumento + " - " +
            linha.nome + " - " +
            linha.tipoInstrumento + " - " +
            linha.material + " - " +
            linha.preco.toFixed(2) + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaInstrumento);
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

// Função para mostrar os dados do instrumento nos campos
function mostrarDadosInstrumento(instrumento) {
    document.getElementById("inputIDinst").value = instrumento.idInstrumento;
    document.getElementById("inputNome").value = instrumento.nome
    document.getElementById("inputInst").value = instrumento.tipoInstrumento;
    document.getElementById("inputMat").value = instrumento.material;
    document.getElementById("inputPreco").value = instrumento.preco;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputInst").value = "";
    document.getElementById("inputMat").value = "";
    document.getElementById("inputPreco").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputIDinst").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputInst").readOnly = soLeitura;
    document.getElementById("inputMat").readOnly = soLeitura;
    document.getElementById("inputPreco").readOnly = soLeitura;
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
    document.getElementById("inputIDinst").focus();
}