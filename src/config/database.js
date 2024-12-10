const mongoose=require("mongoose");
const mongo_URL="mongodb://localhost:27017/"

const dbConnect=async()=>{
    await mongoose.connect(`${mongo_URL}authDB`);
}

module.exports=dbConnect;
