import { Product } from "./product";

export class Checkout {
    private cart: Product[];

    constructor(cart: Product[]) {
        this.cart = cart;
    }

    public getCartTotal(): number {
        return this.cart.reduce(
            (prev: number, current: Product) => prev + current.getPrice(), 0
        );
    }
}