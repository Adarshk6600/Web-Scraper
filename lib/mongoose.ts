import mongoose from 'mongoose'

let isConnected = false;

export const dbConnect = async () => {
  mongoose.set('strictQuery', true)
  if(!process.env.MONGO_DB_URI) return console.log('mongo db uri is not defined');
  if (isConnected) return console.log('using existing database');
  
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    isConnected = true
    console.log('mongo DB connected');
    
  } catch (error) {
    console.log(error);
    
  }
  
} 