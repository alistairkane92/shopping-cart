import { ProductDiscounts, ProductType } from ".";
import { Product } from "./product";

export class Discounts {
    private productDiscounts: ProductDiscounts;
    private multiBuyTracker: { [key in ProductType]?: number } = {}

    /**
     * A collection of discounts to apply to each product.
     * @param productDiscounts 
     */
    public setProductDiscounts(productDiscounts: ProductDiscounts) {
        this.productDiscounts = productDiscounts;
    }

    /**
     * Applies the associated discount for the given product.
     * @param product The product to receive the discount
     */
    public applyDiscount(product: Product) {
        this.productDiscounts[product.getType()]?.(product);
    }

    /**
     * A function that applies discounts to products when calculating total.
     * 
     * @param product The product which receives the multi buy offer
     * @param triggerNumber Number of items before discount applies
     * @param numOfFreeProducts Number of free products
     */
    public multiBuy(product: Product, triggerNumber: number, numOfFreeProducts: number) {
        const type = product.getType();
        const amount = this.multiBuyTracker[type];
      
        if (!amount) {
            this.multiBuyTracker[type] = 1;
        } else if (amount < triggerNumber) {
            this.multiBuyTracker[type] += 1;
        } else if (amount === triggerNumber) {
            this.multiBuyTracker[type] = 0;
            const currentPrice = product.getPrice();
            const newPrice = currentPrice - (currentPrice * numOfFreeProducts);
            product.setPrice(newPrice);
        };
    }
}