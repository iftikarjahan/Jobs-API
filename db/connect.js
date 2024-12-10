const mongoose = require('mongoose')


mongoose.set('useFindAndModify', false);
const connectDB = (url) => {
  // mongoose.connect() returns a promise which needs to be resolved later
  // options are used for preventing the deprication warnings
  return mongoose.connect(url,{
     useNewUrlParser: true ,
     useUnifiedTopology: true
  })
}

module.exports = connectDB

// INFO ABOUT ASYNC FUNCTIONS

// {
//   // const fetchData=()=>{
//     //   return new Promise((resolve,reject)=>{
//       //     console.log("Fetching Data....")
      
//       //     setTimeout(()=>{
//         //       const success=Math.random()>0.5;
//         //       if(success){
//           //         resolve("Data fetched successfully. Promise resolved");
//           //       }
//           //       else{
//             //         reject("Failed to fetch data. Promise rejected!!!");
//             //       }
//             //     },3000);
//             //   })
//             // }
            
//             // // Using the promise using async function
//             // const anyncFunction=async()=>{
//               //   try {
//                 //     const data=await fetchData();
//                 //     console.log("Success🫡: ",data);
//                 //   } catch (error) {
//                   //     console.log("Error🥶: ",error);
//                   //   }
//                   // }
                  
//                   // // anyncFunction();
//                   // const data=fetchData();
//                   // console.log(data);    //logs a pending promise
                  
//                   // // Note that you can fetch data from a pending promise at any moment using the then...catch syntax or the async await syntax
//                   // // data.then(val=>{
//                     // //   console.log("ccc: ",val);
//                     // // }).catch(err=>{
//                       // //   console.log("err: ",err);
//                       // // })
                      
//                       // const fnn=async()=>{
//                         //   try {
// //     const ans=await data;
// //     console.log("Hahaa😅: ",ans);
// //   } catch (error) {
//   //     console.log("Ohhh🥶: ",error);
  
//   //   }
//   // }
  
//   // fnn();
// }