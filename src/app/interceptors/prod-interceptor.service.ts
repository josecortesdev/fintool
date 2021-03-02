import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdInterceptorService implements HttpInterceptor { // Implementa el interceptor

  constructor(private tokenService: TokenService) { } // Inyectamos el tokenservice


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let intReq = req; // Es req interceptado, por eso el int

    const token = this.tokenService.getToken();

    if (token != null) { // si no es nulo
      intReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
      // intreq va a ser igual a req, le pasamos la autorización, el bearer y el token
    }
    return next.handle(intReq);
  }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }];
// Lo exportamos, abro llaves, el interceptor, prodinterceptoservice y el multi va a ser true
