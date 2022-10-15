
export interface IUser {
    id: number,
    isAdmin: number,
    userName: string
}

export interface INewUser {
    userName: string,
    password: string,
    isAdmin?: number
}

export interface INewUserErrors {
    userName: boolean,
    password: boolean,
}