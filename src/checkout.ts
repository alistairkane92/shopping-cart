import { Discounts } from "./discounts";
import { Product } from "./product";

export class Checkout {
    private cart: Product[];
    private discounts: Discounts;

    constructor(cart: Product[], discounts?: Discounts) {
        this.cart = cart;
        this.discounts = discounts;
    }

    public getCart(): Product[] {
        return this.cart;
    }

    /**
     * Totals the price of every item in the cart.
     * Excludes discounts.
     * @param cart The cart of products to determine the total from.
     * @returns 
     */
    public getCartTotal(cart: Product[] = this.cart): number {
        return cart.reduce(
            (prev: number, current: Product) => prev + current.getPrice(), 0
        );
    }

    /**
     * Totals the price of every item in the cart.
     * Includes discounts.
     * @param cart The cart of products to determine the total from.
     * @returns Total of each product in the cart
     */
    public getCheckoutTotal(cart: Product[] = this.cart): number {
        const discountedCart = this.applyDiscounts(cart);
        return this.getCartTotal(discountedCart);
    }

    /**
     * Applies discounts to each item of the given cart.
     * @param cart The cart of products to apply each discount to.
     * @returns The discounted cart
     */
    public applyDiscounts(cart: Product[] = this.cart): Product[] {
        return cart.map((product: Product) => {
            this.discounts.applyDiscount(product);
            return product;
        })
    }
}