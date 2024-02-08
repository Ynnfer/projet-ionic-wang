export class Game {
    id?: string;
    name: string;
    released: boolean;
    pictureLink: string;
    developer: string;
    releaseDate: string;
    prix: string;
    description: string;

    constructor() {
        this.name = '';
        this.released = false;
        this.pictureLink = '';
        this.developer = '';
        this.releaseDate = '';
        this.prix = '';
        this.description = '';
    }
}
