const {MongoClient}=require('mongodb');

const express=require('express')

const app=express();

const port=3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const url='mongodb+srv://prethambachira:1819@cluster0.2rcpjkw.mongodb.net/?retryWrites=true&w=majority';

async function forms(){

    try{
      
     const client=new MongoClient(url);

    const db=client.db('cluster0');
    const collection=db.collection('myform');
    
    app.use(express.static('public'))

    app.get('/',(req,res)=>{

        res.sendFile(__dirname + '/public/signin.html')
    })

   

    app.post('/submit',async(req,res)=>{

        try{

        const {name,email,password,phone,address,city,state,zip,interests1,interests2,interests3}=req.body;

        await collection.insertOne({

            name:name,
            email:email,
            password:password,
            phone:phone,
            address:address,
            city:city,
            state:state,
            zip:zip,
            interests1:interests1,
            interests2:interests2,
            interests3:interests3,
        })

        res.sendFile(__dirname + '/public/login.html');

        }
        

        catch(err){

            console.log(err)
        }
    })
  

    app.get('/log',(req,res)=>{

        res.sendFile(__dirname + '/public/login.html');
    })
    

    app.post('/login',async(req,res)=>{
      try{
       
        
        const {username,email,password}=req.body;

        let user= await collection.findOne({name:username});

        if(!user){

           res.send('wrong email or password')
        }

        if(user.email===email && user.password===password){

            res.send('succefull');
        }
    
      }

      catch(err){

        console.log(err)
      }
    })

    app.listen(port,()=>{
        console.log('listing at port',port)
    })

    }

    catch(err){

        console.log(err)
    }
}

forms();