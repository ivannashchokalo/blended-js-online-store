import { refs } from "./refs";

export function showModalWindow() {
    refs.modal.classList.add('modal--is-open');
}

export function hideModalWindow() {
    refs.modal.classList.remove('modal--is-open');
}

export async function renderModalProduct({id, thumbnail, description, title, brand, category, price}) {
    const markup = `<img class="modal-product__img" src="${thumbnail}" alt="" />
      <div class="modal-product__content" data-id="${id}">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${category}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping:</p>
        <p class="modal-product__return-policy">Return Policy:</p>
        <p class="modal-product__price">Price:${price} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
`
    refs.modalProduct.innerHTML = markup;
}

