import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

type User={
    username:string;
    password:string;
};

const db:User[] = [];

app.post("/register",async(req,res)=>{
    const{username,password}:{username:string,password:string} = req.body;
    const hash = await bcrypt.hash(password,10);

    db.push({
        username,
        password:hash,
    });
    console.log(db);
    res.send("ok");
});

app.post("/login",async(req,res)=>{
    const{username,password}:{username:string,password:string} =req.body;
    const user = db.find((u)=>u.username===username);
    if(!user){
        res.send("Wrong username");
        return;
    }
    const isValid = await bcrypt.compare(password,user.password);

    if(!isValid){
        res.send("Wrong Password!");
        return;
    }
    res.send("login successfull");

});

app.listen(3005,()=>console.log("App is listening in the port 3005"));

