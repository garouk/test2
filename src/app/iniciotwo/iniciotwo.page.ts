import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-iniciotwo',
  templateUrl: './iniciotwo.page.html',
  styleUrls: ['./iniciotwo.page.scss'],
})
export class IniciotwoPage implements OnInit {
 userName: string='';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userName = this.authService.getUserName();
  }

  logout() {
    localStorage.clear(); 
    this.router.navigate(['/sesion']);
}
}
