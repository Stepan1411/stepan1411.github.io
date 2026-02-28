// Theme toggle
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

// Load saved theme
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
const linkTexts = document.querySelectorAll('.link .text');

// Load saved language
let currentLang = localStorage.getItem('language') || 'en';
updateLanguage(currentLang);

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    updateLanguage(currentLang);
    localStorage.setItem('language', currentLang);
});

function updateLanguage(lang) {
    langText.textContent = lang === 'en' ? 'RU' : 'EN';
    
    document.querySelectorAll('.link').forEach(link => {
        const text = link.querySelector('.text');
        const translation = link.getAttribute(`data-${lang}`);
        if (translation) {
            text.textContent = translation;
        }
    });
    
    // Update about text
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        const translation = aboutText.getAttribute(`data-${lang}`);
        if (translation) {
            aboutText.textContent = translation;
        }
    }
}

// Add your links here
const links = {
    youtube: 'https://www.youtube.com/@Stepan1411',
    telegram: 'https://t.me/stepanworld_ru',
    modrinth: 'https://modrinth.com/user/Stepan1411_Studio',
    discord: 'https://discord.com/invite/89dgfsCby3',
    projects: '/projects.html'
};

// Apply links
document.querySelector('.youtube').href = links.youtube || '#';
document.querySelector('.telegram').href = links.telegram || '#';
document.querySelector('.modrinth').href = links.modrinth || '#';
document.querySelector('.discord').href = links.discord || '#';

// Projects link opens in same tab
const projectsLink = document.querySelector('.projects');
projectsLink.href = links.projects || '#';
projectsLink.removeAttribute('target');
