import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
   
  nameUser: string='';

  constructor() { }

  ngOnInit() {
  this.nameUser = localStorage.getItem('user')||'usuario desconocido';
  }
  
}
