let listaCelular = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let celular = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaCelular.length; i++) {
        const celular = listaCelular[i];
        if (celular.numero == chave) {
            celular.posicaoNaLista = i;
            return listaCelular[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const numero = document.getElementById("inputIDnumero").value;
    if (isNaN(numero) || !Number.isInteger(Number(numero))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputIDnumero").focus();
        return;
    }

    if (numero) { // se digitou um numero
        celular = procurePorChavePrimaria(numero);
        if (celular) { //achou na lista
            mostrarDadosVeiculo(celular);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputIDnumero").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputIDnumero").focus();

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

    let numero;
    if (celular == null) {
        numero = parseInt(document.getElementById("inputIDnumero").value);
    } else {
        numero = celular.numero;
    }

    const modelo = document.getElementById("inputModelo").value;
    const fabricante = document.getElementById("inputFabricante").value;
    const preco = parseInt(document.getElementById("inputPreco").value);
    const peso = parseInt(document.getElementById("inputPeso").value);
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (numero && fabricante && modelo && preco && peso) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                celular = new Celular(numero, fabricante, modelo, preco, peso);
                listaCelular.push(celular);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                celularAlterado = new Celular(numero, fabricante, modelo, preco, peso);
                listaCelular[celular.posicaoNaLista] = celularAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaCelular.length; i++) {
                    if (celular.posicaoNaLista != i) {
                        novaLista.push(listaCelular[i]);
                    }
                }
                listaCelular = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputIDnumero").focus();
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
            linha.numero + " - " +
            linha.modelo + " - " +
            linha.preco + " - " +
            linha.peso + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaCelular);
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

// Função para mostrar os dados do celular nos campos
function mostrarDadosVeiculo(celular) {
    document.getElementById("inputIDnumero").value = celular.numero;
    document.getElementById("inputModelo").value = celular.modelo;
    document.getElementById("inputPreco").value = celular.preco;
    document.getElementById("inputPeso").value = celular.peso;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputModelo").value = "";
    document.getElementById("inputFabricante").value = "";
    document.getElementById("inputPreco").value = "";
    document.getElementById("inputPeso").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputIDnumero").readOnly = !soLeitura;
    document.getElementById("inputModelo").readOnly = soLeitura;
    document.getElementById("inputFabricante").readOnly = soLeitura;
    document.getElementById("inputPreco").readOnly = soLeitura;
    document.getElementById("inputPeso").readOnly = soLeitura;
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
    document.getElementById("inputIDnumero").focus();
}