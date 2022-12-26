const express = require('express');
const app = express();
const mongoose = require('mongoose');

const data =require('./data');
const Thing = require('./models/things');

mongoose.connect('mongodb+srv://moon:passwordh@cluster0.dwotniw.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


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

    delete req.body._id;
    const thing = new Thing({
        ...req.body // permet de parcourir tous les elements du body 
    });
    thing.save()
    .then(()=>res.status(201).json({message:'objet enregistrer en db !'}) )
    .catch(error=> res.status(400).json({error:error}));

  });

  app.get('/api/stuff/:id',(req,res,next)=>{
    Thing.findOne({_id:req.params.id})
    .then(thing=> res.status(200).json(thing))
    .catch(error=> res.status(404).json({error}));
    
  });

app.get('/api/stuff',(req,res,next)=>{
    //const stuff = data;
    Thing.find()
    .then(things=> res.status(200).json(things))
    .catch(error=>res.status(400).json({error}));

    //res.status(200).json(stuff);
});


module.exports = app;
