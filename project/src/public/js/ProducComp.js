const product = {
    props: ['product'],
    template: `
        <div class="product-item">
            <div class="product-item__wrapper">
                <div class="product-item__picture">
                    <a href="#" class="btn__add-to-cart" :title="product.product_name" @click="$root.$refs.cart.addProduct(product)">
                        <span class="btn btn__ghost--negative btn--transparent"><i class="icon__cart"></i>Add to Cart</span>
                    </a>
                    <picture>
                        <img class="img--fluid" :alt="product.product_name" :src="product.product_img">
                    </picture>
                </div>
                <div class="product-item__body">
                    <div class="product-item__decription">
                        <h4><a href="xxxx" :title="product.product_name">{{product.product_name}}</a></h4>
                    </div>
                    <div class="product-item__price">
                        <span class="price--discount">{{product.product_price}}$</span>
                    </div>
                </div>
            </div>
        </div>
    `
};

const products = {
    components: { product },
    data(){
        return {
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                console.log(data)
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="product-grid__wrapper">
            <product v-for="item of filtered" :key="item.product_id" :product="item"></product>
        </div>
    `
};

export default products;
