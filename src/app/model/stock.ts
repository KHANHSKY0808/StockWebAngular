export class Stock {
    id!: number;
    constructor(
        public name : string,
        public code : string,
        public price : number,
        public previousPrice : number,
        public exchange : string,
        public favorite: boolean = false
    ){}

        isPositiveChange(): boolean {
            return this.price >= this.previousPrice;
        }
}
