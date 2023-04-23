import { DomainMedical } from "./domain-medical"

export interface Doctor {
    id:number
    username:string
    email:string
    password:string
    DomainMedical:DomainMedical
    adresse:string
    photo:string
    age:number
    patients:number
    points:number
}
