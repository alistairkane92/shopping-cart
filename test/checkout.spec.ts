import { expect } from "chai";
import { addToCart, PriceList, ProductDiscounts, ProductType } from "../src";
import { Checkout } from "../src/checkout";
import { Discounts } from "../src/discounts";
import { Product } from "../src/product";
import { Till } from "../src/till";

describe(`Checkout`, () => {
    let till: Till;

    before(() => {
        const priceList: PriceList = {
            [ProductType.Apple]: 60,
            [ProductType.Orange]: 25
        }
        till = new Till(priceList);
    })

    it(`should be able to tally the prices of all items in the cart`, () => {
        const cart: Product[] = [];
        addToCart(cart, ProductType.Apple, till, 3);
        addToCart(cart, ProductType.Orange, till, 1);
        const checkout = new Checkout(cart);

        // 3 apples + 1 orange = 205
        expect(checkout.getCartTotal()).to.equal(205);
    });

    describe(`Discounts`, () => {
        let testDiscounts: Discounts;

        beforeEach(() => {
            const discounts = new Discounts();
            const productDiscounts: ProductDiscounts = {
                [ProductType.Apple]: (product) => discounts.multiBuy(product, 1, 1),
                [ProductType.Orange]: (product) => discounts.multiBuy(product, 2, 1)
            };
            discounts.setProductDiscounts(productDiscounts);
            testDiscounts = discounts;
        })

        it(`should be able to calculate discounts`, () => {
            const cart = [];
            addToCart(cart, ProductType.Apple, till, 2);
            addToCart(cart, ProductType.Orange, till, 3);
            const checkout = new Checkout(cart, testDiscounts);

            // Apples are buy one get one free: 2 apples = 60
            // Oranges are three for two: 3 oranges = 50
            expect(checkout.getCheckoutTotal()).to.be.equal(110);
        })

        it(`should be able to apply multi buy offers several times`, () => {
            const cart = [];
            addToCart(cart, ProductType.Apple, till, 6);
            addToCart(cart, ProductType.Orange, till, 9);
            const checkout = new Checkout(cart, testDiscounts);

            // Apples are buy one get one free: 6 apples = 180
            // Oranges are three for two: 9 oranges = 150
            expect(checkout.getCheckoutTotal()).to.be.equal(330);
        })
    })
})