import { PriceList, ProductType } from ".";

export class Till {
    protected priceList: PriceList;

    constructor(priceList) {
        this.priceList = priceList;
    }

    public getPrice(productType: ProductType) {
        return this.priceList[productType];
    }
}
