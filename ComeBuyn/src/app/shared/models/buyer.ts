import { ShippingInfo } from 'shared/models/shipping-info';

export interface Buyer {
    id: string;
    shippingInfo: ShippingInfo;
}