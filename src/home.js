import { handleBtnClose, handleBuyItemClick, handleCategoryBtnClick, handleHomePageLoad, handleItemClick, handleLoadMoreClick, handleModalBtnAdd, handleModalClose, handleSearchBtnClear, handleSerchFormSubmit, handleWishlistAdd } from "./js/handlers";
import { handleTogleThemeClick } from "./js/helpers";
import { refs } from "./js/refs";


document.addEventListener('DOMContentLoaded', handleHomePageLoad);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreClick);
refs.searchForm.addEventListener('submit', handleSerchFormSubmit);
refs.categoriesList.addEventListener('click', handleCategoryBtnClick);


//МОДАЛКА
//ці події на всіх сторінках одинакові
//оскільки на всіх сторінках модальне вікно товару і дії в ньому одинакові
refs.productsList.addEventListener('click', handleItemClick);
refs.modalCloseBtn.addEventListener('click', handleBtnClose);
refs.modal.addEventListener('click', handleModalClose);
refs.addToCartModalBtn.addEventListener('click', handleModalBtnAdd)
refs.addTowishlistBtn.addEventListener('click', handleWishlistAdd);
refs.modal.addEventListener('click', handleBuyItemClick);
//ПЕРЕМИКАННЯ ТЕМИ
refs.themeToggleBtn.addEventListener('click', handleTogleThemeClick);
//


//оскільки при натисканні на категорію сторінка не перезавантажується
//очищаємо інпут пошуку при натисканні на категорію
refs.searchFormBtnClear.addEventListener('click', handleSearchBtnClear);
