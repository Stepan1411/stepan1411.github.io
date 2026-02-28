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
    'zh': { flag: '🇨🇳', name: 'ZH', fullName: '中文' },
    'fr': { flag: '🇫🇷', name: 'FR', fullName: 'Français' },
    'es': { flag: '🇪🇸', name: 'ES', fullName: 'Español' },
    'de': { flag: '🇩🇪', name: 'DE', fullName: 'Deutsch' }
};

let currentLang = localStorage.getItem('language') || 'en';

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
            loadPage(currentPage);
        }
        langToggle.classList.remove('open');
    });
});

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

// Navigation
let currentPage = 'Home';
const contentArea = document.getElementById('content-area');
const navItems = document.querySelectorAll('.nav-item');

// Page mapping
const pageMapping = {
    'home': 'Home',
    'commands': 'Commands',
    'combat': 'Combat',
    'navigation': 'Navigation',
    'paths': 'Paths',
    'factions': 'Factions',
    'kits': 'Kits',
    'settings': 'Settings'
};

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.getAttribute('data-page');
        loadPage(page);
        
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Move TOC section after active item
        moveTOCAfterActive();
    });
});

function moveTOCAfterActive() {
    const activeItem = document.querySelector('.nav-item.active');
    const tocSection = document.getElementById('tocSection');
    
    if (activeItem && tocSection) {
        // Insert TOC after the active nav item
        activeItem.parentNode.insertBefore(tocSection, activeItem.nextSibling);
    }
}

async function loadPage(page) {
    currentPage = page;
    const pageName = pageMapping[page];
    
    // Show loading
    contentArea.innerHTML = '<div style="text-align: center; padding: 40px;"><p>Loading...</p></div>';
    
    try {
        // Build URL based on language
        let url = `https://stepan1411.github.io/pvp-bot-fabric/wiki/${currentLang}/${pageName}.md`;
        
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
updateLanguageDisplay();
loadPage('home');

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
