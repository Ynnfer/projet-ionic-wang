import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email!: string;
  password!: string;
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  signIn() {
    this.showErrorMessage = false;
    this.errorMessage = '';

    // Vérifier que l'entrée est vide
    if (!this.email || !this.password) {
      this.showErrorMessage = true;
      this.errorMessage = 'Veuillez entrer un email et un mot de passe valides.';
      return;
    }


    this.authService.signIn(this.email, this.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log('La connexion a échoué :', error);

        this.showErrorMessage = true;
        this.errorMessage = 'Le compte ou le mot de passe est incorrect.';
      });
  }
}
