require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const connectDB=require("./db/connect");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware=require("./middleware/authentication");

app.use(express.json());
// extra packages

// KNOWLWDGE BAG
// {
//   /*
//   /*
//   // UNDERSTANDING next() function call
//   /*
//   ->Generally its a good practice if you avoid using next() after sending the response back
//   to the client
//   ->However you can do it in rare cases where it does not modify the response
//   */
//   // app.use((req,res,next)=>{
//   //   res.send("<h1>Response to the client</h1>")
//   //   next();
//   // })
//   // app.use((req,res,next)=>{
//   //   // This function would get executed without any error because you are not modifying the response
//   //   // res.send("<h2>xxxxxxxx</h2>")     this would produce an error
//   //   // only performs the task without modifying the response
//   //   console.log("Post response task");
//   // })
//   // routes
//   // app.get('/', (req, res) => {
//   //   res.send("<h1>For the default / path</h1>");
//   // });
//   /*
//       ->Instead of app.get(), if I use app.use(), then the middleware gets executed for every requests
//       ->This is because app.use() uses path prefix matching
//       app.use() matches all paths because / is a prefix for every valid URL path. Therefore:
      
//       A request to / matches.
//       A request to /about also matches because /about starts with /.
//       A request to /api/resource matches as well.
      
//       ->If you want the handler to execute only for the specific path, then use the app.get()
//       method
      
//       // app.use('/', (req, res) => {
//         //   res.send("<h1>For the default / path</h1>");
//         // });
        
//         */
// }



app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/jobs",authMiddleware,jobRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;



const start = async () => {
  try {
    const result=await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB👻");
    
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log("Error🚩: ",error);
  }
};

start();

