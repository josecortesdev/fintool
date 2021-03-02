import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // Antes incluía la url aquí, ahora lo hago dentro de la carpeta environments
  //La de heroku - productoURL = 'https://misetf.herokuapp.com/producto/';

  productoURL = environment.productoURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.productoURL + 'lista');
  }

  public cartera(idcartera: string): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.productoURL + `cartera/${idcartera}`);  //PARTE DEL ERROR ERA PONER ID AQUÍ
  }

  public duplicado(id: number): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.productoURL + `duplicado/${id}`);
  }

  public detail(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `detail/${id}`);
  }

  public detailName(nombre: string): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `detailname/${nombre}`);
  }

  public save(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'create', producto);
  }

  public addacartera(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'addacartera', producto);
  }

  public update(id: number, producto: Producto): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }


}
