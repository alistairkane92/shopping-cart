import { PriceList, ProductType } from ".";

export class Till {
    protected priceList: PriceList;

    constructor(priceList: PriceList) {
        this.priceList = priceList;
    }

    public getPrice(productType: ProductType) {
        return this.priceList[productType];
    }
}
