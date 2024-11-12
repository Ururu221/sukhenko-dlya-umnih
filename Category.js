let id = 0;

class Category {
    constructor(value) {
        this.id = ++id;
        this.value = value;
    }
}

export default Category;