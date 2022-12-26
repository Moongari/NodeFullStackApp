const express = require('express');
const app = express();


// permert d'intercepter des informations au format json depuis une requete POST
app.use(express.json());

// app.use((req,res,next)=>{
//     console.log('requete recue !');
//     next();
// });

// app.use((req,res,next)=>{
//     res.status(201);
//     next();
// });

// app.use((req,res,next)=>{
//     res.json({message:'votre message a bien ete recue'});
//     next();
// });

// app.use((req,res)=>{
// console.log('reponse envoye avec succés!');
// });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.post('/api/stuff',(req,res,next)=>{

    console.log(req.body);
    res.status(201).json({message:'objet crée !'});


  });
  

app.get('/api/stuff',(req,res,next)=>{
    const stuff =[
        {
            _id:'aze',
            title:'First Object',
            description:'les informations de mon premier objet',
            imageUrl : 'https://www.ericfavre.com/lifestyle/wp-content/uploads/2020/06/barres-halteres.jpg',
            price: 4500,
            userId: 'Moon'
        },
        {
            _id:'zer',
            title:'Second Object',
            description:'les informations de mon second objet',
            imageUrl : 'https://www.cdiscount.com/pdt2/4/9/0/1/700x700/son6955880321490/rw/songmics-set-de-2-halteres-courts-avec-disques-en.jpg',
            price: 900,
            userId: 'Moon'
        },

    ];
    res.status(200).json(stuff);
});


module.exports = app;
