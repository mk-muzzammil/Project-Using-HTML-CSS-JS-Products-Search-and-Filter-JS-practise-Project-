const url = "https://fakestoreapi.com/products";

// =============== HTML Selected Elemnets to perform operation using javascript=========== 
const productsSelector = document.querySelector("#products");
const searchInputEle = document.querySelector("#searchBar");


// ===============Async function to fetch Json data from the Api===================
(async () => {
  const fetchProducts = async () => {
    // ===============necessary to enclose in try catch because sometimes there will be some issue in fetching so error must be catched=====================

    try {

      // ==================await is used because it require some time to fetch data from Api  =================
      const products = await fetch(url);

      return await products.json();
    } catch (error) {
      return error;
    }
  };
  // ==================Fetching products into  product variable for later use ============
  const products=await fetchProducts();


  // ===============Generate product Card All cards can be generated here depending on the elements we are fetching from Api================= 
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

  // =====================Showing product cards on screen =================
  const randerProductOnScreen = (products) => {
    productsSelector.innerHTML="";

    // =================showing all products on screen fetched from Api in a responsive card=======================
    products.forEach((product) => {
      productsSelector.innerHTML += generetaProduct(product);
    });
  };

  randerProductOnScreen(products);

  // ======================Filtering process according to user input ================
  const searchFilterTextFunction =(text,searchText)=>{
    return text.toString().toLowerCase().includes(searchText);
  }


  const filterProducts = (event)=>{
    // by this event.target.value we will search like a keyword means when we write he of hello it will automticaly searched bcz we target each entered character

    
    const searchInputEleValue=event.target.value.toLowerCase();

    //===================These are the filtered products to be shown acc to search ======= 
    const filteredProducts=products.filter((product)=>{

      return (searchFilterTextFunction(product.title,searchInputEleValue)||searchFilterTextFunction(product.description,searchInputEleValue)||
      searchFilterTextFunction(product.price,searchInputEleValue)

      )

    });

    randerProductOnScreen(filteredProducts);
  }


  searchInputEle.addEventListener('keyup',filterProducts);


// =====================Best of luck Hope so its helpful to you ===================








})();
