export class JwtDTO {
    token: string;  // Esta va tener un token
    constructor(token: string) {
        this.token = token;
    }
}
