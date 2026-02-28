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
const langToggle = document.querySelector('.lang-toggle');
const langDropdown = document.getElementById('langDropdown');
const currentLangSpan = document.querySelector('.current-lang');
const langOptions = document.querySelectorAll('.lang-option');

// Language names and flags
const languages = {
    'en': { flag: '🇬🇧', name: 'EN', fullName: 'English' },
    'ru': { flag: '🇷🇺', name: 'RU', fullName: 'Русский' },
    'zh-CN': { flag: '🇨🇳', name: 'ZH', fullName: '中文' },
    'fr': { flag: '🇫🇷', name: 'FR', fullName: 'Français' },
    'es': { flag: '🇪🇸', name: 'ES', fullName: 'Español' },
    'de': { flag: '🇩🇪', name: 'DE', fullName: 'Deutsch' }
};

let currentLang = localStorage.getItem('language') || 'en';

function updateLanguageDisplay() {
    const lang = languages[currentLang];
    currentLangSpan.textContent = `${lang.flag} ${lang.name}`;
    
    // Update active state in dropdown
    langOptions.forEach(option => {
        if (option.getAttribute('data-lang') === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Update sidebar text
    document.querySelectorAll('[data-en]').forEach(element => {
        const translation = element.getAttribute(`data-${currentLang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
}

// Toggle dropdown
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langToggle.classList.toggle('open');
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    langToggle.classList.remove('open');
});

// Language selection
langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = option.getAttribute('data-lang');
        if (lang !== currentLang) {
            currentLang = lang;
            localStorage.setItem('language', currentLang);
            updateLanguageDisplay();
            if (typeof updateNavigationLanguage === 'function') {
                updateNavigationLanguage();
            }
            if (typeof loadPage === 'function' && currentPage) {
                loadPage(currentPage);
            }
        }
        langToggle.classList.remove('open');
    });
});

// Navigation
let currentPage = 'home';
let pagesConfig = { pages: [] };
const contentArea = document.getElementById('content-area');
const sidebarNav = document.querySelector('.sidebar-nav');

// Load pages configuration
async function loadPagesConfig() {
    console.log('Loading pages config...');
    try {
        const response = await fetch('https://stepan1411.github.io/pvp-bot-fabric/wiki/pages.json');
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Failed to load pages config');
        }
        pagesConfig = await response.json();
        console.log('Pages config loaded:', pagesConfig);
        renderNavigation();
        loadPage('home');
    } catch (error) {
        console.error('Error loading pages config:', error);
        showLoadError();
    }
}

// Render navigation from config
function renderNavigation() {
    sidebarNav.innerHTML = '';
    
    pagesConfig.pages.forEach(page => {
        const link = document.createElement('a');
        link.href = `#${page.id}`;
        link.className = 'nav-item';
        link.setAttribute('data-page', page.id);
        
        const icon = document.createElement('span');
        icon.className = 'nav-icon';
        icon.textContent = page.icon;
        
        const text = document.createElement('span');
        text.textContent = page.translations[currentLang] || page.translations.en;
        text.setAttribute('data-page-id', page.id);
        
        link.appendChild(icon);
        link.appendChild(text);
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadPage(page.id);
            
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            
            moveTOCAfterActive();
        });
        
        sidebarNav.appendChild(link);
    });
    
    const firstItem = sidebarNav.querySelector('.nav-item');
    if (firstItem) firstItem.classList.add('active');
}

// Update navigation text when language changes
function updateNavigationLanguage() {
    if (!pagesConfig.pages) return;
    pagesConfig.pages.forEach(page => {
        const navText = document.querySelector(`[data-page-id="${page.id}"]`);
        if (navText) {
            navText.textContent = page.translations[currentLang] || page.translations.en;
        }
    });
}

// Fallback pages
function useFallbackPages() {
    pagesConfig = {
        pages: [
            { id: 'home', icon: '🏠', file: 'Home.md', translations: { en: 'Home', ru: 'Главная' } },
            { id: 'commands', icon: '🎮', file: 'Commands.md', translations: { en: 'Commands', ru: 'Команды' } },
            { id: 'combat', icon: '⚔️', file: 'Combat.md', translations: { en: 'Combat', ru: 'Бой' } },
            { id: 'navigation', icon: '🚶', file: 'Navigation.md', translations: { en: 'Navigation', ru: 'Навигация' } },
            { id: 'paths', icon: '🛤️', file: 'Paths.md', translations: { en: 'Paths', ru: 'Пути' } },
            { id: 'factions', icon: '👥', file: 'Factions.md', translations: { en: 'Factions', ru: 'Фракции' } },
            { id: 'kits', icon: '🎒', file: 'Kits.md', translations: { en: 'Kits', ru: 'Наборы' } },
            { id: 'settings', icon: '⚙️', file: 'Settings.md', translations: { en: 'Settings', ru: 'Настройки' } }
        ]
    };
    renderNavigation();
    loadPage('home');
}

// Show error when wiki fails to load
function showLoadError() {
    sidebarNav.innerHTML = '';
    contentArea.innerHTML = `
        <div class="alert alert-warning" style="margin: 40px;">
            <h2>❌ ${currentLang === 'ru' ? 'Не удалось загрузить вики' : 'Failed to Load Wiki'}</h2>
            <p>${currentLang === 'ru' 
                ? 'Не удалось загрузить конфигурацию вики. Пожалуйста, проверьте подключение к интернету или попробуйте позже.' 
                : 'Failed to load wiki configuration. Please check your internet connection or try again later.'}</p>
            <button onclick="location.reload()" style="
                margin-top: 16px;
                padding: 10px 20px;
                background: var(--accent);
                color: #000;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                font-size: 14px;
            ">${currentLang === 'ru' ? '🔄 Перезагрузить' : '🔄 Reload'}</button>
        </div>
    `;
}

function moveTOCAfterActive() {
    const activeItem = document.querySelector('.nav-item.active');
    const tocSection = document.getElementById('tocSection');
    
    if (activeItem && tocSection) {
        activeItem.parentNode.insertBefore(tocSection, activeItem.nextSibling);
    }
}

async function loadPage(pageId) {
    currentPage = pageId;
    
    // Find page config
    const pageConfig = pagesConfig.pages.find(p => p.id === pageId);
    if (!pageConfig) {
        contentArea.innerHTML = '<div class="alert alert-warning"><h2>Page not found</h2></div>';
        return;
    }
    
    // Show loading
    contentArea.innerHTML = '<div style="text-align: center; padding: 40px;"><p>Loading...</p></div>';
    
    try {
        // Build URL based on language
        let url = `https://stepan1411.github.io/pvp-bot-fabric/wiki/player/${currentLang}/${pageConfig.file}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Page not found');
        }
        
        const markdown = await response.text();
        const html = marked.parse(markdown);
        contentArea.innerHTML = html;
        
        // Generate table of contents
        generateTOC();
        
        // Make external links open in new tab
        contentArea.querySelectorAll('a').forEach(link => {
            if (link.href.startsWith('http')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
        
    } catch (error) {
        const langName = languages[currentLang].fullName;
        contentArea.innerHTML = `
            <div class="alert alert-warning">
                <h2>Page Not Available</h2>
                <p>This page is not available in ${langName} yet. Please try another language or check back later.</p>
            </div>
        `;
    }
    
    window.scrollTo(0, 0);
}

// Generate Table of Contents
function generateTOC() {
    const tocNav = document.getElementById('tocNav');
    const tocSection = document.getElementById('tocSection');
    const headings = contentArea.querySelectorAll('h2, h3');
    
    if (headings.length === 0) {
        tocSection.style.display = 'none';
        return;
    }
    
    tocSection.style.display = 'block';
    tocNav.innerHTML = '';
    
    headings.forEach((heading, index) => {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.className = `toc-link level-${heading.tagName.toLowerCase().replace('h', '')}`;
        
        // Extract emoji/icon from heading text if present
        const text = heading.textContent;
        const emojiMatch = text.match(/^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])\s*/u);
        
        if (emojiMatch && heading.tagName === 'H2') {
            const emoji = emojiMatch[0].trim();
            const textWithoutEmoji = text.replace(emojiMatch[0], '').trim();
            link.innerHTML = `<span class="toc-icon">${emoji}</span> ${textWithoutEmoji}`;
        } else {
            link.textContent = text;
        }
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update active state
            document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
        
        tocNav.appendChild(link);
    });
    
    // Highlight active section on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveTOC();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function updateActiveTOC() {
    const headings = contentArea.querySelectorAll('h2, h3');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    let currentActive = null;
    
    headings.forEach((heading, index) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100 && rect.top >= -100) {
            currentActive = index;
        }
    });
    
    if (currentActive !== null) {
        tocLinks.forEach((link, index) => {
            if (index === currentActive) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Initialize
console.log('Initializing wiki...');
updateLanguageDisplay();
loadPagesConfig();

// Initial TOC position
setTimeout(() => {
    moveTOCAfterActive();
}, 100);

// TOC toggle functionality
const tocToggle = document.getElementById('tocToggle');
const tocSection = document.getElementById('tocSection');

tocToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    tocSection.classList.toggle('collapsed');
    
    // Save state
    const isCollapsed = tocSection.classList.contains('collapsed');
    localStorage.setItem('tocCollapsed', isCollapsed);
});

// Restore TOC state
const tocCollapsed = localStorage.getItem('tocCollapsed') === 'true';
if (tocCollapsed) {
    tocSection.classList.add('collapsed');
}
