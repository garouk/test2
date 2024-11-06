import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
name: string='';
email: string='';
password: string='';
repassword: string= this.password;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  register() {
    const user = {
      name: this.name,
      password: this.password,
    };
    localStorage.setItem('user', JSON.stringify(user))
    this.router.navigate(['/sesion']);
  }

  clearLocalStorage() {
    localStorage.clear();
}
}
