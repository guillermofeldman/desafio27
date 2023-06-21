import mongoose from 'mongoose';

export const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CNN );
        console.log( 'On line.' );
        
    } catch ( error ) {
        console.log( error );
        throw new Error( 'Could not connect to database.' );
    }
};