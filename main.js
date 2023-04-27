const productosDiv = document.getElementById("productosDiv")
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const search = document.getElementById("search");
const form = document.getElementById("formulario");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const categoriasSelect = document.getElementById("categorias");

const categorias = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
];

const selectCategorias = document.getElementById("categorias");
let contador = 1;

for (let i = 0; i < categorias.length; i++) {
  const opcion = document.createElement("option");
  opcion.value = categorias[i];
  opcion.text =
    categorias[i].charAt(0).toUpperCase() +
    categorias[i].slice(1).replace("-", " ");
  selectCategorias.appendChild(opcion);
}

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
  if(search.value.trim() == "" ) return;
  console.log("seas")
  traerProductos(`https://dummyjson.com/products/search?q=${search.value}&limit=12&skip=0`);
})

categoriasSelect.addEventListener("change", () => {
  traerProductos(`https://dummyjson.com/products/category/${categoriasSelect.value}`);
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
        element.category = element.category.charAt(0).toUpperCase() + element.category.slice(1);
        
        cardProducto.innerHTML = `
        <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="${element.thumbnail}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title h4">${element.title}</h5>
                <p class="card-text"><small>${element.category}</small></p>
                <p class="card-text text-truncate">${element.description}.</p>
                <p class="card-text h6">$${element.price}</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${element.id}">
                  See
                </button>
              </div>
            </div>
        </div>
        `;
        productosDiv.append(cardProducto);
    });
}

productosDiv.addEventListener('click', e => {
  if(e.target.id.trim() == "" || e.target.id == "productosDiv") return;
  axios
      .get(`https://dummyjson.com/products/${e.target.id}`)
      .then((res) => {
        res.data.category = res.data.category.charAt(0).toUpperCase() + res.data.category.slice(1);
        modalTitle.innerHTML = `${res.data.title}`
        modalBody.innerHTML = `<p><em>${res.data.category}</em></p>
        <p>${res.data.description}</p>
        <p><strong>$${res.data.price}</strong></p>`
      })
})

traerProductos(currentApiUrl);