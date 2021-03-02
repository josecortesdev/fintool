import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdGuardService implements CanActivate { // Implementamos canactive

  realRol: string; // variable que es el rol real que vamos a tener, va a ser user o admin

  constructor(
    private tokenService: TokenService, // inyectamos tokenservice
    private router: Router // inyectamos router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const expectedRol = route.data.expectedRol;
    // está el rol real (el que tengo) y el esperado, es decir, el que espero tener
    // mi expectativa es ser administrador pero me quedo en un mero usuario

    this.realRol = this.tokenService.isAdmin() ? 'admin' : 'user';

    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0) {

      this.router.navigate(['/']); // Va al index porque no puedo acceder
      return false; // Devuelve false
    }
    return true; //En caso contrario, true
  }
}
