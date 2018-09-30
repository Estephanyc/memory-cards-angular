import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'memory-cards';

  orderRandom(){
    return Math.floor(Math.random() * 8) + 1;
  }
  cardsList = [
    {
      'dataCard' : '1',
      'image' : '../assets/img/2.png',
      'order': this.orderRandom()
    },
    {
      'dataCard': '1',
      'image': '../assets/img/2.png',
      'order': this.orderRandom()
    },
    {
      'dataCard': '2',
      'image': '../assets/img/4.png',
      'order': this.orderRandom()
    },
    {
      'dataCard': '2',
      'image': '../assets/img/4.png',
      'order': this.orderRandom()
    },
    {
      'dataCard': '3',
      'image': '../assets/img/j.png',
      'order': this.orderRandom()
    },
    {
      'dataCard': '3',
      'image': '../assets/img/j.png',
      'order': this.orderRandom()
    },
    {
      'dataCard': '4',
      'image': '../assets/img/k.png',
      'order': this.orderRandom()
    },
    {
      'dataCard': '4',
      'image': '../assets/img/k.png',
      'order': this.orderRandom()
    }
  ]

  hasFlippedCard = false;
  lockBoard = false;
  firstCard: any;
  secondCard: any;
  countHits =0;

  ngOnInit() {}

  playAudioCard() {
    let flip = new Audio();
    flip.src = "../assets/sounds/pop.mp3";
    flip.load();
    flip.play();
  }
  playAudioWin(){
    let win = new Audio();
    win.src = "../assets/sounds/win.mp3";
    win.load();
    win.play();
  }

  unflipCards() {
    setTimeout(() => {
      this.firstCard.classList.remove('flip');
      this.secondCard.classList.remove('flip');
      this.resetBoard();
    }, 800);
  }

  resetBoard() {
    [this.hasFlippedCard, this.lockBoard] = [false, false];
    [this.firstCard, this.secondCard] = [null, null];
  }  

  disableCards() {
    this.countHits++
    if (this.countHits == 4) this.playAudioWin()
    this.firstCard.removeEventListener('click', this.flipCard);
    this.secondCard.removeEventListener('click', this.flipCard);
    this.firstCard.classList.add('hidden');
    this.secondCard.classList.add('hidden');
    this.resetBoard();
  }

  checkForMatch() {
    console.log(this.firstCard.dataset)
    let isMatch = this.firstCard.dataset.card === this.secondCard.dataset.card;
    isMatch ? this.disableCards() : this.unflipCards();
  }

  flipCard(event) {
    let node = event.target.parentNode;
    node.classList.add('flip');
    this.playAudioCard();

    if (this.lockBoard) return;
    if (node === this.firstCard) return;

    if (!this.hasFlippedCard) {
      this.hasFlippedCard = true;
      this.firstCard = node;
      return;
    }
    this.secondCard = node;
    this.lockBoard = true;
    this.checkForMatch(); 
  }
  reload(){
    console.log('kj')
    window.location.reload();
  }
}
