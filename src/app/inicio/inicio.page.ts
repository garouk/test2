import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  userName: string = '';
  userId: string = '';  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.id) {
      this.userId = currentUser.id; 

      this.userName = localStorage.getItem(`userName_${this.userId}`) || 'Usuario desconocido';
    } else {
      this.userName = 'Usuario desconocido';
    }
  }

  logout() {
    localStorage.clear();  
    this.router.navigate(['/sesion']);  
  }
}
