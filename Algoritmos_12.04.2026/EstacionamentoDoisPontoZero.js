function funcaoTempo() {

    let grande = document.getElementById("veiculoGrande").checked;
    let frequente = document.getElementById("clienteFrequente").checked;

    let inicio = new Date(document.getElementById("dataInicio").value);
    let fim = new Date(document.getElementById("dataFim").value);

    let footer = document.getElementById("footer");
    let mensagem = document.getElementById("mensagem");

    // Validação
    if (!inicio || !fim || isNaN(inicio) || isNaN(fim) || fim <= inicio) {
        footer.classList.add("erro");
        mensagem.innerHTML = "Informe datas válidas";
        document.getElementById("respTempo").innerHTML = "-";
        return;
    }

    // Diferença em horas
    let diferencaMs = fim - inicio;
    let tempo = diferencaMs / (1000 * 60 * 60); // ms → horas

    // Arredondar para cima (ex: 1h10min = 2h)
    tempo = Math.ceil(tempo);

    // Cálculo base (igual ao seu)
    let tempoT = ((tempo - 1) * 2.50) + 5.00;

    // Ajustes
    if (grande) {
        tempoT += tempoT * 0.25;
        mensagem.innerHTML = "Preço com veículo grande";
    } 
    else if (frequente) {
        tempoT -= tempoT * 0.05;
        mensagem.innerHTML = "Preço com cliente frequente";
    } 
    else {
        mensagem.innerHTML = "Preço normal";
    }

    footer.classList.remove("erro");
    document.getElementById("respTempo").innerHTML = tempoT.toFixed(2);
}