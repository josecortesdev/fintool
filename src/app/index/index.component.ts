import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { DecimalPipe } from '@angular/common'; // para el decimal
import { parse } from 'querystring';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  mifecha = Date.now();

  nombreUsuario: string; // vacío

  porcentajeres = 0;

  constructor(private tokenService: TokenService, private DecimalPipe: DecimalPipe) {


    this.IndicesAPI();
    this.CovidAPI();
  }

  ngOnInit() {
    this.nombreUsuario = this.tokenService.getUserName();
  }



  IndicesAPI() {

    fetch("https://morning-star.p.rapidapi.com/market/get-summary", { // Llamada a la API
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "6318fa822amsh68d37aaca8f3d4bp17ff4cjsn9f7f400863e2",
        "x-rapidapi-host": "morning-star.p.rapidapi.com"
      }
    })
      .then(ind => ind.json())
      .then(async indices => {

        // Creo el método BuscaIndice y lo llamo para mostrar la información de cada índice que me interesa

        BuscaIndice("sp500", "#sp500", "USA", '2');
        BuscaIndice("nasdaq", "#nasdaq", "USA", '3');
        BuscaIndice("dj", "#dj", "USA", '1');

        BuscaIndice("ftse100", "#ftse100", "Europe", '0');
        BuscaIndice("cac40", "#cac40", "Europe", '1');
        BuscaIndice("dax", "#dax", "Europe", '2');

        BuscaIndice("aex", "#aex", "Europe", '3');
        BuscaIndice("hangseng", "#hangseng", "Asia", '1');
        BuscaIndice("nikkei225", "#nikkei225", "Asia", '0');

        function BuscaIndice(nombreindice: string, nombreid: string, region: string, n: string) {

          let nombrehtml: any = nombreindice + 'html'

          let percentid = nombreid + 'percent'

          nombrehtml = <HTMLElement>document.querySelector(nombreid);
          let nombrepercenthtml = <HTMLElement>document.querySelector(percentid);

          let precioindice = `${indices.MarketRegions[region][n].Price.toLocaleString('de-DE')}  `

          nombrehtml.innerHTML = precioindice

          nombrepercenthtml.innerHTML = `<b> ${indices.MarketRegions[region][n].PercentChange.toFixed(2).replace(".", ",")}% </b>`

          let numero = parseFloat(`${indices.MarketRegions[region][n].PercentChange}`)


          if (numero > 0) {

            nombrepercenthtml.style.color = 'green'
          } else {
            nombrepercenthtml.style.color = 'red'
          }
        }
      })
      .catch(err => {
        console.error(err);
      });

  }

  CovidAPI() {


    fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=Spain", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "6318fa822amsh68d37aaca8f3d4bp17ff4cjsn9f7f400863e2",
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com"
      }
    })
      .then(rescovid => rescovid.json())
      .then(datoscovid => {

        let confirmed = <HTMLElement>document.querySelector('#confirmed')
        let deaths = <HTMLElement>document.querySelector('#deaths')
        let recovered = <HTMLElement>document.querySelector('#recovered')

        let confirmadosnumero = `${datoscovid.data.confirmed}`

        confirmadosnumero = this.DecimalPipe.transform(confirmadosnumero, "1.0-2", 'es') // recuerda, este es de 0 a 2 dec
        confirmed.innerHTML = confirmadosnumero

        let muertesnumero = `${datoscovid.data.deaths}`
        muertesnumero = this.DecimalPipe.transform(muertesnumero, "1.0-2", 'es') // recuerda, este es de 0 a 2 dec
        deaths.innerHTML = muertesnumero

        let recuperadosnumero = `${datoscovid.data.recovered}`
        recuperadosnumero = this.DecimalPipe.transform(recuperadosnumero, "1.0-2", 'es') // recuerda, este es de 0 a 2 dec
        recovered.innerHTML = recuperadosnumero

      })
      .catch(err => {
        console.error(err);
      });

  }

}
