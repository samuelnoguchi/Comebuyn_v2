import { Product } from './product';

export interface Order {
    productId:string;
    product:Product;
}