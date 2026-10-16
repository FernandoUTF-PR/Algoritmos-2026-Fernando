let listaVeiculo = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let veiculo = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaVeiculo.length; i++) {
        const veiculo = listaVeiculo[i];
        if (veiculo.placa == chave) {
            veiculo.posicaoNaLista = i;
            return listaVeiculo[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const placa = document.getElementById("inputIDplaca").value;
    if (isNaN(placa) || !Number.isInteger(Number(placa))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputIDplaca").focus();
        return;
    }

    if (placa) { // se digitou um placa
        veiculo = procurePorChavePrimaria(placa);
        if (veiculo) { //achou na lista
            mostrarDadosVeiculo(veiculo);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputIDplaca").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputIDplaca").focus();

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

    let placa;
    if (veiculo == null) {
        placa = parseInt(document.getElementById("inputIDplaca").value);
    } else {
        placa = veiculo.placa;
    }

    const marca= document.getElementById("inputMarca").value;
    const modelo = document.getElementById("inputModelo").value;
    const ano = parseInt(document.getElementById("inputAno").value);
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (placa && marca && modelo && ano) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                veiculo = new Veiculo(placa, marca, modelo, ano);
                listaVeiculo.push(veiculo);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                veiculoAlterado = new Veiculo(placa, marca, modelo, ano);
                listaVeiculo[veiculo.posicaoNaLista] = veiculoAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaVeiculo.length; i++) {
                    if (veiculo.posicaoNaLista != i) {
                        novaLista.push(listaVeiculo[i]);
                    }
                }
                listaVeiculo = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputIDplaca").focus();
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
            linha.placa + " - " +
            linha.marca + " - " +
            linha.modelo + " - " +
            linha.ano + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaVeiculo);
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

// Função para mostrar os dados do Veiculo nos campos
function mostrarDadosVeiculo(veiculo) {
    document.getElementById("inputIDplaca").value = veiculo.placa;
    document.getElementById("inputMarca").value = veiculo.marca;
    document.getElementById("inputAno").value = veiculo.ano;
    document.getElementById("inputModelo").value = veiculo.modelo;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputMarca").value = "";
    document.getElementById("inputAno").value = "";
    document.getElementById("inputModelo").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputIDplaca").readOnly = !soLeitura;
    document.getElementById("inputMarca").readOnly = soLeitura;
    document.getElementById("inputAno").readOnly = soLeitura;
    document.getElementById("inputModelo").readOnly = soLeitura;
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
    document.getElementById("inputIDplaca").focus();
}