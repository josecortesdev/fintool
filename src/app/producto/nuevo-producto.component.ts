import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/producto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  nombre = '';
  isin = '';
  ticker = '';
  ter: number = null;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  //Crear uno nuevo
  onCreate(): void {
    const admin = 'adminjose';
    const producto = new Producto(this.nombre, this.isin, this.ticker, this.ter, admin);
    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });

      }
    );
  }

}
