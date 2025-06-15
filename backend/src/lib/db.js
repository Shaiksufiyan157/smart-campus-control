import mongoose from "mongoose"

export const connectDB= async ()=>{

try{
const conn=await mongoose.connect(process.env.DB_URI)
console.log(`connected to database ${conn.connection.host}`)

}
catch(error){
console.log(`connection failed ${error}`)
}

};