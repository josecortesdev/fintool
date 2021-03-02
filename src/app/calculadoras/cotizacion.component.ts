import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common'; // para el sistema europeo
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  primera = true;
  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private DecimalPipe: DecimalPipe) {
    this.buildForm();
  }

  ngOnInit() {
  }


  private buildForm() {
    this.form = this.formBuilder.group({

      actual: [''], // Cotización actual
      pasada: [''] // Cotización pasada
    });

    this.form.valueChanges
      .pipe(
        debounceTime(1)  // Modifica los valores cada x tiempo
      )
      .subscribe(value => {

        this.AgregaValor(value.actual, value.pasada);

      });

  }

  AgregaValor(actual, pasada) {

    actual = parseFloat(actual);
    pasada = parseFloat(pasada);

    console.log('ha llegado a la funcion agregavalor. Pasada: ' + pasada);
    let myContainer = <HTMLElement>document.querySelector("#escribecotizacion");


    if (actual >= 0 && pasada >= 0) {

      let resultadocotizacion = 0 - (100 - (actual * 100 / pasada)); // Esta es la operación que lo calcula



      if (resultadocotizacion > 0) {
        myContainer.innerHTML = '<center>La diferencia es del: <br><br><div class="alert alert-success" role="alert"> <h1> ' + this.DecimalPipe.transform(resultadocotizacion, "1.2-2", 'es') + "% </h1> </center></div>";
      }
      else if (resultadocotizacion <= 0) {

        myContainer.innerHTML = '<center>La diferencia es del: <br><br><div class="alert alert-danger" role="alert"> <h1> ' + this.DecimalPipe.transform(resultadocotizacion, "1.2-2", 'es') + "% </h1> </center></div>";
      }
      else {
        myContainer.innerHTML = '';
      }


    } else {
      myContainer.innerHTML = '';
    }
  }

  save(event: Event) {
    event.preventDefault(); // Queremos hacer una petición asíncrona, que no recargue toda la página
    const value = this.form.value;
    console.log('probando save: ' + value);

  }

}
