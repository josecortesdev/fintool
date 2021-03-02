import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { AccionesComponent } from './acciones/acciones.component';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LOCALE_ID, NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { CalculadorasComponent } from './calculadoras/calculadoras.component';
import { CotizacionComponent } from './calculadoras/cotizacion.component';
import { InteresComponent } from './calculadoras/interes.component';

// import * as bootstrap from "bootstrap";
// import * as $ from "jquery";

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ListaProductoComponent,
    DetalleProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    AccionesComponent,
    CalculadorasComponent,
    CotizacionComponent,
    InteresComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    interceptorProvider,
    DecimalPipe, //Para poner decimales con el sistema europeo

    { provide: LOCALE_ID, useValue: 'es' },  // ESPAÑA


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
