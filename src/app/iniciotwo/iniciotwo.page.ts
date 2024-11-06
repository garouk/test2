import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-iniciotwo',
  templateUrl: './iniciotwo.page.html',
  styleUrls: ['./iniciotwo.page.scss'],
})
export class IniciotwoPage implements OnInit {
 userName: string='';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userName = this.authService.getUserName();
  }

}
