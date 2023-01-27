export type User = {
    id: number,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
    status: USER_STATUS
    orders?: Order[],

    updatedAt: Date
    createdAt: Date
}

export enum USER_STATUS{
    ACTIVE = 'ACTIVE',
    NOT_ACTIVE='NOT_ACTIVE'
}

type Category = {
    id: number,
    name: string

    updatedAt: Date
    createdAt: Date
}

type Product = {
    id: number
    name: string
    description?: string
    price: number
    quantity: number
    categoryId: number
    category?: Category,

    updatedAt: Date
    createdAt: Date
}

type Order = {
    id: number
    status: ORDER_STATUS,
    price: number
    user: User,
    userId: number
    products?: Order_Product[],

    updatedAt: Date
    createdAt: Date
}

enum ORDER_STATUS{
    OPENED = 'OPENED',
    PAID = 'PAID',
    SENT = 'SENT',
    FINISHED = 'FINISHED',
}


type Order_Product = {
    id: number
    quantity: number
    product?: Product,
    productId: number
    order?: Order
    orderId: number

    updatedAt: Date
    createdAt: Date
}