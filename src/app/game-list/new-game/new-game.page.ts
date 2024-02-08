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

  constructor(
    private Game: GameService,
    private toastCtrl: ToastController,
    private router : Router
  ) { }

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
    this.Game.saveNewGame(this.game).subscribe(() => {
      this.game = new Game();
      this.presentToast();
    });
  }
}
