import Shop from './Shop.js';

const shop = new Shop();


console.log("=== Adding Categories ===");
shop.add_categ("еда");
shop.add_categ("газований");
shop.add_categ("напій");
console.log("Current categories:", shop.categories.map(x => x.value));


console.log("\n=== Adding Products ===");
const sprite = shop.add_product("спрайт", 100, ["напій", "газований"], 500, 2121, 10, 20, 30);
if (sprite) console.log("Added product:", sprite);
const coke = shop.add_product("кока-кола", 120, ["напій", "газований"], 450, 1000, 8, 16, 20);
if (coke) console.log("Added product:", coke);


console.log("\n=== Updating a Category ===");
shop.update_categ("напій", "новий сік");
console.log("Categories after update:", shop.categories.map(x => x.value));
console.log("Products after category update:", shop.products);


console.log("\n=== Deleting a Category ===");
shop.delete_categ("новий сік");
console.log("Categories after attempting to delete 'новий сік':", shop.categories.map(x => x.value));


console.log("\n=== Used Categories ===");
console.log("Used categories:", shop.usedCategories);


console.log("\n=== Deleting a Product by SKU ===");
shop.delete_by_sku(1); 
console.log("Products after deletion by SKU:", shop.products);


console.log("\n=== Finding a Product by SKU ===");
const foundProduct = shop.find_by_sku(2);
console.log("Product with SKU 2:", foundProduct);
