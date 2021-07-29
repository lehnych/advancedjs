'use strict';
const API = 'responses';

let getRequest = (url) => {

    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    console.log('Error!');
                } else {
                    xhr.responseText;
                }
            }
        }
        xhr.send();
    });
}

class ProductItem {

    constructor(product) {
        this.id = product.product_id;
        this.img = product.product_img;
        this.title = product.product_name;
        this.price = product.product_price;
    }

    getHTMLString() {
        return `
                <div id="${this.id}" class="product-item">
                    <div class="product-item__wrapper">
                        <div class="product-item__picture">
                            <a class="btn__add-to-cart" href="#" title="${this.title}"><span class="btn btn__ghost--negative btn--transparent"><i class="icon__cart"></i>Add to Cart</span></a>
                            <picture><img class="img--fluid" src="${this.img}" alt="${this.title}"/></picture>
                        </div>
                        <div class="product-item__body">
                            <div class="product-item__decription">
                                <h4><a href="xxxx" title="${this.title}">${this.title}</a></h4>
                            </div>
                            <div class="product-item__price"><span class="price--discount">$${this.price}</span></div>
                        </div>
                    </div>
                  </div>
                `;
    }
}

class ProductList {

    constructor(container = '.product-grid__wrapper') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._allProducts = [];

        this._getProducts().then((data) => {
            this._goods = data;
            this._render();
        });
    }

    sum() {
        return this._goods.reduce(function (sum, good) {
            return sum + good.price;
        }, 0);
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {

        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            this._allProducts.push(productObject);

            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    /* Производит добавление товара в карзину */
    addCartItem() {

    }
}

/*
Наследник от ProductItem.
Добавлятся количество положенного в карзину товара
Подсчитывается сумма положенного в карзину товара
*/
class CartProductItem {

    constructor(product) {
        this.id = product.product_id;
        this.img = product.product_img;
        this.title = product.product_name;
        this.price = product.product_price;
        this.product_quantity = product.product_quantity;
    }

    getHTMLString() {
        return `
            <div id="${this.id}"  class="cart-bar__cart-item">
                <div class="cart-bar__cart-item__img">
                    <img src="${this.img}" alt="${this.title}" class="img--fluid">
                </div>
                
                <div class="cart-bar__cart-item__infos">
                    <h5 class="cart-bar__cart-item__title">${this.title}</h5>
                    <div>Price: <span class="cart-bar__cart-item__single-price">$${this.price}</span></div>
                    <div>Quantity: <input type="number" value="${this.product_quantity}" class="cart-bar__cart-item__quantity-input"></div>
                </div>
                
                <div class="cart-bar__cart-item__delete">
                    <i class="icon__times"></i>
                </div>
                
                <div class="cart-bar__cart-item__price">$${this.price}</div>
            </div>
            `;
    }
}

class Cart {

    constructor(container = '.cart-bar__cart-items') {
        let cartProductRemoveButton = document.querySelector('.cart-bar__cart-item__delete > *');
        console.log(cartProductRemoveButton);

        this.container = document.querySelector(container);
        this._goods = [];
        this._allProducts = [];

        this._getCartProducts().then((data) => {
            this._goods = data;
            this._render();
            //cartProductRemoveButton.addEventListener('click', this.removeCartItem);
        });
    }

    _getCartProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {

        for (const product of this._goods.contents) {
            const productObject = new CartProductItem(product);
            this._allProducts.push(productObject);

            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    /* Производит удаление товара из карзины */



    removeCartItem(event) {
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
    }



    sum() {
        return this._goods.reduce(function (sum, good) {
            return sum + good.price;
        }, 0);
    }

    totalCartPrice() {

    }
    /* Производит перерасчет всех Тввров лежащих в корзине
    при изменении его количества*/
    updateCartPrice () {

    }
}




new ProductList();
new Cart();
