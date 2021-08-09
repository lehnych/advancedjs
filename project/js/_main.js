const API = 'responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        cartUrl: '/getBasket.json',
        catalogUrl: '/catalogData.json',
        products: [],
        cartItems: [],
        filtered: []
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.product_id === product.product_id);
                        if (find) {
                            find.product_quantity++;
                        } else {
                            let prod = Object.assign({product_quantity: 1}, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },

        increaseCartItem(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        let find = this.cartItems.find(el => el.product_id === product.product_id);
                        if(find){
                            find.product_quantity++;
                        }
                    } else {
                        alert('Error');
                    }
                })
        },

        decreaseCartItem(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        let find = this.cartItems.find(el => el.product_id === product.product_id);
                        if(find.product_quantity > 1) {
                            find.product_quantity--;
                        }
                    } else {
                        alert('Error');
                    }
                })
        },

        removeCartItem(item) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },

        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    created(){

    },
    beforeDestroy() {

    },
    beforeUpdate() {

    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    }
});
