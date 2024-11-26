import Shop from './Shop.js';
import Cart from './Cart.js';

const shop = new Shop();
const cart = new Cart();

shop.add_categ("фрукти");
shop.add_categ("молочне");
const apple = shop.add_product("яблуко", 5, ["фрукти"], 0.2, 10, 5, 5, 5);
const egg = shop.add_product("яйце", 2, ["молочне"], 0.05, 12, 3, 3, 3);
const bread = shop.add_product("хліб", 12, ["молочне"], 0.4, 5, 20, 10, 5);

cart.add(apple, 2);
cart.add(egg, 3);
cart.add(bread, 1);

console.log("Загальна вартість:", cart.totalPrice);

cart.editQty(apple.sku, 5); // Редагування кількості яблук
console.log("Загальна вартість після редагування:", cart.totalPrice);

cart.remove(egg.sku); // Видалення яєць
console.log("Загальна вартість після видалення яєць:", cart.totalPrice);
