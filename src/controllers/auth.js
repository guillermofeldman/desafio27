export const registerUser = async( req, username, password, done ) => {

    const { first_name, last_name, age, email } = req.body;

    try {
        const user = await userModel.findOne({ email: username }); 
        
        if( user ){
            console.log( 'The user already exists' );
            return done( null, false );
        }

        const newUser = {
            first_name, 
            last_name,
            age, 
            email,
            password: createHash(password)
        }

        const result = await userModel.create( newUser );
        
        return done( null, result );

    } catch ( error ) {
        return done( "Error creating user.", error );
    }
};