const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

app.use(express.static("public"));// refer to static files in singe space
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");  //responding to get request by client, send the html
});

app.post("/",function(req,res){
    console.log(req.body.fn+"| |"+req.body.ln+"| |"+req.body.ea+" ");
    var data={
        members:[
            {
                email_address:req.body.ea,
                status:"subscribed",
                merge_fields:{
                    FNAME:req.body.fn,
                    LNAME:req.body.ln
                }
            }
        ]
    };
    const d=JSON.stringify(data);  //convert data from json to pass as req to site
    
    const url="https://us5.api.mailchimp.com/3.0/lists/"+listId;

    const options={ //follow documentation and set respective paras
        method:"POST",
        auth: "test:"+apiKey,
    }

    const r=https.request(url,options,function(response){   //API doc mentions to create and pass req like this
        // console.log(response);
        if(response.statusCode===200)   // So page doesnt keep loading 
        res.sendFile(__dirname+"/success.html");
        else 
        res.sendFile(__dirname+"/failure.html");
        
            response.on("data",function(data){  //On receiving data after url req to add subscriber
            console.log(JSON.parse(data));
        })

    });

    r.write(d);
    r.end();
})

app.post("/fail",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,()=>{     //listen on port set by heroku or local 3000
    console.log("Listening on 3000");
})
