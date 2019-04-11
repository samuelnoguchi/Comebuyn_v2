export interface Product {
    $key: string
    category: string
    imageUrl: string
    numBuyers: number
    numBuyersRequired: number
    buyers: {}
    price: number
    title: string
}