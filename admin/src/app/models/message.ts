import { Doctor } from "./doctor"

export interface Message {
    id:number
    sender:Doctor
    receiver:Doctor
    content:String
    timestamp:Date
}
