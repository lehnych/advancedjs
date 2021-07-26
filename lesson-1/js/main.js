'use strict';
const products = [
    {id: 1, img:'img/product/product-m-01-thumb.jpg', title: 'Notebook', price: 1000, currency: '$'},
    {id: 2, img:'img/product/product-m-02-thumb.jpg', title: 'Mouse', price: 100, currency: '$'},
    {id: 3, img:'img/product/product-m-03-thumb.jpg', title: 'Keyboard', price: 250, currency: '$'},
    {id: 4, img:'img/product/product-m-04-thumb.jpg', title: 'Gamepad', price: 150, currency: '$'},
];

/*const renderProduct = (title, price) => {
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
    document.querySelector('.product-grid__wrapper').innerHTML = productList;
}*/

const renderProduct = item => `
    <div id="${item.id}" class="product-item">
        <div class="product-item__wrapper">
            <div class="product-item__picture">
                <a class="btn__add-to-cart" href="#" title="${item.title}"><span class="btn btn__ghost--negative btn--transparent"><i class="icon__cart"></i>Add to Cart</span></a>
                <picture><img class="img--fluid" src="${item.img}" alt="${item.title}"/></picture>
            </div>
            <div class="product-item__body">
                <div class="product-item__decription">
                    <h4><a href="xxxx" title="${item.title}">${item.title}</a></h4>
                </div>
                <div class="product-item__price"><span class="price--discount">${item.currency}${item.price}</span></div>
            </div>
        </div>
      </div>
`;
const renderProducts = list => {
    document.querySelector('.product-grid__wrapper').insertAdjacentHTML('afterbegin', list.map(item => renderProduct(item)).join(''));
};

renderProducts(products);
