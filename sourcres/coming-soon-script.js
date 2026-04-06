// Theme toggle
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Language toggle
const langBtn = document.getElementById('langBtn');
const langText = document.querySelector('.lang-text');

let currentLang = localStorage.getItem('language') || 'en';
updateLanguage(currentLang);

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    updateLanguage(currentLang);
    localStorage.setItem('language', currentLang);
});

function updateLanguage(lang) {
    langText.textContent = lang === 'en' ? 'RU' : 'EN';
    
    document.querySelectorAll('[data-en]').forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
}
