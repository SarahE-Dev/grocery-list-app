const mongoose = require('mongoose');
const app = require('./app')

mongoose
    .connect('mongodb://127.0.0.1:27017/grocery-list')
    .then(()=>{
        app.listen(3000, ()=>{
            console.log('Server started on Port: 3000');
        })
        console.log(('MONGO DB CONNECTED'));
    })
    .catch(e=>{
        console.log(e);
    })
