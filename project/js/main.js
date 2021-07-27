'use strict';

class ProductItem {

     constructor(product) {
         this.id = product.id;
         this.img = product.img;
         this.title = product.title;
         this.currency = product.currency;
         this.price = product.price;
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
                            <div class="product-item__price"><span class="price--discount">${this.currency}${this.price}</span></div>
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

        this._fetchGoods();
        this._render();
        this._calculateCatalogPrice();
    }

    _fetchGoods() {

        this._goods = [
            {id: 1, img:'img/product/product-m-01-thumb.jpg', title: 'Notebook', price: 1000, currency: '$'},
            {id: 2, img:'img/product/product-m-02-thumb.jpg', title: 'Mouse', price: 100, currency: '$'},
            {id: 3, img:'img/product/product-m-03-thumb.jpg', title: 'Keyboard', price: 250, currency: '$'},
            {id: 4, img:'img/product/product-m-04-thumb.jpg', title: 'Gamepad', price: 150, currency: '$'},
        ];
    }

    /* the total price of all goods */
    _calculateCatalogPrice() {

        let totalCatalogPrice = 0;

        this._goods.forEach (good => {
            totalCatalogPrice += good.price;
        });

        alert (totalCatalogPrice);
    }

    _render() {

        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            this._allProducts.push(productObject);

            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
}


/*
Наследник от ProductItem.
Добавлятся количество положенного в карзину товара
Подсчитывается сумма положенного в карзину товара
*/
class CartProductItem extends ProductItem {


    constructor(product, quantity, totalProductPrice) {
        super(product);
        /*quantity = ;
        totalProductPrice = ;*/
    }


    /* Вывод в HTML
    getHTMLString() {
        return `
            <div class="cart-item">
                xxxx
            </div>
        `;
    }
    */
}


class CartProductList {

    constructor() {

    }

    /*
    Производит перерасчет суммы положенного в карзину товара
    при изменении его количества
    */
    updateProductTotalPrice () {

    }

}

class Cart {

    constructor () {

    }
    /* Производит добавление товара в карзину */
    addCartItem() {

    }
    /* Подсчитывает сумму всех Тввров лежащих в корзине*/
    totalCartPrice() {

    }
    /* Производит перерасчет всех Тввров лежащих в корзине
    при изменении его количества*/
    updateCartPrice () {

    }
}

const list = new ProductList();
