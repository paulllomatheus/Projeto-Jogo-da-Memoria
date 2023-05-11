const grid = document.querySelector('.grid')     //criando a referência ao elemento div de classe grid
const spanPlayer = document.querySelector('.player')  //referência para capturar o nome do player
const timer = document.querySelector('.timer')      //referencia a captura do tempo 

const characters = [         //array que vai linkar as imagens das outras cartas
    'beth',                 //o nome tem que ser IGUAL ao dar imagem
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
]

const createElement = (tag, className) => {           //função que vai criar o Element HTML recebendo como parâmetro a tag e a class 
    const element = document.createElement(tag)      //criando o elemento pela tag
    element.className = className                   //adicionando uma class para a tag
    return element
}

let firstCard = ''         //variáveis que vão ser os comparativos para o jogo funcionar
let secondCard = ''

const checkEndGame = () => {      //a função vai verificar se todas as cartas receberam a class disabled-card
    const disabledCards = document.querySelectorAll('.disabled-card') //usa-se o All para pegar todos os elemento com essa class

    if(disabledCards.length === 20) {  //se todas estão desabilitadas, alerta de parabéns para o jogador
        setTimeout(()=> {
            clearInterval(this.loop)   //parar o loop do tempo 
            alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de ${timer.innerHTML} segundos`)  //alerta de vitória
        }, 500)
        
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character')   //pegando o data-character das duas cartas reveladas
    const secondCharacter = secondCard.getAttribute('data-character')

    if(firstCharacter === secondCharacter) {        //verificando se as duas possuem o mesmo data-character

        firstCard.firstChild.classList.add('disabled-card')  //se true adiciona a class disabled-card para ambas as cartas
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = ''            //esvazia as duas variáveis para poder prosseguir o jogo
        secondCard = ''

        checkEndGame()          //check se o jogo acabou 
    }
    else{

        setTimeout(() => {       //se false remove a class reveal-card para esconder as cartas novamente
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''      //esvazia as duas variáveis para poder prosseguir o jogo
            secondCard = ''
        }, 500)  //setTimeout é usado para dar um breve delay que permita que ambas as cartas sejam viradas antes de verificar se são iguais
        
    }
}

const revealCard = ({target}) => {                  //função que vai virar a carta ao ser clicada
    
    if(target.parentNode.className.includes('reveal-card')){ //verificando se carta já possui a class reveal-card
        return
    }

    if(firstCard === '') {
        target.parentNode.classList.add('reveal-card')   //adiciona a class reveal-card a primeira carta para conectar os atributos css dessa class
        firstCard =  target.parentNode
    }
    else if(secondCard === '') {
        target.parentNode.classList.add('reveal-card')  //adiciona a class reveal-card a segunda carta para conectar os atributos css dessa class
        secondCard = target.parentNode

        checkCards()                    //checkar se as cartas são iguais
    }

   
}

const createCard = (character) => {                     //função que vai criar as novas cartas
    const card = createElement('div', 'card')          //criando o elemento utilizando a função criada anteriormente
    const front = createElement('div', 'face front')  //recebe a tag e a class
    const back = createElement('div', 'face back')

front.style.backgroundImage = `url('../img/${character}.png')` //mudando a front da carta de acordo com as imagens dos personagens

    card.appendChild(front)             //adiciona um pai a div de class front e back
    card.appendChild(back)
    card.setAttribute('data-character', character)  //adicionando o atributo data character para cada carta para poder compara-las

    card.addEventListener('click', revealCard)  //ouvinte de evento de clique na carta chama função revealCard

    return card
}

const loadGame = () => {                        //função que vai adicionar as cartas
    
    const duplicateCharacters = [...characters, ...characters]  //duplicando o array dos personagens
    
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)  //variável que vai embaralhar as cartas

    shuffledArray.forEach((character) => {       //percorre o novo array embaralhado
        
        const card = createCard(character)   //cria uma carta para cada personagem
        
        grid.appendChild(card)              //adiciona um pai a div card
    })
}

const startTime = () => { //função que vai startar o tempo 
   
    this.loop = setInterval(() => {        //salva o loop do intervalo como uma class que pode ser recuperada em outra função
      
        const currentTime = +timer.innerHTML  //convertendo a string em number
        timer.innerHTML = currentTime + 1     //loopando o number somando de + 1
    }, 1000)
}

window.onload = () => {                         //executa o que tiver dentro quando a janela tiver carregado
    
    const playerName = localStorage.getItem('player')  //recuperando nome do player salvo no localStorage
    spanPlayer.innerHTML = playerName       //exibindo esse nome salvo
    
    startTime() //inicia a contagem do tempo
    loadGame()  //carrega o jogo
}

