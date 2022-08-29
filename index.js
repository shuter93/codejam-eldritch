const body = document.querySelector("body");

// import cards from './assets/MythicCards/blue/index.js';




body.style.backgroundImage = `url(./assets/home.png)`;
const ancientsImg = document.querySelectorAll('.ancient');
const ancientActive = document.querySelectorAll('.ancient-active');
const arrowRigth = document.querySelector('.arrow_right');
const arrowLeft = document.querySelector('.arrow_left');
let items = [...ancientsImg];


// arrowLeft.onclick = function() {
//     console.log(ancientActive);
// }

// arrowLeft.addEventListener('click', slider);
// arrowRigth.addEventListener('click', slider);

arrowLeft.onclick =  function() {
    const item = items.splice(items.length - 1, 1)[0];
    items.unshift(item);
    items[0].classList.add('ancient-active');
    items[1].classList.remove('ancient-active');

}
arrowRigth.onclick =  function() {
    const item = items.splice(0, 1)[0];
    items.push(item);
    items[0].classList.add('ancient-active');
    items[items.length - 1].classList.remove('ancient-active');
}

const button = document.querySelector('.ancients-checked');
const complete = document.querySelector('.complexity');
const closeCards = document.querySelector('.close-cards');
const openCards = document.querySelector('.open-cards');

button.onclick = function() {
    complete.classList.add('complexity-active');
    let game = new Game();
    game.table();
    game.setAncient(game.nummm());
    game.setDeck();
    game.showCarrentDeck(game.currentDeck);
    console.log('game2', game.currentDeck);
    console.log('game', game.currentDeck[0][0]['color']);
}



import {cardsData as blueCards} from './data/mythicCards/blue/index.js'
import {cardsData as brownCards} from './data/mythicCards/brown/index.js'
import {cardsData as greenCards} from './data/mythicCards/green/index.js'
import {ancientsData} from './data/ancients.js';
import {difficulties} from './data/difficulties.js'

class Game {

    availableAncients = [];
    currentAncient = null;
    availableDeck = [];
    currentDeck = [];
    closeCards = closeCards;
    openCard = openCards;


    constructor() {
        this.availableDeck = {
            'green': greenCards,
            'blue': blueCards,
            'brown': brownCards
        };
        this.avaibleAncient = ancientsData;
        this.difficultiesLevel = difficulties;
        this.num = 0;
    }

    table() {
        this.setAncient();
        const greenCards = document.querySelectorAll('.green');
        greenCards[1].textContent = this.currentAncient['firstStage']['greenCards'];
        greenCards[2].textContent = this.currentAncient['secondStage']['greenCards'];
        greenCards[3].textContent = this.currentAncient['thirdStage']['greenCards'];

        const brownCards = document.querySelectorAll('.brown');
        brownCards[1].textContent = this.currentAncient['firstStage']['brownCards'];
        brownCards[2].textContent = this.currentAncient['secondStage']['brownCards'];
        brownCards[3].textContent = this.currentAncient['thirdStage']['brownCards'];

        const blueCards = document.querySelectorAll('.blue');
        blueCards[1].textContent = this.currentAncient['firstStage']['blueCards'];
        blueCards[2].textContent = this.currentAncient['secondStage']['blueCards'];
        blueCards[3].textContent = this.currentAncient['thirdStage']['blueCards'];
    }

    nummm() {
        if (ancientsImg[0].classList.contains('ancient-active')) {
            this.num = '0'
        }
        if (ancientsImg[1].classList.contains('ancient-active')) {
            this.num = '1'
        }
        if (ancientsImg[2].classList.contains('ancient-active')) {
            this.num = '2'
        }
        if (ancientsImg[3].classList.contains('ancient-active')) {
            this.num = '3'
        }
    }

    setAncient() {
        this.currentAncient = this.avaibleAncient[this.num];
    }

    showCarrentDeck(deck) {
        closeCards.onclick = function() {
            let showCard;
            if (deck[0].length != 0) {
                showCard = deck[0].splice(0, 1)[0];
            } else if (deck[1].length != 0) {
                showCard = deck[1].splice(0, 1)[0];
            } else {
                showCard = deck[2].splice(0, 1)[0];
            }
            console.log(deck);

            openCards.style.backgroundImage = `url(./assets/MythicCards/${showCard.color}/${showCard.id}.png)`
        }
    }






    setLevel(id) {
        this.level = this.difficultiesLevel[id];
    }

    setDeck() {
        // this.applyLevel();
        this.currentDeck.push(this.bildStage('firstStage'));
        this.currentDeck.push(this.bildStage('secondStage'));
        this.currentDeck.push(this.bildStage('thirdStage'));
    }

    bildStage(nameStage) {
        let stageGreen = this.currentAncient[nameStage]['greenCards'];
        let stageBlue = this.currentAncient[nameStage]['blueCards'];
        let stageBrown = this.currentAncient[nameStage]['brownCards'];
        let cards = [];
        cards = cards.concat(
            this.getRandomCards('green', stageGreen),
            this.getRandomCards('blue', stageBlue),
            this.getRandomCards('brown', stageBrown)
        );
        return this.shufflerCards(cards);
    }

    shufflerCards(cards) {
        return cards.sort(() => Math.random() - 0.5);
    }

    getRandomCard(color) {
        let randomNum = Math.floor(Math.random() * this.availableDeck[color].length);
        let card = this.availableDeck[color].splice(randomNum, 1)[0];
        return card;
    }

    getRandomCards(color, count) {
        let cards = [];
        for (let i = 0; i < count; i++) {
            cards.push(this.getRandomCard(color));
        }
        return cards;
    }

}






