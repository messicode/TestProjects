const express=require("express");
const app=express();
const https= require("https"); 
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    });

app.post("/",function(req,res){
    
    const loc=req.body.loc;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid="+apiKey;
    https.get(url,function(rs){
        rs.on("data",function(data){
            const wD=JSON.parse(data);
            console.log(wD.weather[0].description);
            const icAdd="http://openweathermap.org/img/wn/"+wD.weather[0].icon+"@2x.png";
            res.write("<h1>Temperature is "+wD.main.temp+". Weather seems "+wD.weather[0].description+"</h1>");
            res.write("<img src='"+icAdd+"'/>");
            res.send();
        });
    });    
});

app.listen(3000,()=>{
    console.log("Server Listening on port 3000");
});
