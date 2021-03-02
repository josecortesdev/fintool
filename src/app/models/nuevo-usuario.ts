export class NuevoUsuario {

    //variables

    nombre: string;
    apellido: string;
    nombreUsuario: string;
    email: string;
    password: string;

    //constructor 

    constructor(nombre: string, apellido: string, nombreUsuario: string, email: string, password: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
    }
}
