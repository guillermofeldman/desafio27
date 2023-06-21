import { Router } from 'express';
import passport from 'passport';

import userModel from '../dao/models/usersModel.js';
import { createHash, validatePassword } from '../helpers/bcryptHash.js';


const router = Router();

router.post( '/register', 
    passport.authenticate('register', { failureRedirect:'/failregister' } ),
    async ( req, res ) => {

        res.send({ status: 'succes', message: 'User registered' });
});

router.post( '/login',
    passport.authenticate('login',{failureRedirect:'/faillogin'}),
    async ( req, res ) => {
    
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if( !user ){
            return res.status(400).send({status:"error", error: 'Wrong credentials.' })
        }

        const validPassword = validatePassword( password, user );
        if( !validPassword ) return res.status(400).send({status:"error", error:"Wrong credentials."})
    
        req.session.user = {
            name: `${ user.first_name } ${ user.last_name }`,
            email: user.email,
        }
        res.send({ status: 'success', payload: req.user, message: 'User logged in.' });
    
});

router.get( '/logout', ( req, res ) => {
    req.session.destroy( err => {
        
        if( err ) return res.status(500).send({ status: 'error', error: 'Impossible to log off session.' });
        res.redirect( '/login' );
    });
});


// Github
router.get('/github', passport.authenticate( 'github', { scope:['user:email'] }), async ( req, res ) => {});
router.get('/githubcallback', passport.authenticate( 'github', { failureRedirect: '/login' }), async ( req, res ) => {
    
    req.session.user = {
        name: req.user.first_name,
        email: 'Github',
    }

    res.redirect( '/profile' );
});


router.get('/current', ( req, res ) => {

    const currentUser = passport.serializeUser(( user, done ) => {
        done( null, user.first_name );
    });

    console.log( {currentUser} )

    res.send({ status:"success",payload:req.user})
});

export default router;