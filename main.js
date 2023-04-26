const productosDiv = document.getElementById("productosDiv")
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const search = document.getElementById("search");
const form = document.getElementById("formulario");

let limiteProductosUrl = 12;
let skipProductosUrl = 0;
let currentApiUrl = `https://dummyjson.com/products?limit=${limiteProductosUrl}&skip=${skipProductosUrl}`;

nextBtn.addEventListener('click', () => {
    if(skipProductosUrl+12>100) return;
    console.log(skipProductosUrl);
    skipProductosUrl += 12;
    currentApiUrl = `https://dummyjson.com/products?limit=${limiteProductosUrl}&skip=${skipProductosUrl}`;
    traerProductos(currentApiUrl);
});
prevBtn.addEventListener('click', () => {
    if(skipProductosUrl<12) return;
    skipProductosUrl -= 12;
    currentApiUrl = `https://dummyjson.com/products?limit=${limiteProductosUrl}&skip=${skipProductosUrl}`;
    traerProductos(currentApiUrl);
});
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  console.log(e.target);
  console.log(search.value);
  traerProductos(`https://dummyjson.com/products/search?q=${search.value}`);
})

const traerProductos = (url) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        insertarProductos(res);
      })
      .catch(function (error) {
        productosDiv.innerHTML = `No se han encontrado los productos.`;
      });
}

const insertarProductos = (productos) => {
    productosDiv.innerHTML = ``;

    productos.data.products.forEach(element => {

        const cardProducto = document.createElement("div");
        
        cardProducto.innerHTML = `
        <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="${element.images[0]}" class="card-img-top" alt="..." height="250px">
              <div class="card-body">
                <h5 class="card-title h4">${element.title}</h5>
                <p class="card-text"><small>${element.category}</small></p>
                <p class="card-text">${element.description}.</p>
                <p class="card-text h6">$${element.price}</p>
                <a href="#" class="btn btn-primary">Ver</a>
              </div>
            </div>
        </div>
        `;
        productosDiv.append(cardProducto);
    });
}

traerProductos(currentApiUrl);