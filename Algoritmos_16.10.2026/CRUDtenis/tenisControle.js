let listaTenis = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let tenis = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaTenis.length; i++) {
        const tenis = listaTenis[i];
        if (tenis.idTenis == chave) {
            tenis.posicaoNaLista = i;
            return listaTenis[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const idTenis = document.getElementById("inputidTenis").value;
    if (isNaN(idTenis) || !Number.isInteger(Number(idTenis))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputidTenis").focus();
        return;
    }

    if (idTenis) { // se digitou um idTenis
        tenis = procurePorChavePrimaria(idTenis);
        if (tenis) { //achou na lista
            mostrarDadosTenis(tenis);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputidTenis").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputidTenis").focus();

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

    let idTenis;
    if (tenis == null) {
        idTenis = parseInt(document.getElementById("inputidTenis").value);
    } else {
        idTenis = tenis.idTenis;
    }

    const marca = document.getElementById("inputMarca").value;
    const modelo = document.getElementById("inputModelo").value;
    const precoRev = parseInt(document.getElementById("inputPreco").value);
    const tamanho = parseInt(document.getElementById("inputTamanho").value);
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (idTenis && marca && modelo && precoRev && tamanho) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                tenis = new Tenis(idTenis, marca, modelo, precoRev, tamanho);
                listaTenis.push(tenis);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                tenisAlterado = new Tenis(idTenis, marca, modelo, precoRev, tamanho);
                listaTenis[tenis.posicaoNaLista] = tenisAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaTenis.length; i++) {
                    if (tenis.posicaoNaLista != i) {
                        novaLista.push(listaTenis[i]);
                    }
                }
                listaTenis = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputidTenis").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

function checkMarca() {
    let listaTenis = [];
    let listagem = "<br>";
    for (let i = 0; i < listaTenis.length; i++) {
        const linha = listaTenis[i];
        listagem +=
            linha.idTenis + " - " +
            linha.marca + " - " +
            linha.modelo + " - " +
            linha.precoRev.toFixed(2) + " - " +
            linha.tamanho + "<br>";


        if (document.gerElementById("inputMarca").value === "nike") {
            document.getElementById("inputMarca").value === "Nike";
        }
        if (document.getElementById("inputMarca").value === "Nike") {
            listaTenis.push(tenis)
        }
    }
    return listagem;
}

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.idTenis + " - " +
            linha.marca + " - " +
            linha.modelo + " - " +
            linha.precoRev.toFixed(2) + " - " +
            linha.tamanho + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaTenis);
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

// Função para mostrar os dados do tenis nos campos
function mostrarDadosTenis(tenis) {
    document.getElementById("inputidTenis").value = tenis.idTenis;
    document.getElementById("inputMarca").value = tenis.marca
    document.getElementById("inputModelo").value = tenis.modelo;
    document.getElementById("inputPreco").value = tenis.preco;
    document.getElementById("inputTamanho").value = tenis.tamanho;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputMarca").value = "";
    document.getElementById("inputModelo").value = "";
    document.getElementById("inputPreco").value = "";
    document.getElementById("inputTamanho").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputidTenis").readOnly = !soLeitura;
    document.getElementById("inputMarca").readOnly = soLeitura;
    document.getElementById("inputModelo").readOnly = soLeitura;
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
    document.getElementById("inputidTenis").focus();
}