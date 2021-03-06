///Puerto

process.env.PORT = process.env.PORT || 3000;

///Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

///Fecha de caducidad de token
//60 segundos
//60 minutos
//24 horas
//30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//Seed de autenticacion

process.env.SEED = process.env.SEED || '4laender';


///Base de datos

let urlDB;

if(process.env.NODE_ENV == 'dev'){
	urlDB = 'mongodb://localhost:27017/cafe';
}else{
	urlDB = process.env.MONGO_URI;
}

process.env.URlDB = urlDB;

//GOOGLE client
process.env.CLIENT_ID = process.env.CLIENT_ID || '566807873517-l1en2i28la4rrmsm6cnp8hf2sbnqvsbs.apps.googleusercontent.com';
