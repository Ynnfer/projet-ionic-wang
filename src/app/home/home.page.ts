import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: any; // Utilisé pour stocker les informations actuelles de l'utilisateur

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser().then(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
