import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email!: string;
  password!: string;
  confirmPassword!: string;
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  signUp() {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.showErrorMessage = false;
    this.errorMessage = '';

    // Vérifier que l'entrée est vide
    if (!this.email || !this.password || !emailRegex.test(this.email)) {
      this.showErrorMessage = true;
      this.errorMessage = 'Veuillez entrer un email et un mot de passe valides.';
      return;
    }

    if (this.confirmPassword !== this.password) {
      this.showErrorMessage = true;
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (this.password.length < 6 || this.password.length > 20) {
      this.showErrorMessage = true;
      this.errorMessage = 'Le mot de passe doit comporter entre 6 et 20 caractères.';
      return;
    }


    // Vérifiez si l'e-mail est déjà utilisé
    this.authService.signUp(this.email, this.password)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log("Echec de l'enregistrement: ", error)
        this.showErrorMessage = true;
        this.errorMessage = 'Cet e-mail est déjà utilisée.';
      });
  }
}
