import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
   
  userName: string='';

  constructor(private  authService: AuthService, private router: Router) { }

  ngOnInit() {
     this.userName = this.authService.getUserName()
    }
    
    logout() {
      localStorage.clear(); 
      this.router.navigate(['/sesion']);
  }
    
  }
  
