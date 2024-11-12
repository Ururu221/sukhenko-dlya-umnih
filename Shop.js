import Category from './Category.js';
import Product from './Product.js';

class Shop {
    constructor() {
        this.products = [];
        this.categories = [];
    }

    add_categ(value) {
        if (this.categories.some(cat => cat.value === value)) {
            console.log("неможливо додати категорію з існуючою назвою");
            return null;
        }
        const newCategory = new Category(value);
        this.categories.push(newCategory);
        return newCategory;
    }

    update_categ(oldValue, newValue) {
        const category = this.categories.find(cat => cat.value === oldValue);
        if (category) {
            category.value = newValue;
            this.products.forEach(product => {
                const index = product.categories.indexOf(oldValue);
                if (index !== -1) {
                    product.categories[index] = newValue;
                }
            });
        }
    }

    delete_categ(value) {
        const isCategoryUsed = this.products.some(prod => prod.categories.includes(value));
        if (isCategoryUsed) {
            console.log("Категорію використовують продукти. Видалення заборонено.");
            return;
        }
        this.categories = this.categories.filter(cat => cat.value !== value);
    }

    add_product(name, price, categories, weight, quantity, width, height, length) {
        let validCategories = true;

        for (let category of categories) {
            let categoryExists = false;

            for (let existingCategory of this.categories) {
                if (existingCategory.value === category) {
                    categoryExists = true;
                    break; 
                }
            }

            if (!categoryExists) {
                validCategories = false;
                break; 
            }
        }

        if (!validCategories) {
            console.log("Категорія не існує в магазині.");
            return null;
        }
        const sku = this.products.length + 1;
        const newProduct = new Product(sku, name, price, categories, weight, quantity, width, height, length);
        this.products.push(newProduct);
        return newProduct;
    }

    find_by_sku(sku) {
        return this.products.find(prod => prod.sku === sku);
    }

    delete_by_sku(sku) {
        this.products = this.products.filter(prod => prod.sku !== sku);
    }

    get usedCategories() {
        const categories = new Set();
        this.products.forEach(prod => prod.categories.forEach(cat => categories.add(cat)));
        return Array.from(categories);
    }
}

export default Shop;
