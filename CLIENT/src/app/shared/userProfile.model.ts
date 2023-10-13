export interface UserProfile{
    fullName:string,
    mobile_num:string,
    email:string,
    profilePic:string,
    gender?:string,
    dob?:Date,
    bloodGroup?:string
    address?: Address[]

}

export interface Address{
    houseName?:string,
    houseNumber?: string
    street?:string,
    city?:string,
    state?:string,
    pincode?:number
}