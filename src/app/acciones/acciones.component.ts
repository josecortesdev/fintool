import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'; // para los formularios
import { debounceTime } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common'; // para decimal pipe
import { ɵELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';



@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent implements OnInit {


  buscaraccion: FormGroup;  // Usaremos esta variable para el form

  ticker: string = '';
  // Creamos la variable, le daremos un valor posteriormente

  pasaraccion: string;

  // Pasamos por parámetro del formbuilder y el decimalpipe
  constructor(private formbuilder: FormBuilder, private DecimalPipe: DecimalPipe) {


    $(document).ready(function () {
      (<any>$('[data-toggle="popover"]')).popover({
        placement: 'top',
        trigger: 'hover'
      });
    });

    this.construyeForm();
  }


  ngOnInit(): void { }
  

  construyeForm() {

    this.buscaraccion = this.formbuilder.group({

      accion: ['']
    });

    this.buscaraccion.valueChanges.pipe(debounceTime(1)).subscribe(value => {

    });
  }


  buscalo() { // Método para buscar los ratios fundamentales de la empresa

    // Precio, divisa, cambio
    let resultadoprecio = <HTMLElement>document.querySelector("#resultadoprecio");
    let resultadodivisa = <HTMLElement>document.querySelector("#resultadodivisa");
    let resultadocambio = <HTMLElement>document.querySelector("#resultadocambio");

    // Ratios fundamentales principales de la empresa
    let PER = <HTMLElement>document.querySelector("#PER");
    let priceToBook = <HTMLElement>document.querySelector("#priceToBook");
    let Cap = <HTMLElement>document.querySelector("#cap");
    let PEG = <HTMLElement>document.querySelector("#peg");
    let Yield = <HTMLElement>document.querySelector("#yield");

    resultadoprecio.innerHTML = `<div class="spinner-grow" role="status">
 <span class="sr-only">Loading...</span>
 </div>`

    resultadodivisa.innerHTML = ``
    resultadocambio.innerHTML = ``

    PER.innerHTML = ``
    priceToBook.innerHTML = ``
    Cap.innerHTML = ``
    PEG.innerHTML = ``
    Yield.innerHTML = ``


    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=" + this.ticker, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "6318fa822amsh68d37aaca8f3d4bp17ff4cjsn9f7f400863e2",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
      }
    })
      .then(res => res.json())
      .then(datosmercado => {


        // Precio
        let precioaccion = `${datosmercado.quoteResponse.result['0'].regularMarketPrice} `

        // DecimalPipe para poner el número decimal en el sistema europeo
        precioaccion = this.DecimalPipe.transform(precioaccion, "1.2-2", 'es')

        resultadoprecio.innerHTML = precioaccion + ` `

        //Divisa
        resultadodivisa.innerHTML = `${datosmercado.quoteResponse.result['0'].currency} `

        //PER
        let PERAPI = `${datosmercado.quoteResponse.result['0'].trailingPE}`
        PERAPI = this.DecimalPipe.transform(PERAPI, "1.2-2", 'es')

        PER.innerHTML = PERAPI

        //Price to book
        let PTB = `${datosmercado.quoteResponse.result['0'].priceToBook}`
        PTB = this.DecimalPipe.transform(PTB, "1.2-2", 'es')

        priceToBook.innerHTML = PTB

        //Market Cap
        let marketCap = `${datosmercado.quoteResponse.result['0'].marketCap}`
        marketCap = this.DecimalPipe.transform(marketCap, "1.2-2", 'es')
        Cap.innerHTML = marketCap + '$'

        // PEG
        let pegRatio = `${datosmercado.quoteResponse.result['0'].pegRatio}`
        pegRatio = this.DecimalPipe.transform(pegRatio, "1.2-2", 'es')
        PEG.innerHTML = pegRatio

        // Rentabilidad por dividendo
        let dividendYield = `${datosmercado.quoteResponse.result['0'].dividendYield}`

        let NumberdividendYield = parseFloat(dividendYield)

        if (NumberdividendYield > 0) {

          dividendYield = this.DecimalPipe.transform(dividendYield, "1.2-2", 'es')
          Yield.innerHTML = dividendYield + '%'

        } else {
          Yield.innerHTML = 'N/A' // Lo mostramos en el caso de que no reparta dividendo
        }

        // Cambiar el estilo a color verde/rojo para mostrar la rentabilidad positiva/negativa
        if (datosmercado.quoteResponse.result['0'].regularMarketChangePercent > 0) {

          resultadocambio.innerHTML = `(${datosmercado.quoteResponse.result['0'].regularMarketChangePercent.toFixed(2)} %) <i class="fas fa-long-arrow-alt-up"></i>`
          resultadocambio.style.color = "green";
        } else {
          resultadocambio.innerHTML = `(${datosmercado.quoteResponse.result['0'].regularMarketChangePercent.toFixed(2)} %) <i class="fas fa-long-arrow-alt-down"></i>`
          resultadocambio.style.color = "red";
        }

      })
      .catch(err => {

        console.error(err);

        resultadoprecio.innerHTML = `No encontrado`;

        resultadodivisa.innerHTML = ``;
        resultadocambio.innerHTML = ``;

      });

  }

}
