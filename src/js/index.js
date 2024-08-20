// evento DOM
$(document).ready(()=>{

    // variavel
    let tamGlob = [];

    // funcoes
    let sortearNumero = function(e){
        try {
            // para execucao padrao
            e.preventDefault();
            // variaveis
            let numeroMaximo, numeroAleat;
            // valores
            numeroMaximo = $('#id-numero').val();
            numeroAleat = Math.random() * numeroMaximo;     // retorna um numero aleatorio
            // tratamentos
            numeroMaximo = parseInt(numeroMaximo);
            numeroAleat = Math.floor(numeroAleat);
            // valida tratamento
            if (numeroAleat <= 1) numeroAleat = 2;
            // == exibicao
            $('#id-valor').text(numeroAleat);        // adiciona conteudo ao HTML
            $('.resultado').css('display', 'block');        // adiciona display:block no elemento p/ exibicao
        } catch (error) {
            console.log(error.stack);
        }
    }

    let ajustaTamanho = function(e) {
        try {
            // ajusta o tamanho dinamicamente
            let tam = this.value.length;
            // validacao
            if (!tamGlob.includes(tam)){
                tamGlob.push(tam);
                this.style.width = (this.scrollWidth + 10) + 'px';
            }
        } catch (error) {
            console.log(error.stack);
        }
    }

    // eventos
    $('#form-sorteador').on('submit', sortearNumero);
    $('#id-numero').on('input', ajustaTamanho);
});