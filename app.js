const { create } = require('domain');
const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root' ,
    password: '',
    database: 'health'
});

//connect db
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Mysql connected')
})
const app = express();

//Show all patients
app.get('/patients', (req,res) =>{
    //let post = {fname: 'Eugene', lname: 'Korir', email: 'korir@gmail.com', phone_number: '0712829006' }
    let sql = 'SELECT * FROM patients';
    db.query(sql, (err, result)=>{
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    });
});

//Show specific patient
app.get('/patients/:id', (req,res) =>{
    let sql = `SELECT * FROM patients WHERE id=${req.params.id}`;
    db.query(sql, (err, result)=>{
        if (err){
            throw err;
        }else{
            console.log(result);
            res.send(JSON.stringify(result));            
        }        
    });
});


//delete patient
app.delete('/patients/:id', (req,res)=>{
    let sql = `DELETE FROM patients WHERE id=${req.params.id}`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    });

});

//update patient
app.post('/patients/:id', (req,res)=>{
    let sql = `DELETE FROM patients WHERE id=${req.params.id}`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result)
    });

});

app.listen('3000', () =>{
    console.log('Server started at port 3000')
});