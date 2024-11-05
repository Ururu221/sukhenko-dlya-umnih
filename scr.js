//1
let product = {
    sku: 0,
    name: "",
    price: 0,
    categories: [],
    weight: 0,
    quantity: 0,
    size: {
        width: 0,
        height: 0,
        length: 0
    }
}

let shopsItems = [];


let shop = {
    products: [],
    categories: [],
}


//2
function add_categ(sh, new_categ) {
    if (sh.categories.includes(new_categ)) {
        console.log("неможливо додати категорію з існуючою назвою");
        return sh;
    }
    sh.categories.push(new_categ);
    return sh;
}

shop = add_categ(shop, "еда");
shop = add_categ(shop, "еда");
shop = add_categ(shop, "химия");
shop = add_categ(shop, "сік");
document.write("1 task: ", JSON.stringify(shop)); 

// atb = add_categ(shop, "еда");
// atb = add_categ(shop, "еда");
// atb = add_categ(shop, "химия");
// atb = add_categ(shop, "сок");
//console.log(atb); 

//3
function update_categ(sh, new_categ, old_categ) {
    console.log(sh);
    let index = sh.categories.indexOf(old_categ);
    if (index !== -1) {
        sh.categories[index] = new_categ;
        for (let i = 0; i < sh.products.length; i++){
            let c = sh.products[i].categories.indexOf(old_categ);
            if (c !== -1) {
                sh.products[i].categories[c] = new_categ;
            }
        }
    }
    return sh;
}

shop.products.push(
    {
        sku: 0,
        name: "спрайт",
        price: 100,
        categories: ["сік", "газований"],
        weight: 500,
        quantity: 2121,
    }
)

shop = update_categ(shop, "new juice", "сік")
console.log("3 task update: ", shop.categories); 
console.log("sptite as product: ", shop.products[0]);

function delete_categ(sh, old_categ) {
    for (let i = 0; i < sh.products.length; i++) {
        let product = sh.products[i];
        let index1 = product.categories.indexOf(old_categ);

        if (index1 !== -1) {
            if (product.categories.length === 1) {
                console.log("помилка! не може існувати товарів без хоча б 1 категорії");
                return sh;
            }
            product.categories.splice(index1, 1);
        }
    }
    let index = sh.categories.indexOf(old_categ);
    if (index !== -1) {
        sh.categories.splice(index, 1);
    }
    return sh;
}

shop = delete_categ(shop, "new juice");
console.log(shop.categories); 

//4
let general_sku = 1;

function new_item(name, price, categories, weight, quantity, width, height, length) {
    if (typeof name !== 'string' || typeof price !== 'number' || !Array.isArray(categories) ||
        typeof weight !== 'number' || typeof quantity !== 'number' ||
        typeof width !== 'number' || typeof height !== 'number' || typeof length !== 'number') {
        console.log("не вдалось добавити товар. Некоректний тип даних.");
        return null;
    }

    for (let category of categories) {
        if (!shop.categories.includes(category)) {
            console.log(`Категорія ${category} не існує в магазині.`);
            return null;
        }
    }

    let item = {
        sku: general_sku++,
        name,
        price,
        categories,
        weight,
        quantity,
        size: { width, height, length }
    };

    shop.products.push(item);
    return item;
}


let caca = ["Beverages", "Soda"];
let soda = new_item("coca-cola", 10, caca, 200, 50000, 5, 10, 5);
let sprite = new_item("sprite", 110, caca, 250, 570000, 5, 10, 5);
console.log(soda);
console.log(sprite);

//5
function findBySku(sku) {
    for (let product of shop.products) {
        if (product.sku === sku) {
            return product;
        }
    }
    return null;
}


let qwe = findBySku(shopsItems, 1);
console.log(qwe);

//6
function deleteBySku(sku) {
    for (let i = 0; i < shop.products.length; i++) {
        if (shop.products[i].sku === sku) {
            shop.products.splice(i, 1);
            return; 
        }
    }
    console.log("Товар не знайдено");
}

console.log(shopsItems);
deleteBySku(shopsItems, 2);
console.log(shopsItems);

//7
function updateBySku(sku, updatedProperties) {
    let product = findBySku(sku);
    if (!product) {
        console.log("Товар не знайдено");
        return;
    }

    for (let key in updatedProperties) {
        if (key !== 'sku' && product.hasOwnProperty(key)) {  
            if (typeof product[key] === typeof updatedProperties[key]) {
                if (key === 'categories') {
                    // Перевірка на існуючі категорії
                    for (let category of updatedProperties[key]) {
                        if (!shop.categories.includes(category)) {
                            console.log(`Категорія ${category} не існує в магазині.`);
                            return;
                        }
                    }
                }
                product[key] = updatedProperties[key];
            } else {
                console.log(`Неправильний тип даних для властивості ${key}`);
            }
        }
    }
}

updateBySku(1, { name: "mojito", price: 123, categories: ["Beverages"], weight: 200 });
console.log(shop.products[0]);
