import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-interes',
  templateUrl: './interes.component.html',
  styleUrls: ['./interes.component.css']
})
export class InteresComponent implements OnInit {


  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private DecimalPipe: DecimalPipe) {

    this.buildForm();
  }

  ngOnInit(): void {

  }

  private buildForm() {
    this.form = this.formBuilder.group({

      CapitalInicial: [''],
      CapitalExtra: [''],
      Duracion: [''],
      Rentabilidad: ['']

    });

    this.form.valueChanges.pipe(debounceTime(1)).subscribe(value => {

      this.AgregaValores(value.CapitalInicial, value.CapitalExtra, value.Duracion, value.Rentabilidad);
    })

  }

  AgregaValores(CapitalInicial, CapitalExtra, Duracion, Rentabilidad) {

    CapitalInicial = parseFloat(CapitalInicial);
    CapitalExtra = parseFloat(CapitalExtra);
    Duracion = parseFloat(Duracion);
    Rentabilidad = parseFloat(Rentabilidad);

    let Acumulado: number;

    Acumulado = CapitalInicial + (CapitalInicial * Rentabilidad / 100) + CapitalExtra

    for (let i = 1; i < Duracion; i++) {

      Acumulado = Acumulado + (Acumulado * Rentabilidad / 100) + CapitalExtra

    }


    if (Acumulado > 0) {


      let AcumuladoN = this.DecimalPipe.transform(Acumulado, "1.2-2", 'es')

      let AcumuladoEntero = Math.floor(Acumulado)
      let CapitalInicialEntero = Math.floor(CapitalInicial)

      this.animateValue("efectonum", CapitalInicialEntero, AcumuladoEntero, 300, AcumuladoN);

    } else {

      let efectonum = <HTMLElement>document.querySelector("#efectonum");
      efectonum.innerHTML = ''
    }
  }


  animateValue(id, start, end, duration, resultado) { // Le damos un efecto al resultado


    var obj = <HTMLElement>document.getElementById(id);
    var range = end - start;
    var minTimer = 50;
    // step time para mostrar valores intermedios
    var stepTime = Math.abs(Math.floor(duration / range));
    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);

    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;


    function run() {

      var now = new Date().getTime();
      var remaining = Math.max((endTime - now) / duration, 0);
      var value = Math.round(end - (remaining * range));
      obj.innerHTML = value + ` euros`;
      if (value == end) {
        clearInterval(timer);

        obj.innerHTML = resultado + ` euros`;
      }
    }
    timer = setInterval(run, stepTime);
    run();
  }


  save(event: Event) {
    event.preventDefault(); // Queremos hacer una petición asíncrona, que no recargue toda la página
    const value = this.form.value;

  }

}
