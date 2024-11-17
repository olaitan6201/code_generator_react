export interface Service {
    id: number
    name: string
    slug: string
}

export interface ServiceUnitPrice {
    id: number
    service: Service
    unit_size: number
    unit_price: number
}