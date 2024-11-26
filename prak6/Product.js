class Product {
    constructor(sku, name, price, categories, weight, stockQty, width, height, length) {
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.categories = categories;
        this.weight = weight;
        this.stockQty = stockQty; 
        this.size = { width, height, length };
    }
}

export default Product;
