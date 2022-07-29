import { expect } from "chai";
import { PriceList, ProductType } from "../src";
import { Product } from "../src/product";
import { Till } from "../src/till";

describe(`Product`, () => {
    let apple: Product;
    let till: Till;

    before(() => {
        const priceList: PriceList = {
            [ProductType.Apple]: 60,
            [ProductType.Orange]: 25
        };
        till = new Till(priceList);
    })

    beforeEach(() => {
        apple = new Product(ProductType.Apple, till);
    })

    it(`should have a type and a price derived from pricelist`, () => {
        expect(apple.getType()).to.be.equal(ProductType.Apple);
        expect(apple.getPrice()).to.be.equal(60);
    });
})