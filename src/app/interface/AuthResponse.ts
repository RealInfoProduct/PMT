export interface AuthResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registerd?: boolean
}

export interface ProductList {
    id: string,
    productPic :any
    productName :any
    productPrice :any
    productQuantity :any
    productDesc :any
    loginId : any
    
}
export interface Partylist {
    id: any,
    // party_list: any,
    party_name: any,
    party_panNumber: any,
    party_partygstin: any,
    party_address: any,
    party_mobile: any,
    loginId: any
    
}

export interface FirmMasterList {
    id: any,
    firm_header: any,
    firm_mobileno: any,
    firm_subheader: any,
    firm_personalmobileno: any,
    firm_address: any,
    firm_bankname: any,
    firm_GSTNo: any,
    firm_BankIFSC: any,
    firm_GSTpercentage: any,
    firm_bankaccountno: any,
    firm_pannor: any,
    invoiceNumber : number
    loginId :any    
}

export interface BalanceList {
    id: any,
    name : any,
    date : any,
    PaymentType : any,
    amount : number,
    loginId: any,
    createdAt :any
}

export interface PlatformList {
    id: any,
    platFormName : any,
    loginId: any,
}
export interface OrderList {
    id: any,
    name : any,
    date : any,
    platFormName : any,
    amount : number,
    loginId: any,
}
export interface InvoiceMaster {
    id: any,
    firm : any,
    party : any,
    details : any,
    date : any,
    amount : number,
    invoiceNumber : number,
    loginId: any,
}