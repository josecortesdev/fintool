import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;  // variable de si está logueado

  constructor(private tokenService: TokenService) { }  // le inyectamos un tokenservice

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
  }

  onLogOut(): void { // Accedes a través del html, para el logout
    this.tokenService.logOut();
  }
  
}
