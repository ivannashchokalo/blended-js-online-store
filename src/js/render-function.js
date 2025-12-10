import { parse } from "postcss";
import { refs } from "./refs";

export function categoryTemplate(category) {
    return `<li class="categories__item">
   <button class="categories__btn" type="button">${category}</button>
 </li>
`
}

export function categoriesTemplate(categories) {
    return categories.map(categoryTemplate).join('');
}

export function renderCategories(categories) {
    const markup = categoriesTemplate(categories);

    refs.categoriesList.innerHTML = markup;
}


export function productTemplate({id, thumbnail, description, title, brand, category, price}) {
    return `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${description}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>
`
}

export function productsTemplate(products) {
    return products.map(productTemplate).join('');
}

export function renderProducts(products) {
    const markup = productsTemplate(products);

    refs.productsList.insertAdjacentHTML('beforeend', markup);
}


export function showLoadBtn() {
    refs.loadMoreBtn.classList.remove('is-hidden')
}

export function hideLoadBtn() {
    refs.loadMoreBtn.classList.add('is-hidden')
    console.log('hide btn');
    
}



//рендер інформації у кошику
export function renderInfo(items) {
    const quantity = items.length;
    refs.cartSummaryQ.textContent = quantity;
     
    let total = 0;

    for (const item of items) {
        total += item.price;
    };
    
    refs.cartSummaryPrice.textContent = total.toFixed(2);
}