import { Product } from "./product"
import { Till } from "./till";

export enum ProductType {
    Apple,
    Orange
};

export type PriceList = { [key in ProductType]: number }

export type ProductDiscounts = { [key in ProductType]?: (product: Product) => void }

export const addToCart = (cart: Product[], productType: ProductType, till: Till, numOfProducts: number): Product[] => {
    for (let i = 0; i < numOfProducts; i++) {
        cart.push(new Product(productType, till));
    }
    return cart;
}