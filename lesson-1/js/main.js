'use strict';
const products = [
    {id: 1, title: 'Notebook', price: 1000},
    {id: 2, title: 'Mouse', price: 100},
    {id: 3, title: 'Keyboard', price: 250},
    {id: 4, title: 'Gamepad', price: 150},
];

const renderProduct = (title, price) => {
    return `<div class="product-item">
                <div class="product-item__wrapper">
                    <div class="product-item__picture">
                        <picture><img class="img--fluid" src="xxxxx" alt="${title}"/></picture>
                    </div>
                    <div class="product-item__body">
                        <div class="product-item__decription">
                            <h4><a href="xxxx" title="${title}">${title}</a></h4>
                        </div>
                        <div class="product-item__price"><span class="price--discount">${price}</span></div>
                        <button class="btn btn__primary by-btn">Добавить</button>
                    </div>
                </div>
              </div>`;
}


const renderProducts = (list) => {
    const productList = list.map((item) => {
        return renderProduct(item.title, item.price);
    }).join('');




    //console.log(productList);
    document.querySelector('.product-grid__wrapper').innerHTML = productList;
}

renderProducts(products);
