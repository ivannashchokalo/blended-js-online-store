import { LIMIT } from "./constants";
import { initTheme } from "./helpers";
import { hideModalWindow, renderModalProduct, showModalWindow } from "./modal";
import { fetchAllCategories, fetchAllProducts, fetchProductByCategory, fetchProductById, fetchProductByQuery } from "./products-api";
import { refs } from "./refs";
import { hideLoadBtn, productsTemplate, renderCategories, renderInfo, renderProducts, showLoadBtn } from "./render-function";
import { loadFromLS, saveToLS } from "./storage";

let totalPages;
let page = 1;
let query;
let category;
let cartItems = loadFromLS('cartItems') || [];
let wishlistItems = loadFromLS('wishlist') || [];



//!============= HOME PAGE =================================

// --------- LOAD ---------------------------
export async function handleHomePageLoad() {

    // підтягуємо тему, яка збережена у сховищі
    initTheme();

    //запит на сервер за катерогіями
    const categories = await fetchAllCategories()
    //відмальовуємо на сторінці
    renderCategories(categories);

    const input = loadFromLS('inputValue');

    if (input) {
        query = input;
        const productsResponse = await fetchProductByQuery(query, page);
        const products = productsResponse.products;
        refs.productsList.innerHTML = '';
        renderProducts(products);
        totalPages = Math.ceil(productsResponse.total / LIMIT);

        checkLoadMoreBtnStatus(page, totalPages);
    } else {
        const productsResponse = await fetchAllProducts(page);
        const products = productsResponse.products;
        renderProducts(products);
        totalPages = Math.ceil(productsResponse.total / LIMIT);

        checkLoadMoreBtnStatus(page, totalPages);
    }

    
    countCartItems();// малює цифри для кошику
    countWishlistItems();// малює цифри для вішліста
}


//--------------------- CATEGORY CLICK ------------------------
export async function handleCategoryBtnClick(e) {
    category = e.target.textContent;
    page = 1;
    
    const response = await fetchProductByCategory(category, page);
    const products = response.products;
    
    refs.productsList.innerHTML = '';
    renderProducts(products);

    totalPages = Math.ceil(response.total / LIMIT);
    console.log(response.total);
    console.log(totalPages);
    
    handleSearchBtnClear();
    checkLoadMoreBtnStatus(page, totalPages);
}


//--------------- LOAD MORE BTN --------------------------
export async function handleLoadMoreClick() {
    page += 1;

    checkLoadMoreBtnStatus(page, totalPages);

    if (!query) {
        const productsResponse = await fetchAllProducts(page);
        const products = productsResponse.products;
        renderProducts(products);
    } else {
        const productsResponse = await fetchProductByQuery(query, page);
        const products = productsResponse.products;
        renderProducts(products);
    }
}

//------------- CHECK LOAD MORE BTN --------------------------
export function checkLoadMoreBtnStatus(page, totalPages) {
    if (page >= totalPages) {
        hideLoadBtn();
    } else {
        showLoadBtn();
    }
}


//------------- SEARCH FORM QUERY --------------------------
export async function handleSerchFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    query = formData.get('searchValue');

    const productsResponse = await fetchProductByQuery(query, page);
    const products = productsResponse.products;
    refs.productsList.innerHTML = '';
    renderProducts(products);
    totalPages = Math.ceil(productsResponse.total / LIMIT);

    checkLoadMoreBtnStatus(page, totalPages);
}

//------------------- OPEN MODAL ----------------------
export async function handleItemClick(e) {
    const liElem = e.target.closest('li');
    if (!liElem) return;

    const id = liElem.dataset.id;
    
    const response = await fetchProductById(id);
    renderModalProduct(response);
    showModalWindow();
        
    if (cartItems.includes(id)) {
        refs.addToCartModalBtn.textContent = 'Remove from cart';   
    } else {
        refs.addToCartModalBtn.textContent = 'Add to cart';
    }

    if (wishlistItems.includes(id)) {
        refs.addTowishlistBtn.textContent = 'Remove from Wishlist';
    } else {
        refs.addTowishlistBtn.textContent = 'Add to Wishlist';
    }

    window.addEventListener('keydown', handleEscKeyPress);
}


//!========================= MODAL =================================

//----------------- CLOSE MODAL -------------------------
export function handleBtnClose() {
    hideModalWindow();
    window.removeEventListener('keydown', handleEscKeyPress);
}

export function handleModalClose(e) {
    if (e.target === e.currentTarget) {
        hideModalWindow();
        window.removeEventListener('keydown', handleEscKeyPress);
    }
}

function handleEscKeyPress(e) {
    if (e.code === 'Escape') {
        hideModalWindow()
        window.removeEventListener('keydown', handleEscKeyPress);        
    }
}


//------------------ ADD TO CART -------------------------------
export function handleModalBtnAdd(e) {
    const actions = e.target.closest('.modal-product__actions');
    const productElem = actions.previousElementSibling;

    const contentEl = productElem.querySelector('[data-id]');
    const id = contentEl.dataset.id;


    if (cartItems.includes(id)) {
        e.target.textContent = 'Add to cart';
        cartItems = cartItems.filter(el => el != id);
    } else {
        e.target.textContent = 'Remove from cart';
        cartItems.push(id);
    }

   
    saveToLS('cartItems', cartItems);
    countCartItems();
}


//----------------- BUY PRODUCT -----------------------------
export function handleBuyItemClick(e) {
    if (e.target.textContent !== 'Buy') return;

    const divEl = e.target.closest('div');
    const id = divEl.dataset.id;

    cartItems = cartItems.filter(el => el != id);
    refs.addToCartModalBtn.textContent = 'Add to cart';

    saveToLS('cartItems', cartItems);
    handleCartItemsLoad();
}

//---------------- COUNT CART ITEMS ---------------------------
export function countCartItems() {
    const quantity = cartItems.length;
    refs.cartCountSpan.textContent = quantity;
}


//--------------- ADD TO WISH PRODUCT ----------------------
export function handleWishlistAdd(e) {
    const actions = e.target.closest('.modal-product__actions');
    const productElem = actions.previousElementSibling;

    const contentEl = productElem.querySelector('[data-id]');
    const id = contentEl.dataset.id;

    if (wishlistItems.includes(id)) {
        refs.addTowishlistBtn.textContent = 'Add to Wishlist';
        wishlistItems = wishlistItems.filter(el => el !== id);
    } else {
        refs.addTowishlistBtn.textContent = 'Remove from Wishlist';
        wishlistItems.push(id);
    };

    saveToLS('wishlist', wishlistItems)
    countWishlistItems();
}

//---------------- COUNT WISH ITEMS ---------------------------
export function countWishlistItems() {
    const quantity = wishlistItems.length;
    refs.wishlistCountSpan.textContent = quantity;
}



//!============================= CART PAGE ================================

//------------- LOAD CART PAGE ---------------------------------
export async function handleCartItemsLoad() {
    const cartItems = loadFromLS('cartItems') || [];
    initTheme();
   
    try {
        const response = cartItems.map(id => fetchProductById(id));
        const result = await Promise.all(response);
        const markup = productsTemplate(result);
        refs.cartProductList.innerHTML = markup;
        countWishlistItems();
        countCartItems();
    
        renderInfo(result);
    } catch (error) {
        console.log(error);
    } 
};

//------------- BUY BTN CLICK ----------------------
export function handleBuyBtnClick() {
    cartItems = [];
    saveToLS('cartItems', cartItems);
    
    handleCartItemsLoad();
}


//!==================== WISHLIST PAGE =================================

//----------------- LOAD WISHLIST PAGE -------------------------
export async function handleWishlistLoad(e) {
    wishlistItems = loadFromLS('wishlist') || [];
    initTheme();

    try {
        const response = wishlistItems.map(id => fetchProductById(id));
        const result = await Promise.all(response);
        const markup = productsTemplate(result);
        refs.wishlistProductList.innerHTML = markup;
        
        countWishlistItems();
        countCartItems();
    } catch (error) {
        console.log(error);
    }
}


//!--------- SEARCH BTN FROM CART and WISHLIST ---------------------

//-------- SEARCH ---------------------
export function handleBtnSearch(e) {
    e.preventDefault()
    window.location.replace('/index.html');

    const formData = new FormData(e.target);
    const input = formData.get('searchValue');

    saveToLS('inputValue', input);    
}

//--------- CLEAR ---------------------
export function handleSearchBtnClear(e) {
    refs.searchInput.value = '';
}


// МАЮ доробити load more для кошика та вішліста!!!