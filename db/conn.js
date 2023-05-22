const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config()
const DATABASE_URL=process.env.DATABASE_URL

const connections = mongoose.connect(DATABASE_URL)
                    .then(()=>{
                        console.log("🐻connect with database successfully 🚀");
                    })
                    .catch((ERR)=>{
                        console.log(ERR,"error will be occured in the connection with database");
                    })


module.exports={ connections }                    