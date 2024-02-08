import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Game } from './models/game.model';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private dbPath = '/games';
    gamesRef: AngularFirestoreCollection<Game>;


    constructor(
        private db: AngularFirestore
    ) {
        this.gamesRef = db.collection(this.dbPath);
    }

    getAll(): any {
        return this.gamesRef.snapshotChanges().pipe(
            map((changes: any) => {
                return changes.map((doc: any) => {
                    return ({ id: doc.payload.doc.id, ...doc.payload.doc.data() })
                })
            })
        );
    }

    saveNewGame(game: Game): any {
        return new Observable(obs => {
            this.gamesRef.add({ ...game }).then(() => {
                obs.next();
            });
        });
    }

    get(id: any): any {
        return new Observable(obs => {
            this.gamesRef.doc(id).get().subscribe(res => {
                obs.next({ id: res.id, ...res.data() });
            });
        });
    }

    update(game: Game) {
        return new Observable(obs => {
            this.gamesRef.doc(game.id).update(game);
            obs.next();
        });
    }

    delete(id: any) {
        this.db.doc(`games/${id}`).delete();
    }
}
