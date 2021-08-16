Vue.component('cart', {
    data(){
      return {
          cartItems: [],
      }
    },
    computed: {
        cartCount() {
            return this.cartItems.reduce((n, cartItem) => cartItem.product_quantity+ n, 0);
        },
        cartTotal() {
            return this.cartItems.reduce((n, cartItem) => cartItem.product_price * cartItem.product_quantity + n, 0);
        },
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.product_id === product.product_id);
            if(find){
                this.$parent.putJson(`/api/cart/${find.product_id}`, {product_quantity: 1});
                find.quantity++;
            } else {
                let prod = Object.assign({product_quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        increaseCartItem(item) {
            this.$parent.putJson(`/api/cart/${item.product_id}`, {product_quantity: +1})
                .then(data => {
                    if (data.result === 1) {
                        item.product_quantity++;
                    }
                });
        },
        decreaseCartItem(item) {
            if (item.product_quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.product_id}`, {product_quantity: -1})
                    .then(data => {
                        if (data.result === 1) {
                            item.product_quantity--;
                        }
                    });
            }
        },
        removeCartItem(item) {
            this.$parent.deleteJson(`/api/cart/${item.product_id}`)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    }
                });
        },
    },
    mounted(){
        this.$parent.getJson('/api/cart')
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div class="cart-bar__content">
            <div class="cart-bar__cart-items">
                <p v-if="!cartItems.length">The shopping cart is empty</p>
                <cart-item v-for="item of cartItems" :key="item.product_id" :cart-item="item" @increaseCartItem="increaseCartItem" @decreaseCartItem="decreaseCartItem" @removeCartItem="removeCartItem"></cart-item>
            </div>
            <div class="cart-bar__cart-total" v-if="cartItems.length">
                <span class="cart-total__title">Total: </span>
                <span class="cart-total__price"><!--{{cartCount}} / -->{{cartTotal}}$</span>
            </div>
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
                    <i class="icon__minus icon--btn" @click="$emit('decreaseCartItem', cartItem)"></i>
                    <span class="cart-bar__cart-item__quantity-input">{{cartItem.product_quantity}}</span>
                    <i class="icon__plus icon--btn" @click="$emit('increaseCartItem', cartItem)"></i>
                </div>
            </div>
            <div class="cart-bar__cart-item__delete">
                <i class="icon__times icon--btn" @click="$emit('removeCartItem', cartItem)"></i>
            </div>
            <div class="cart-bar__cart-item__price">
                {{cartItem.product_quantity * cartItem.product_price}}$
            </div>
        </div>
    `
});
