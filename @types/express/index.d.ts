export interface TokenData {
    id: string
    email: string
    name: string
    iat: number
    exp: number
}

interface Context {
    tokenData: TokenData;
}

declare global {
    namespace Express {
        interface Request {
            context: Context;
        }
    }
}