window.addEventListener('load', function(){

    

    function apiCall (url){

        fetch(url)
            
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
                gif += `<br><button id="fav"><i class="fas fa-star"></i></button>`
                gif += `<input type="hidden" id="gifId" name="gifId" value="${informacion.data[i].id}">`
                //capturamos el elemento <ul> y le insertamos un <li> con el contenido de la variable gif por cada elemento encontrado
                document.querySelector('ul').innerHTML += "<li>" + gif + "</li>"

            }

            
            let camposConError = {};
            let favBtns = Array.from(document.querySelectorAll('#fav'))
            let favIds = Array.from(document.querySelectorAll('#gifId'))

            let idFavs = []
                        

            for (i=0; i < favBtns.length; i++){
                    
                let favId = favIds[i].value
                            
                favBtns[i].addEventListener('click', function(){

                    this.style.color = "yellow"

                    saveLocalId (favId)

                })
                
            }
            
        })
        // Ponemos un catch para atrapar errores en caso de que giphy no funcione, o haya un error en el codigo
        .catch(function (e){
          alert("Error! Intente mas tarde")
        })
    }

    document.getElementById('search-btn').addEventListener('click', function(){

        
        document.querySelector('ul').innerHTML = ""
        
        searchTerm = document.getElementById('search-term').value
        searchQty= document.getElementById('search-qty').value

        if(searchTerm == "" || searchQty == ""){

            searchTerm = "sorry"
            searchQty= "1"

        }
     
        apiCall (`https://api.giphy.com/v1/gifs/search?api_key=u0v6ngofcrY7dwgwgftKuWNMlgD12XOR&q=${searchTerm}&limit=${searchQty}&offset=0&rating=g&lang=en`)
        
        document.querySelector('h1').innerHTML = `Resultado de búsqueda para: "${searchTerm}"`      

        
    })

    function saveLocalId (id) {

        let gifIds

        // Si no hay nada guardado creamos un array vacio
        if (!localStorage.getItem("gifIds")) {
            
            gifIds = []
            
        } else {
            // si hay algo lo pasamos a formato JS
            gifIds = JSON.parse(localStorage.getItem("gifIds"));
        }

        // guardamos lo capturado en la variable
        gifIds.push(id);
        // guardamos en LS la variable anterior pasada a string
        localStorage.setItem("gifIds", JSON.stringify(gifIds))

    }
    
})

