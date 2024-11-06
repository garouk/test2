import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service'; 
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
   
  userName: string='';

  constructor(private  authService: AuthService) { }

  ngOnInit() {
     this.userName = this.authService.getUserName()
    }
    
  
    
  }
  
