import { Component, OnInit, ViewChild } from '@angular/core';
import { Game } from '../models/game.model';
import { GameService } from '../game.service';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-games-list',
  templateUrl: './game-list.page.html',
  styleUrls: ['./game-list.page.scss'],
})
export class GameListPage implements OnInit {
  games!: Array<Game>;
  @ViewChild(IonContent) content!: IonContent;

  constructor(
    private Game: GameService
  ) { }

  ngOnInit() {
    this.Game.getAll().subscribe((data: any) => {
      this.games = data;
    });
  }

 scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    this.content.scrollToTop(500);
  }

}

