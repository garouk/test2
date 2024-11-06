import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const tipo = this.authService.getUserType();
    
    // Si el tipo no coincide con lo esperado, redirige a la página de login
    if (tipo && tipo === next.data['tipo']) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
