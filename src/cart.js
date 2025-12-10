import { handleBtnClose, handleBtnSearch, handleBuyBtnClick, handleBuyItemClick, handleCartItemsLoad, handleItemClick, handleModalBtnAdd, handleModalClose, handleWishlistAdd } from "./js/handlers";
import { handleTogleThemeClick } from "./js/helpers";
import { fetchProductById } from "./js/products-api";
import { refs } from "./js/refs";

//ЗАВАНТАЖЕННЯ СТОРІНКИ
document.addEventListener('DOMContentLoaded', handleCartItemsLoad)

// ВІДКРИВАЄМО МОДАЛКУ У КОШИКУ
refs.cartProductList.addEventListener('click', handleItemClick);

//тут при додаванні чи видаленні товару у самій корзині, ще додатково викликаємо завантаження сторінки
//щоб товар на фоні модалки відмальовувався правильно
refs.addToCartModalBtn.addEventListener('click', handleCartItemsLoad);

//ПОКУПКА ТОВАРІВ
refs.buyBtnCart.addEventListener('click', handleBuyBtnClick);

//МОДАЛКА
//ці події на всіх сторінках одинакові
//оскільки на всіх сторінках модальне вікно товару і дії в ньому одинакові
refs.modalCloseBtn.addEventListener('click', handleBtnClose);
refs.modal.addEventListener('click', handleModalClose);
refs.addToCartModalBtn.addEventListener('click', handleModalBtnAdd);
refs.addTowishlistBtn.addEventListener('click', handleWishlistAdd);
refs.modal.addEventListener('click', handleBuyItemClick);
//ПЕРЕМИКАННЯ ТЕМИ
refs.themeToggleBtn.addEventListener('click', handleTogleThemeClick);
//


//ПОШУК З КОШИКА
//робимо подію для пошуку і перекидання на головну сторінку
//така сама подія і у wishlst
refs.searchForm.addEventListener('submit', handleBtnSearch);

