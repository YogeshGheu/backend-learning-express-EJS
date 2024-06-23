import mongoose from "mongoose";

async function conneection(connectionString){
    try {
        const connection = await mongoose.connect(connectionString);
        console.log("mongoDB is connected");
    } catch (error) {
        console.log("ERROR OCCURED - ", error);
    }
}

export default conneection;

