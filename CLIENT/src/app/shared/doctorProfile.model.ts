export interface doctorProfile{
    fullName:string,
    mobile_num:string,
    email:string,
    profilePic:string,
    RegnNumber:string,
    description?:string,
    specialization?:string,
    fee?:number,
    education?: Education[],
    experience?:Experience[]
}

export interface Education{
    degree?:string,
    college?:string,
    graduation_year?:string
}

export interface Experience{
    hospital?:string,
    term?:number
}