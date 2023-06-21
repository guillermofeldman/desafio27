import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import handlebars from 'express-handlebars';
import dotenv from 'dotenv/config.js';


import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionRouter from './routes/sessions.router.js';
import productsRouter from './routes/products.router.js'
import initializePassport from './config/passport.config.js';
import { dbConnection } from './database/config.js';


// const connection = mongoose.connect( process.env.DB_CNN );

const app = express();

dbConnection();

app.use( express.json() );
app.use( express.urlencoded({ extended: true }));
app.use( express.static( __dirname + '/public' ));
app.use(session({
    store: new MongoStore({
        mongoUrl: process.env.DB_CNN,
        ttl:3600
    }),
    secret:'CoderSecret',
    resave:false,
    saveUninitialized:false
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


// handlebars
app.engine( 'handlebars', handlebars.engine() );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'handlebars' );

app.listen( process.env.PORT, () => {
    console.log( `Server connected to port: ${ process.env.PORT }`);
});

app.use( '/', viewsRouter );
app.use('/api/session', sessionRouter );
app.use('/api/products', productsRouter );
