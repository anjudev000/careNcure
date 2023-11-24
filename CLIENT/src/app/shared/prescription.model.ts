export interface Prescription{
    diagnosis:string;
    medicines:Medicine;
    advice:string;
}

export interface Medicine{
    medicine:string;
    dosage:string
}