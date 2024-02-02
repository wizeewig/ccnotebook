const mongoose= require('mongoose');
const mongoURI=   "mongodb+srv://ikchhit:QHJ6XJPXfJE7xsug@cluster0.gdclbha.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo =()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports= connectToMongo;