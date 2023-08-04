const url = "https://fakestoreapi.com/products";
const productsSelector = document.querySelector("#products");
const searchInputEle = document.querySelector("#searchBar");

(async () => {
  const fetchProducts = async () => {
    try {
      const products = await fetch(url);

      return await products.json();
    } catch (error) {
      return error;
    }
  };
  const products=await fetchProducts();

  const generetaProduct = (product) => {
    return ` <div class="productCardContainer">

  <div class="imageContainer">
    <img src="${product.image}" alt="" >
  </div>
  <div class="contentContainer">
    <h1 class="primary-heading" id="mainHeading" >${product.title}</h1>
    <p id="decriptionParagraph" class="primary-para">${product.description.split(" ").slice(0,25).join(" ")}</p>

    <button id="priceButton" class="primary-Button" >${product.price} $</button>


  </div>

</div>`;
  };

  const randerProductOnScreen = (products) => {
    productsSelector.innerHTML="";

    products.forEach((product) => {
      productsSelector.innerHTML += generetaProduct(product);
    });
  };

  randerProductOnScreen(products);

  const searchFilterTextFunction =(text,searchText)=>{
    return text.toString().toLowerCase().includes(searchText);
  }


  const filterProducts = (event)=>{
    // by this event.target.value we will search like a keyword means when we write he of hello it will automticaly searched bcz we target each entered character

    const searchInputEleValue=event.target.value.toLowerCase();

    const filteredProducts=products.filter((product)=>{

      return (searchFilterTextFunction(product.title,searchInputEleValue)||searchFilterTextFunction(product.description,searchInputEleValue)||
      searchFilterTextFunction(product.price,searchInputEleValue)

      )

    });
    randerProductOnScreen(filteredProducts);
  }

  searchInputEle.addEventListener('keyup',filterProducts);











})();
