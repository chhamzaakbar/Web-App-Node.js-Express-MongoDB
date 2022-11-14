const express = require('express');
const debug = require('debug')('app:sessionRouter'); 
const {MongoClient, ObjectID} = require('mongodb');
const sessions = require('../data/sessions.json');

const sessionsRouter= express.Router();

sessionsRouter.route('/').get((req,res)=>{
    const url ='mongodb+srv://chhamzaakbar:i5.9qzDTs-Qc8Cg@technischeuniversitat.xt1omyl.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'technischeUniversitat';
    
   (async function mongo() {
     let client;
     try {
       client = await MongoClient.connect(url);
       debug('Connected to the mongo DB');
 
       const db = client.db(dbName);
 
       const sessions = await db.collection('sessions').find().toArray();
       res.render('sessions',{sessions});
     } catch (error) {
       debug(error.stack);
     }
    client.close();
    })();
});
sessionsRouter.route('/:id').get((req,res)=>{
const id=req.params.id;
const url ='mongodb+srv://chhamzaakbar:i5.9qzDTs-Qc8Cg@technischeuniversitat.xt1omyl.mongodb.net?retryWrites=true&w=majority';
const dbName = 'technischeUniversitat';

(async function mongo() {
 let client;
 try {
   client = await MongoClient.connect(url);
   debug('Connected to the mongo DB');

   const db = client.db(dbName);

   const session = await db.collection('sessions').findOne({_id: new ObjectID(id)});
   res.render('session',{session});
 } catch (error) {
   debug(error.stack);
 }
client.close();
})();
  
});

module.exports = sessionsRouter;