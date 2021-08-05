const API = 'responses';

// Переведено на промисы
// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };

/**
 * Описываем базовые классы
 */
class List {
    constructor(url, container, list = listContext) {
        this.container = container;
        this.list = list; // словарь для классов строка 213
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }

    /**
     * получение данных с сервера
     * @param url
     * @returns {Promise<any | never>}
     */
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    /**
     * обработка полученных данных
     * @param data
     */
    handleData(data) {
        this.goods = data;
        this.render();
    }

    /**
     * подсчет стоимости всех товаров
     * @returns {*|number}
     */
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.product_price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            console.log(this.constructor.name);
            const productObj = new this.list[this.constructor.name](product);

            // альтернативаня реализация без словаря
            // let productObj = null;
            // if (this.constructor.name === 'ProductsList') productObj = new ProductItem(product);
            // if (this.constructor.name === 'Cart') productObj = new CartItem(product);
            // if (!productObj) return;

            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

    _init() {
        return false
    }
}


class Item {

    constructor(el) {
        this.product_id = el.product_id;
        this.product_img = el.product_img;
        this.product_name = el.product_name;
        this.product_price = el.product_price;
    }

    render() {
        return ``;
    }
}

/**
 * Наследуемся от базовых классов
 */
class ProductsList extends List {

    constructor(cart, container = '.product-grid__wrapper', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('btn--buy')){
                this.cart.addProduct(e.target);
            }
        });
    }
}

class ProductItem extends Item {

    render() {
        return `
            <div data-id="${this.product_id}" class="product-item">
                <div class="product-item__wrapper">
                    <div class="product-item__picture">
                        <a href="#" title="${this.product_name}" class="btn__add-to-cart"><span data-id="${this.product_id}" data-name="${this.product_name}" data-price="${this.product_price}" data-img="${this.product_img}" class="btn btn__ghost--negative btn--transparent btn--buy"><i class="icon__cart"></i>Add to Cart</span></a>
                        <picture><img class="img--fluid" src="${this.product_img}" alt="${this.product_name}"/></picture>
                    </div>
                    <div class="product-item__body">
                        <div class="product-item__decription">
                            <h4><a href="xxxx" title="${this.product_name}">${this.product_name}</a></h4>
                        </div>
                        <div class="product-item__price"><span class="price--discount">$${this.product_price}</span></div>
                    </div>
                </div>
            </div>
        `;
    }
}

class Cart extends List {

    constructor(container = ".cart-bar__cart-items", url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }

    /**
     * добавление товара
     * @param element
     */
    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.product_id === productId);
                    if(find) {
                        find.quantity++;
                        this._updateCartItem(find);
                    } else {
                        let product = {
                            product_id: productId,
                            product_img: element.dataset['img'],
                            product_name: element.dataset['name'],
                            product_price: +element.dataset['price'],
                            product_quantity: 1
                        };
                        // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
                        // При добавлении нового товара, нас интересует только он один.
                        this.goods = [product];
                        // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * добавление товара
     * @param element
     */
    increaseCartItem(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.product_id === productId);
                    if(find){ // если товара > 1, то уменьшаем количество на 1
                        find.quantity++;
                        this._updateCartItem(find);
                    }
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * удаление товара
     * @param element
     */
    decreaseCartItem(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.product_id === productId);
                    if(find.quantity > 1){ // если товара > 1, то уменьшаем количество на 1
                        find.quantity--;
                        this._updateCartItem(find);
                    }
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * удаление товара
     * @param element
     */
    removeCartItem(element) {

        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.product_id === productId);

                    this.allProducts.splice(this.allProducts.indexOf(find), 1);
                    document.querySelector(`.cart-bar__cart-item[data-id="${productId}"]`).remove();
                    this._updateCartItem(find);
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * обновляем данные корзины
     * @param product
     * @private
     */
    _updateCartItem(product) {
        let block = document.querySelector(`.cart-bar__cart-item[data-id="${product.product_id}"]`);
        block.querySelector('.cart-bar__cart-item__quantity-input').textContent = `${product.quantity}`;
        block.querySelector('.cart-bar__cart-item__price').textContent = `$${product.quantity * product.product_price}`;
    }

    _init() {

        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('btn--add-cart-item')){
                this.increaseCartItem(e.target);
            }
        });

        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('btn--delete-cart-item')){
                this.decreaseCartItem(e.target);
            }
        });

        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('btn--remove-cart-item')){
                this.removeCartItem(e.target);
            }
        });
    }
}

class CartItem extends Item {

    constructor(el){
        super(el);
        this.quantity = el.product_quantity;
    }

    render(){
        return `
                <div data-id="${this.product_id}"  class="cart-bar__cart-item">
                    <div class="cart-bar__cart-item__img">
                        <img src="${this.product_img}" alt="${this.product_name}" class="img--fluid">
                    </div>
                    
                    <div class="cart-bar__cart-item__infos">
                        <h5 class="cart-bar__cart-item__title">${this.product_name}</h5>
                        <div>Price: <span class="cart-bar__cart-item__single-price">$${this.product_price}</span></div>
                        <div class="cart-bar__cart-item__quantity">Quantity:
                            <i data-id="${this.product_id}" class="icon__minus btn--delete-cart-item"></i>
                            <span class="cart-bar__cart-item__quantity-input">${this.quantity}</span>
                            <i data-id="${this.product_id}" class="icon__plus btn--add-cart-item"></i>
                        </div>
                    </div>
                    
                    <div class="cart-bar__cart-item__delete">
                        <i data-id="${this.product_id}" class="icon__times btn--remove-cart-item"></i>
                    </div>
                    
                    <div class="cart-bar__cart-item__price">$${this.quantity*this.product_price}</div>
                </div>
            `;
    }
}

const listContext = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);




