import Storage from "./Storage.js";

const addCategory = document.querySelector(".add-category");
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const category = document.getElementById("category");
const deleteCategory = document.querySelector(".delete-category");
const toggleAddNewCategoryBtn = document.querySelector(
  "#toggle-add-new-categoryBtn"
);
class Category {
  constructor() {
    this.refreshSelectCategory();

    //show category section
    toggleAddNewCategoryBtn.addEventListener("click", (e) => {
      // e.target.nextElementSibling.toggle("block");
      e.target.nextElementSibling.classList.toggle("hidden");
    });
    //add Category
    addCategory.addEventListener("click", (e) => {
      e.preventDefault();
      const categories = Storage.getAllCategories();
      // console.log(categories);
      const existCategoryTitle = categories.find(
        (category) => category.title == categoryTitle.value.toLowerCase()
      );
      console.log(existCategoryTitle);
      // console.log(categoryTitle.value);

      let existId = null;
      if (existCategoryTitle) {
        existId = existCategoryTitle.id;
        // console.log(existId);

        const newCategory = {
          id: existId,
          title: categoryTitle.value.toLowerCase(),
          description: categoryDescription.value,
        };
        Storage.saveCategory(newCategory);
        // console.log(Storage.getAllCategories());
      } else {
        if (categoryTitle.value != "") {
          const newCategory = {
            title: categoryTitle.value.toLowerCase(),
            description: categoryDescription.value,
          };
          Storage.saveCategory(newCategory);
          const option = document.createElement("option");
          option.classList.add("bg-gray-700", "text-gray-200");
          option.value = new Date().getTime();
          option.innerText = categoryTitle.value;
          category.appendChild(option);
          // console.log(Storage.getAllCategories());
        }
      }
      categoryTitle.value = "";
      categoryDescription.value = "";
    });

    //delete Category
    deleteCategory.addEventListener("click", (e) => {
      const categories = Storage.getAllCategories();
      const newCategories = categories.filter(
        (category) => category.title != categoryTitle.value.toLowerCase()
      );
      console.log("ppppp");
      localStorage.setItem("categories", JSON.stringify(newCategories));

      //delete from ProductList

      const products = Storage.getAllProducts();
      const newProducts = products.filter(
        (product) => product.category != categoryTitle.value.toLowerCase()
      );
      localStorage.setItem("products", JSON.stringify(newProducts));
      this.refreshSelectCategory();
      this.refreshProductList;
    });
  }

  refreshSelectCategory() {
    const categories = Storage.getAllCategories();
    const category = document.getElementById("category");

    categories.forEach((oneCategory) => {
      const option = document.createElement("option");
      option.classList.add("bg-gray-700", "text-gray-200");
      option.value = oneCategory.id;
      option.innerText = oneCategory.title;
      category.appendChild(option);
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
}

export default new Category();
