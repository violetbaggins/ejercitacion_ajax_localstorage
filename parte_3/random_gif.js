window.addEventListener('load', function(){

    //creamos una funcion para poder usarla dentro del boton
    function apiCall (url){

        //Indicamos la URL en donde vamos a buscar el gif
        fetch(url)
    
        // Como la promesa devuelta esta en formato JSON la decodificamos en este then con el método .JSON()
        .then(function(respuesta){
            return respuesta.json();
        })
        //Una vez decodificada la info podemos trabajar con ella
        .then(function(informacion){
    
            //Hacemos console.log de la info decodificada para descubrir que propiedades podemos usar
            console.log(informacion.data);
    
            //en una variable guardamos la etiqueta de HTML y la info sobre el titulo
            let gifTitle = "<h1>" + informacion.data.title + "</h1>"
    
                //Preguntamos si el titulo llego vacio y de ser asi, le damos un titulo por default
                if (informacion.data.title == "" || informacion.data.title == " "){
                    gifTitle = "<h1> Gif sin título</h1>"
                }
    
            //en una variable guardamos la etiqueta de HTML y la info sobre el gif
            let gifUrl = "<img src=" + informacion.data.images.original.url + ">"
    
            //Capturamos el gif y le agregamos el contenido de las variables previamente declaradas
            document.querySelector('div').innerHTML = gifTitle + gifUrl
            
        })
        
        // Ponemos un catch para atrapar errores en caso de que giphy no funcione, o haya un error en el codigo
        .catch(function (e){
            alert("Error! Intente mas tarde")
        })
    }

    //llamamos a la funcion al cargar la pagina para que no nos quede en blanco
    apiCall ("https://api.giphy.com/v1/gifs/random?api_key=u0v6ngofcrY7dwgwgftKuWNMlgD12XOR&tag=&rating=g");


    //Capturamos el boton para recargar otro gif
    document.getElementById('nextGif').addEventListener('click', function(){

        //llamamos a la funcion al cargar un nuevo gif
        apiCall ("https://api.giphy.com/v1/gifs/random?api_key=u0v6ngofcrY7dwgwgftKuWNMlgD12XOR&tag=&rating=g");
    })
})