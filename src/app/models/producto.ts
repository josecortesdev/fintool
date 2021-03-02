export class Producto {
    id?: number;
    nombre: string;
    isin: string;
    ticker: string;
    ter: number;
    idcartera: string;

    constructor(nombre: string, isin: string, ticker: string, ter: number, idcartera: string) {
        this.nombre = nombre;
        this.isin = isin;
        this.ticker = ticker;
        this.ter = ter;
        this.idcartera = idcartera;
    }
}


