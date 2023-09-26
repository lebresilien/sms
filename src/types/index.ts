
export type User = {
    name: string,
    email: string,
    balance?: number,
    groups?: number,
    contact?: number,
    transaction?: number
}

export type ResponseAuth = {
    user: User,
    token: string
}

export type Group = {
    id: string,
    name: string,
    count: number
}

export type GroupContact = {
    id: string,
    name: string,
    contacts: string[]
}

export type Contact = {
    phone: string,
    name?: string,
    email?: string
}

export type Order = {
    id: string,
    sms_command: number,
    sms_delivery: number
}

export type Sender = {
    id: string,
    name: string,
    slug: string
}

export type Transaction = {
    id: string,
    phone: string,
    qty: string,
    message: string,
    key: number,
    createdAt?: Date
}