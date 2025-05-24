import mongoose from 'mongoose'

export const connectDb= async ()=>{
    try {
    const connect  =  await mongoose.connect(process.env.MONGO_URL)
    console.log(`mongoDb connected ${connect.connection.host}`)
    } catch (error) {
        console.log('Error occured while connecting to mongoDb!!')
        process.exit(1) //failure
    }
}