import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";

dotenv.config();

const app = express();


app.use(
    cors({
        origin: "process.env.BASE_URL",
        credentials: true,
        methods:["GET", "POST", "DELETE", "OPTIONS"],
        allowedHeaders:["Content-Type", "Autherization",
        ]
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use()
const port = process.env.PORT || 8000;;

app.get('/', (req, res) => {
  res.send('somil')
});

app.get('/piyush',(req, res) => {
  res.send('Piyush');
});
 //connect to db
 db();
 //user routes
 app.use("/api/v1/user", userRoutes);

 //user 
 // 
 // 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 routes


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
