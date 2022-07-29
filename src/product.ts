import { ProductType } from ".";
import { Till } from "./till";

export class Product {
    private type: ProductType;
    private price: number;

    constructor(type: ProductType, till: Till) {
        this.type = type;
        this.price = till.getPrice(type);
    }

    public getType(): ProductType {
        return this.type;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }
}
