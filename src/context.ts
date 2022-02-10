import * as React from 'react'

export const initialGlobalContextState = {
    username: 'no username',
    tokens: 'no jwt',
}

export const GlobalContext = React.createContext({ctx: <any>{}, setCtx: (val: any)=>{}})