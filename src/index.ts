export enum ProductType {
    Apple,
    Orange
};

export type PriceList = { [key in ProductType]: number }