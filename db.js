/** @format */
const dotenv = require('dotenv')

const mongoose = require('mongoose')
const {MongoClient} = require('mongodb');
dotenv.config('./.env')
const url = process.env.MONGO_URL1;


const client = new MongoClient(url);
const database = 'granddragon'
 async function getData(){
   let result = await client.connect()

     let db = result.db(database)

     let fooditems =db.collection('fooditems')
     console.log('conneted')
     const response= await fooditems.find({}).toArray()

     
     let foodcatagory =db.collection('foodcatagory')
     const response2 = await foodcatagory.find({}).toArray()

     global.food_items= response
     global.foodCatagory = response2
}
getData()

module.exports =async()=>{
  const mongoUri= process.env.MONGO_URL2;

  
      try {
          const connect =  await mongoose.connect(mongoUri, {
              useUnifiedTopology: true,
              useNewUrlParser : true
            }) ;
      
            console.log(`Mongodb Connected`)
           
      
          } catch (error) {
              console.log(error);
              process.exit(1); // if there is no connection between database then we dont want to further processs
            }
          }


