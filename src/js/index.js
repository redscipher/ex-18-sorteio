// evento DOM
document.addEventListener('DOMContentLoaded', function(){

    // funcoes
    let sortearNumero = function(e){
        try {
            // para execucao padrao
            e.preventDefault();
            // variaveis
            let numeroMaximo, numeroAleat;
            // valores
            numeroMaximo = document.getElementById('id-numero').value;
            numeroAleat = Math.random() * numeroMaximo;     // retorna um numero aleatorio
            // tratamentos
            numeroMaximo = parseInt(numeroMaximo);
            numeroAleat = Math.floor(numeroAleat);
            // valida tratamento
            if (numeroAleat <= 1) numeroAleat = 2;
            // == exibicao
            document.getElementById('id-valor').innerText = numeroAleat;        // adiciona conteudo ao HTML
            document.querySelector('.resultado').style.display = 'block';       // edita estilo do elementos p/ exibicao
        } catch (error) {
            console.log(error.stack);
        }
    }

    let ajustaTamanho = function(e) {
        try {
            // ajusta o tamanho dinamicamente
            this.style.width = (this.scrollWidth + 10) + 'px';
        } catch (error) {
            console.log(error.stack);
        }
    }

    // eventos
    document.getElementById('form-sorteador').addEventListener('submit', sortearNumero);
    document.getElementById('id-numero').addEventListener('input', ajustaTamanho);
});