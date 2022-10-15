

export interface ILogin {
    userName: string,
    password: string
}

export interface IDecodedToken {
    exp: number, 
    iat: number, 
    isAdmin: 0 | 1,
    userId: number 
}