import * as React from 'react'


export const initialAuthContextState = {
    username: 'no username',
    tokens: 'no jwt',
}



export const AuthContext = React.createContext({ctx: <any>{}, setCtx: (val: any)=>{}})