Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          showCart: false
      }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
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
            this.$parent.getJson(`${API}/addToBasket.json`)
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
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
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
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },

    },
    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
            <div class="cart-bar__cart-items">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item v-for="item of cartItems" :key="item.product_id" :cart-item="item" @decreaseCartItem="decreaseCartItem" @increaseCartItem="increaseCartItem" @removeCartItem="removeCartItem"></cart-item>
            </div>
        `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
        <div class="cart-bar__cart-item">
            <div class="cart-bar__cart-item__img">
                <img class="img--fluid" :alt="cartItem.product_name" :src="cartItem.product_img">
            </div>    
            <div class="cart-bar__cart-item__infos">
                <h5 class="cart-bar__cart-item__title">{{cartItem.product_name}}</h5>
                <div>Price: <span class="cart-bar__cart-item__single-price">{{cartItem.product_price}}$</span></div>
                <div class="cart-bar__cart-item__quantity">Quantity:
                    <i class="icon__minus btn--delete-cart-item" @click="$emit('decreaseCartItem', cartItem)"></i>
                    <span class="cart-bar__cart-item__quantity-input">{{cartItem.product_quantity}}</span>
                    <i class="icon__plus btn--add-cart-item" @click="$emit('increaseCartItem', cartItem)"></i>
                </div>
            </div>
            <div class="cart-bar__cart-item__delete">
                <i class="icon__times btn--remove-cart-item" @click="$emit('removeCartItem', cartItem)"></i>
            </div>
            <div class="cart-bar__cart-item__price">
                {{cartItem.product_quantity * cartItem.product_price}}$
            </div>
        </div>
    `
});
