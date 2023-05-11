const input = document.querySelector('.login-input')  //criando a referência dos elementos que serão utilizados
const button = document.querySelector('.login-button')
const form = document.querySelector('.login-form')

const validateInput = (event) => {
    if(event.target.value.length > 2) {     //quando o valor do input for maior que 2 ele vai habilitar o botão para enviar o form
        button.removeAttribute('disabled')
    }
    else{
        button.setAttribute('disabled', '')  //desabilita o botão se o valor do input for apagado, evitando enviar o form com nome vazio
    }
}

const handleSubmit = (event) => {
    event.preventDefault()         //previne o comportamento padrao do form de recarregar a pag após ser enviado

    localStorage.setItem('player', input.value)  //salva o item no local storage do browser
    window.location = 'pages/game.html'     //redireciona a pag de login para a pag do jogo
}

input.addEventListener('input', validateInput)   //ouvintes de eventos 
form.addEventListener('submit', handleSubmit)