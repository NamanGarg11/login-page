const express = require('express');
const bodyparser = require('body-parser');
const request = require('request'); 
const https = require('https');
const app=express()
const port=3000
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/singup.html")
})
app.post('/',(req,res)=>{
    const fname=req.body.firstn;
    const sname=req.body.secondn;
    const emal=req.body.email;
    const data ={
        members:[
            {
                email_address:emal,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:sname
                }
            }
        ]
    }
    const jsondata=JSON.stringify(data)
    const url = "https://us13.api.mailchimp.com/3.0/lists/8ca3d3e199"
    const options={
        method:"POST",
        auth:"naman1:b4e64d65d0ddb7e59f66bac4b57031b8-us13"
    
        }
        
    


const request=  https.request(url,options,(response)=>{
    if(response.statusCode === 200)
        res.send("successful")
    else 
        response.send("unsuccessful please try again later ")    
    response.on("data",(data)=>{
            console.log(JSON.parse(data))
        })
    })
    request.write(jsondata)
    request.end();
})
 

app.listen(process.env.PORT||port,()=>{
    console.log(`current server is ${port}`)
})




// 67b57f7ca647e748d82980cb9c81670e-us13