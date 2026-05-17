export class User {
    id!: number;
    constructor(
        public username: string,
        public password: string,
        public email: string,
    ){}    
}
