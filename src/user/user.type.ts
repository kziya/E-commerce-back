type BaseTable = {
    id: number
    updatedAt: Date
    createdAt: Date
}

export type User  = {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
    status: USER_STATUS
    orders?: Order[],
} & BaseTable

export enum USER_STATUS{
    ACTIVE = 'ACTIVE',
    NOT_ACTIVE='NOT_ACTIVE'
}

type Category = {
    name: string
} & BaseTable

type Product = {
    name: string
    description?: string
    price: number
    quantity: number
    categoryId: number
    category?: Category,
} & BaseTable

type Order = {
    status: ORDER_STATUS,
    price: number
    user: User,
    userId: number
    products?: Order_Product[],
} & BaseTable

enum ORDER_STATUS{
    OPENED = 'OPENED',
    PAID = 'PAID',
    SENT = 'SENT',
    FINISHED = 'FINISHED',
}


type Order_Product = {
    quantity: number
    product?: Product,
    productId: number
    order?: Order
    orderId: number
} & BaseTable