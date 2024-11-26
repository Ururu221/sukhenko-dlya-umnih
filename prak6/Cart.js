class Cart {
    constructor() {
        this.products = [];
    }

    // Метод для додавання товару до кошика
    add(product, quantity) {
        if (quantity > product.stockQty) {
            console.log(`Не можна додати більше товарів, ніж є в магазині (${product.stockQty})`);
            return;
        }

        const cartItem = this.products.find(p => p.product.sku === product.sku);

        if (cartItem) {
            if (cartItem.quantity + quantity > product.stockQty) {
                console.log(`Не можна додати більше товарів, ніж є в магазині (${product.stockQty})`);
                return;
            }
            cartItem.quantity += quantity;
        } else {
            this.products.push({ product, quantity });
        }

        product.stockQty -= quantity; // Зменшуємо кількість на складі
    }

    // Метод для видалення товару з кошика
    remove(sku) {
        const index = this.products.findIndex(p => p.product.sku === sku);
        if (index !== -1) {
            const removedItem = this.products.splice(index, 1)[0];
            removedItem.product.stockQty += removedItem.quantity; // Повертаємо на склад
        }
    }

    // Метод для редагування кількості товару в кошику
    editQty(sku, newQuantity) {
        const cartItem = this.products.find(p => p.product.sku === sku);

        if (!cartItem) {
            console.log("Товар не знайдено в кошику.");
            return;
        }

        if (newQuantity > cartItem.product.stockQty + cartItem.quantity) {
            console.log("Неможливо встановити кількість більше, ніж доступно на складі.");
            return;
        }

        if (newQuantity === 0) {
            this.remove(sku);
        } else {
            cartItem.product.stockQty += cartItem.quantity - newQuantity;
            cartItem.quantity = newQuantity;
        }
    }

    // Геттер для розрахунку загальної ціни
    get totalPrice() {
        return this.products.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    }
}

export default Cart;
