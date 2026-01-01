import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("database is connected successfully");
        
    } catch (error) {
        console.log(error);
    }

}
export default connectDB;
//eccommerceapp
//username raghuvarbisht_db_user
//passwordraghuvar
