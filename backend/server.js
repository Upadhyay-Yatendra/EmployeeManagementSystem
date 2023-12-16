const app = require('./app.js');

const { connectDB } = require('./db/connect.js'); 
const port = process.env.PORT || 5000;

connectDB();
app.listen(port, ()=>{
    console.log("server is running on port : ", port);
})