document.getElementById("btnBuscar").addEventListener("click", searchpics);

async function searchpics() {
    let inputBuscar = document.getElementById("inputBuscar").value;
    let contenedor = document.getElementById("contenedor");
    
    contenedor.innerHTML = "";

    try {
        // fetch
        let response = await fetch(`https://images-api.nasa.gov/search?q=${inputBuscar}`);
        let data = await response.json();

        if (data.collection.items.length > 0) {
            // Usar un bucle for para iterar sobre los elementos devueltos
            for (let i = 0; i < data.collection.items.length; i++) {
                let item = data.collection.items[i];
                let imageUrl = item.links[0].href; //pic
                let title = item.data[0].title; 
                let description = item.data[0].description || "Sin descripción"; 
                let date = item.data[0].date_created || "Fecha no disponible"; 

                // tarjeta
                let bootstrapcard = `
                    <div class="card mb-4">
                        <img src="${imageUrl}" class="card-img-top" alt="${title}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${description}</p>
                            <p> <small class="text-muted">${date}</small></p>
                        </div>
                    </div>
                `;

                // si no lo agregas no funciona micaela
                contenedor.innerHTML += bootstrapcard;
            }
        } else {
            
            contenedor.innerHTML = `<p class="text-center">No se encontraron resultados para "${inputBuscar}".</p>`;
        }
    } catch (error) {
        console.error("Error al buscar:", error);
        contenedor.innerHTML = `<p class="text-center">Error al buscar. Inténtalo más tarde.</p>`;
    }
}
