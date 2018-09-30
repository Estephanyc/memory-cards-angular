import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'memory-cards';
  cardsList = [
    {
      'dataCard' : '1',
      'image' : '../assets/img/2.png'
    },
    {
      'dataCard': '1',
      'image': '../assets/img/2.png'
    },
    {
      'dataCard': '2',
      'image': '../assets/img/4.png'
    },
    {
      'dataCard': '2',
      'image': '../assets/img/4.png'
    },
    {
      'dataCard': '3',
      'image': '../assets/img/j.png'
    },
    {
      'dataCard': '3',
      'image': '../assets/img/j.png'
    },
    {
      'dataCard': '4',
      'image': '../assets/img/k.png'
    },
    {
      'dataCard': '4',
      'image': '../assets/img/k.png'
    }
  ]
  hasFlippedCard = false;
  lockBoard = false;
  firstCard: any;
  secondCard: any;

  ngOnInit() { }
  
  unflipCards() {
    setTimeout(() => {
      this.firstCard.classList.remove('flip');
      this.secondCard.classList.remove('flip');
      this.resetBoard();
    }, 1500);
  }
  resetBoard() {
  [this.hasFlippedCard, this.lockBoard] = [false, false];
  [this.firstCard, this.secondCard] = [null, null];
  }  

  disableCards() {
    this.firstCard.removeEventListener('click', this.flipCard);
    this.secondCard.removeEventListener('click', this.flipCard);
    this.resetBoard();
  }
  checkForMatch() {
    let isMatch = this.firstCard.dataset.card === this.secondCard.dataset.card;
    isMatch ? this.disableCards() : this.unflipCards();
  }

  flipCard(event) {
    let node = event.target;
    event.target.parentNode.classList.add('flip');

    if (this.lockBoard) return;
    if (node === this.firstCard) return;

    if (!this.hasFlippedCard) {
    this.hasFlippedCard = true;
      this.firstCard = this;
      return;
    }
    this.secondCard = node;
    this.lockBoard = true;
    this.checkForMatch(); 
  }
}
