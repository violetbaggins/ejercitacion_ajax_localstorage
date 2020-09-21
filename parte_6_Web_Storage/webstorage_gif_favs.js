window.addEventListener('load', function(){

    if(!localStorage.getItem("gifIds")){

        document.getElementById('no-favs').innerText = "No tenes favoritos"

    } else {

        let favs = JSON.parse(localStorage.getItem("gifIds"))
      
            for (i=0; i < favs.length; i++){
    
                apiCall (`https://api.giphy.com/v1/gifs/${favs[i]}?api_key=u0v6ngofcrY7dwgwgftKuWNMlgD12XOR`)
    
            }
    }


    function apiCall (url){

        fetch(url)
            
        .then(function(respuesta){
            //Decodificamos las respuesta que nos da el fetch
            return respuesta.json();
        })
        //Una vez decodificada la info podemos trabajar con ella
        .then(function(informacion){
            console.log(informacion.data);            

            //Por cada elemento que encontramos agregamos un <p> y un <img> a la variable gif
            let gif = "<p>" +  informacion.data.title +"</p>"
            gif += "<img src="+  informacion.data.images.original.url +">"
            gif += `<input type="hidden" id="gifId" name="gifId" value="${informacion.data.id}">`
            //capturamos el elemento <ul> y le insertamos un <li> con el contenido de la variable gif por cada elemento encontrado
            document.querySelector('ul').innerHTML += "<li>" + gif + "</li>"
   
        })
        // Ponemos un catch para atrapar errores en caso de que giphy no funcione, o haya un error en el codigo
        .catch(function (e){
          alert("Error! Intente mas tarde")
        })
    }

   

   
    
})

