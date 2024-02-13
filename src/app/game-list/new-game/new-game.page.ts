import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GameService } from 'src/app/game.service';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-new',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {
  public game!: Game;
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(
    private Game: GameService,
    private toastCtrl: ToastController,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.game = new Game();
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Nouveau Jeu enregistré',
      duration: 2000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/games']);
      }, 2000);
    });
  }

  add() {
    // Vérifiez si le prix est un nombre ou un flottant
    const prixRegex = /^[0-9]+(\.[0-9]+)?$/;
     // Vérifiez si le format de la date est DD/MM/YYYY
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    this.showErrorMessage = false;
    this.errorMessage = '';

    // Vérifier que l'entrée est vide
    if (!this.game.name || !this.game.developer || !this.game.pictureLink || !this.game.prix || !this.game.releaseDate || !this.game.description) {
      this.showErrorMessage = true;
      this.errorMessage = 'Veuillez compléter tous les champs obligatoires.';
    }
    else if(!prixRegex.test(this.game.prix)){
      this.showErrorMessage = true;
      this.errorMessage = 'Veuillez entrer un prix valide.';
    } 
    else if(!dateRegex.test(this.game.releaseDate)){
      this.showErrorMessage = true;
      this.errorMessage = 'Veuillez entrer une date valide au format DD/MM/YYYY.';
    } 
    else {
      this.Game.saveNewGame(this.game).subscribe(() => {
        this.game = new Game();
        this.presentToast();
      });
    }

  }
}
