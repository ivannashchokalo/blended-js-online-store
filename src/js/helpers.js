import { refs } from "./refs";
import { loadFromLS, saveToLS } from "./storage";


// Клік по кнопці перемикання ТЕМИ 
export function handleTogleThemeClick() {
    if (document.body.hasAttribute('data-theme')) {
        document.body.removeAttribute('data-theme');
        refs.themeToggleBtn.textContent = '☀️';

        //до сховища додаємо назву теми, яка зараз вибрана
        //щоб потім знати які зміни відображати при завантаженні сторінки
        saveToLS('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        refs.themeToggleBtn.textContent = '🌙';
        saveToLS('theme', 'dark');
    }
}


// цю ф-ю будемо викликати при завантаженні кожної сторінки, щоб підтягувати поточну тему зі сховища
export function initTheme() {
    const savedTheme = loadFromLS('theme');

    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        refs.themeToggleBtn.textContent = '🌙';
        
    } else {
        document.body.removeAttribute('data-theme');
        refs.themeToggleBtn.textContent = '☀️';
    }
}
