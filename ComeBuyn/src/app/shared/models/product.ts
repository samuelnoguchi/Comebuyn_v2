export interface Product {
    $key: string
    category: string
    imageUrl: string
    description: string
    numBuyers: number
    numBuyersRequired: number
    buyers: {}
    tags: {}
    price: number
    title: string
}