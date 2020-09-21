window.addEventListener('load', function(){

    //le pedimos al usuario la cantidad de GIF que quiere ver y lo guardamos en una variable
    let cantidadGifs = prompt("Escribi la cantidad de GIFs a mostrar")
    
   //En la URL que le pasamos al FETCH le agregamos la variable que indica la cantidad de GIFs
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=u0v6ngofcrY7dwgwgftKuWNMlgD12XOR&limit=${cantidadGifs}&rating=g`)

    .then(function(respuesta){
        //Decodificamos las respuesta que nos da el fetch
        return respuesta.json();
    })
    //Una vez decodificada la info podemos trabajar con ella
    .then(function(informacion){
        console.log(informacion.data);

        //Usamos un for para reccorres toda la info que nos llego
        for (i=0; i < informacion.data.length; i++){

            //Por cada elemento que encontramos agregamos un <p> y un <img> a la variable gif
            let gif = "<p>" +  informacion.data[i].title +"</p>"
            gif += "<img src="+  informacion.data[i].images.original.url +">"

            //capturamos el elemento <ul> y le insertamos un <li> con el contenido de la variable gif por cada elemento encontrado
            document.querySelector('ul').innerHTML += "<li>" + gif + "</li>"
        }
    })
    // Ponemos un catch para atrapar errores en caso de que giphy no funcione, o haya un error en el codigo
    .catch(function (e){
        alert("Error! Intente mas tarde")
    })
})