import { expect } from "chai";
import { PriceList, ProductType } from "../src";
import { Product } from "../src/product";
import { Till } from "../src/till";

const priceList: PriceList = {
    [ProductType.Apple]: 60,
    [ProductType.Orange]: 25
};

describe(`Product`, () => {
    let apple: Product;
    let till: Till = new Till(priceList);

    beforeEach(() => {
        apple = new Product(ProductType.Apple, till);
    })

    it("should have a type and a price derived from pricelist", () => {
        expect(apple.getType()).to.be.equal(ProductType.Apple);
        expect(apple.getPrice()).to.be.equal(60);
    });
})