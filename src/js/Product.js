import Storage from "./Storage.js";
class Product {
  constructor() {
    const productTitle = document.getElementById("product-title");
    const quantityProduct = document.getElementById("quantity");
    const Category = document.getElementById("category");
    const addNewProduct = document.querySelector(".add-new-product");
    const searchInput = document.getElementById("search");
    const sortProductList = document.getElementById("sort");
    this.refreshProductList();
    this.deleteProductFromUi();

    addNewProduct.addEventListener("click", (e) => {
      // console.log(productTitle.value);
      // console.log(Category.options[Category.selectedIndex].text);
      const products = Storage.getAllProducts();
      const existProductTitle = products.find(
        (product) => product.title == productTitle.value.toLowerCase()
      );
      // console.log(existProductTitle);

      if (existProductTitle) {
        const newProduct = {
          id: existProductTitle.id,
          title: productTitle.value.toLowerCase(),
          quantity: quantityProduct.value,
          category: Category.options[Category.selectedIndex].text,
        };
        if (
          Category.options[Category.selectedIndex].text == "Select" ||
          productTitle.value == "" ||
          quantityProduct.value == ""
        ) {
          console.log(productTitle.value);
          addNewProduct.nextElementSibling.textContent =
            "fill all section please";
        } else {
          Storage.saveProduct(newProduct);
          addNewProduct.nextElementSibling.textContent = "";
          Storage.saveProduct(newProduct);
          productTitle.value = "";
          quantityProduct.value = "";
          Category.selectedIndex = 0;
        }
      } else {
        if (productTitle != "") {
          if (
            Category.options[Category.selectedIndex].text == "Select" ||
            productTitle.value == "" ||
            quantityProduct.value == ""
          ) {
            console.log(productTitle.value);
            addNewProduct.nextElementSibling.textContent =
              "fill all section please";
          } else {
            const newProduct = {
              title: productTitle.value.toLowerCase(),
              quantity: quantityProduct.value,
              category: Category.options[Category.selectedIndex].text,
            };
            addNewProduct.nextElementSibling.textContent = "";
            Storage.saveProduct(newProduct);
            productTitle.value = "";
            quantityProduct.value = "";
            Category.selectedIndex = 0;
          }
        }
      }

      this.refreshProductList();
      this.deleteProductFromUi();
    });
    searchInput.addEventListener("input", (e) => {
      const productList = document.querySelector(".productList");
      let productListContains = "";
      // console.log(e.target.value);
      const products = Storage.getAllProducts();
      const existProducts = products.filter((product) =>
        product.title.includes(e.target.value.trim().toLowerCase())
      );
      console.log(existProducts);
      existProducts.forEach((product) => {
        productListContains += `<div class="productListChild flex flex-row justify-between items-center  mb-3">
          <h4 class="text-gray-400 w-32">${product.title}</h4>
          <p class="text-gray-200">${new Date(
            product.createdAt
          ).toLocaleDateString()}</p>
          <p
            class="text-gray-400 border border-gray-400 w-32 overflow-x-auto scrollbar-thin flex flex-row justify-center items-center rounded-full px-5 py-1  "
          >
          ${product.category.substr(0, 12)}
            
          <p
            class="text-gray-200 bg-gray-500 border border-gray-200 h-6 w-6 flex flex-row justify-center items-center rounded-full"
          >
            ${product.quantity}
          </p>
          <button
            class="btn-delete text-red-600 outline-none border border-red-600 bg-transparent rounded-full px-4 py hover:bg-red-600 hover:text-gray-200"
          >
            delete
          </button>
        
      </div>`;
      });
      productList.innerHTML = productListContains;
      // console.log(existProducts);

      this.deleteProductFromUi();
    });
    sortProductList.addEventListener("change", (e) => {
      console.log(e.target.value);
      const products = Storage.getAllProducts();
      let sortProducts = [];

      if (e.target.value == "old") {
        sortProducts = products.reverse();
        console.log(sortProducts);
      } else {
        sortProducts = products;
      }
      const productList = document.querySelector(".productList");
      let productListContains = "";
      sortProducts.forEach((product) => {
        productListContains += `<div class="productListChild flex flex-row justify-between items-center  mb-3">
        <h4 class="text-gray-400 w-32">${product.title}</h4>
        <p class="text-gray-200">${new Date(
          product.createdAt
        ).toLocaleDateString()}</p>
        <p
          class="text-gray-400 border border-gray-400 w-32 overflow-x-auto scrollbar-thin flex flex-row justify-center items-center rounded-full px-5 py-1  "
        >
        ${product.category.substr(0, 12)}
          
        <p
          class="text-gray-200 bg-gray-500 border border-gray-200 h-6 w-6 flex flex-row justify-center items-center rounded-full"
        >
          ${product.quantity}
        </p>
        <button
          class="btn-delete text-red-600 outline-none border border-red-600 bg-transparent rounded-full px-4 py hover:bg-red-600 hover:text-gray-200"
        >
          delete
        </button>
      
    </div>`;
      });
      productList.innerHTML = productListContains;
    });
  }

  refreshProductList() {
    const products = Storage.getAllProducts();
    const productList = document.querySelector(".productList");
    let productListContains = "";
    products.forEach((product) => {
      productListContains += `<div class="productListChild flex flex-row justify-between items-center  mb-3">
        <h4 class="text-gray-400 w-32">${product.title}</h4>
        <p class="text-gray-200">${new Date(
          product.createdAt
        ).toLocaleDateString()}</p>
        <p
          class="text-gray-400 border border-gray-400 w-32 overflow-x-auto scrollbar-thin flex flex-row justify-center items-center rounded-full px-5 py-1  "
        >
        ${product.category.substr(0, 12)}
          
        <p
          class="text-gray-200 bg-gray-500 border border-gray-200 h-6 w-6 flex flex-row justify-center items-center rounded-full"
        >
          ${product.quantity}
        </p>
        <button
          class="btn-delete text-red-600 outline-none border border-red-600 bg-transparent rounded-full px-4 py hover:bg-red-600 hover:text-gray-200"
        >
          delete
        </button>
      
    </div>`;
    });
    productList.innerHTML = productListContains;
  }

  deleteProductFromUi() {
    const btnDeletes = document.querySelectorAll(".btn-delete");
    btnDeletes.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target.parentElement);
        e.target.parentElement.remove();
        this.removeProductFromStorage(
          btn.parentElement.firstElementChild.innerText
        );
      });
    });
  }
  removeProductFromStorage(titleProduct) {
    const products = Storage.getAllProducts();
    const product = products.find((p) => p.title == titleProduct);
    const newProducts = products.filter((p) => p.id !== product.id);
    localStorage.setItem("products", JSON.stringify(newProducts));
  }
}

export default new Product();
