import { expect } from "chai";
import { PriceList, ProductType } from "../src";
import { Checkout } from "../src/checkout";
import { Product } from "../src/product";
import { Till } from "../src/till";

const priceList: PriceList = {
    [ProductType.Apple]: 60,
    [ProductType.Orange]: 25
}

const till: Till = new Till(priceList);

describe(`Checkout`, () => {
    let checkout: Checkout;

    beforeEach(() => {
        const cart = [
            new Product(ProductType.Apple, till),
            new Product(ProductType.Apple, till),
            new Product(ProductType.Orange, till),
            new Product(ProductType.Apple, till)
        ];
        checkout = new Checkout(cart);
    })

    it(`should be able to tally the prices of all items in the cart`, () => {
        // 3 apples + 1 orange = 205
        expect(checkout.getCartTotal()).to.equal(205);
    });
})