// const categories = [
//   {
//     id: 1,
//     title: "new 1",
//     description: "hi 1",
//     createdAt: "2021-10-31T15:03:23.556z",
//   },
//   {
//     id: 2,
//     title: "new 2",
//     description: "hi 2",
//     createdAt: "2021-10-31T15:02:00.411z",
//   },
// ];

export default class Storage {
  static getAllCategories() {
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });

    return sortedCategories;
  }

  static saveCategory(categoryToSave) {
    const savedCategories = this.getAllCategories();
    const existCategory = savedCategories.find(
      (category) => category.id == categoryToSave.id
    );
    if (existCategory) {
      existCategory.title = categoryToSave.title;
      existCategory.description = categoryToSave.description;
      existCategory.createdAt = new Date().toISOString();
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("categories", JSON.stringify(savedCategories));

  }

  static getAllProducts() {
    const savedproducts = JSON.parse(localStorage.getItem("products")) || [];
    const sortedProducts = savedproducts.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedProducts;
  }

  static saveProduct(productToSave) {
    const savedProducts = this.getAllProducts();
    const existProduct = savedProducts.find(
      (product) => product.id == productToSave.id
    );

    if (existProduct) {
      existProduct.title = productToSave.title;
      existProduct.quantity = productToSave.quantity;
      existProduct.category = productToSave.category;
      existProduct.createdAt = new Date().toISOString();
    } else {
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
}

