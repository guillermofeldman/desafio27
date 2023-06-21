const form = document.getElementById('register-form');


form.addEventListener( 'submit', ( event ) => {
    event.preventDefault();

    const object = {};

    const data = new FormData( form );
    data.forEach(( value, key ) => object[key] = value );
    
    fetch( '/api/session/register', {

        method:'POST',
        body: JSON.stringify( object ),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( result => result.json() ).then( result => {

        console.log( result )
        if(result.status == 200){
            window.location.replace( '/api/products' );
        }
    });
});
