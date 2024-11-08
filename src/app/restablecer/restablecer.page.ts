import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
 
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }
  
  onSubmit(){
    this.authService.changePassword(this.oldPassword, this.newPassword,this.confirmPassword)
    .then(() => {

      this.router.navigate(['/inicio']);
    })

    .catch((error) => {
      console.error(error);
    });
  }

  volver(){
    this.router.navigate(['/inicio'])
  }
}
