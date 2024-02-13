import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  modif: boolean = false;
  game!: Game;
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private Game: GameService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.Game.get(id).subscribe((value: any) => {
      this.game = value;
    });
  }

  async setModif() {
    if (!this.modif) {
      const alert = await this.alertCtrl.create({
        header: 'Etes vous sur de vouloir modifier ?',
        subHeader: 'Vous rendrez possible la modification',
        buttons: [
          {
            text: 'Annuler',
            role: 'Cancel'
          }, {
            text: 'Configurer',
            handler: () => { this.modif = !this.modif }
          }
        ]
      });
      await alert.present();
    } else {
      this.modif = !this.modif;
    }
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Vos modifications sont enregistrées',
      duration: 2000
    });
    (await toast).present();
  }

  onModif() {
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
    else if (!prixRegex.test(this.game.prix)) {
      this.showErrorMessage = true;
      this.errorMessage = 'Veuillez entrer un prix valide.';
    }
    else if(!dateRegex.test(this.game.releaseDate)){
      console.log(this.game.releaseDate)
      this.showErrorMessage = true;
      this.errorMessage = 'Veuillez entrer une date valide au format DD/MM/YYYY.';
    } 
    else {
      this.Game.update(this.game).subscribe(() => {
        this.presentToast();
        this.modif = false;
      });
    }

  }

  onDelete(id: any) {
    this.Game.delete(id);
    this.router.navigate(['/games']);
  }
}
