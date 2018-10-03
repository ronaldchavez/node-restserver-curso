require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');



const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//habilitar carpeta public
app.use(express.static(path.resolve(__dirname,'../public')));
 
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/index'));


 

mongoose.connect(process.env.URlDB, { useNewUrlParser: true }, (err, res) => {
	if(err) throw err;

	console.log('base de datos ONLINE');
});
 
app.listen(process.env.PORT, () => {
	console.log('escuchando puerto ',process.env.PORT);
});