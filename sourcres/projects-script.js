// Theme toggle
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

// Set default theme to dark if no saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
document.documentElement.setAttribute('data-theme', savedTheme);

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

// Projects data - Add your projects here
const projects = [
    {
        title: {
            en: "Orbital Strike Cannon",
            ru: "Orbital Strike Cannon"
        },
        description: {
            en: "This DataPack/mod adds an orbital cannon, it can be called with a command/special fishing rod",
            ru: "Этот DataPack/мод добавляет орбитальную пушку, которую можно вызвать с помощью команды/специальной удочки."
        },
        image: "sourcres/osc.webp",
        link: "https://github.com/Stepan1411/osc-dp",
        wikiLink: "",
        sourceLink: "https://github.com/Stepan1411/Orbital-strike-cannon-datapack",
        tags: []
    },
    {
        title: {
            en: "PVP bot",
            ru: "PVP bot"
        },
        description: {
            en: "A mod for Minecraft Fabric that adds smart PvP bots",
            ru: "Мод для Minecraft Fabric, добавляющий умных PvP-ботов."
        },
        image: "sourcres/pvpbot.webp",
        link: "https://modrinth.com/mod/pvp-bot-fabric",
        wikiLink: "https://stepan1411.github.io/pvpbot-docs.html",
        sourceLink: "https://github.com/Stepan1411/pvp-bot-fabric",
        tags: []
    },
    {
        title: {
            en: "Audio disc [⚠️Archived⚠️]",
            ru: "Audio disc [⚠️Архивирован⚠️]"
        },
        description: {
            en: "Transform your Minecraft music experience with custom audio discs! ",
            ru: "Преобразите свой музыкальный опыт в Minecraft с помощью пользовательских аудиодисков!"
        },
        image: "sourcres/ad.webp",
        link: "https://modrinth.com/mod/audio-disc",
        wikiLink: "https://github.com/Stepan1411/Audio_Disc/blob/master/DEVELOPER_DOCUMENTATION.md",
        sourceLink: "https://github.com/Stepan1411/Audio_Disc",
        tags: []
    },
    {
        title: {
            en: "Carpet mace fix",
            ru: "Carpet mace fix"
        },
        description: {
            en: "This mod fixes bug #2108 in the carpet mod.",
            ru: "Этот мод исправляет ошибку #2108 в моде на ковры."
        },
        image: "sourcres/macefix.webp",
        link: "https://modrinth.com/mod/carpet-mace-fix",
        tags: []
    },
    {
        title: {
            en: "Carpet crit fix",
            ru: "Carpet crit fix"
        },
        description: {
            en: "This mod fixes the problem where fake players don't perform critical hits",
            ru: "Этот мод исправляет проблему, из-за которой фальшивые игроки не наносят критических ударов."
        },
        image: "sourcres/critfix.webp",
        link: "https://modrinth.com/mod/carpet-crit-fix",
        tags: []
    },
    {
        title: {
            en: "Orbital Wolf Cannon",
            ru: "Orbital Wolf Cannon"
        },
        description: {
            en: "Orbital Wolf Cannon like FlameFrags",
            ru: "Орбитальная волчья пушка, подобная FlameFrags"
        },
        image: "sourcres/owc.webp",
        link: "https://modrinth.com/datapack/orbital-wolf-cannon",
        sourceLink: "https://github.com/Stepan1411/Orbital-wolf-cannon",
        tags: []
    },
    {
        title: {
            en: "TNT Damage Booster",
            ru: "TNT Damage Booster"
        },
        description: {
            en: "Increases TNT damage",
            ru: "Увеличивает урон от тротила."
        },
        image: "sourcres/tdb.webp",
        link: "https://modrinth.com/datapack/tnt-damage-booster",
        tags: []
    },
    {
        title: {
            en: "ALOH (at least one hp)",
            ru: "ALOH (at least one hp)"
        },
        description: {
            en: "A Fabric mod for Minecraft 1.21.1+ that prevents selected players from dying by keeping their health at a minimum of half a heart.",
            ru: "Модификация для Minecraft 1.21.1+, которая предотвращает смерть отдельных игроков, поддерживая уровень их здоровья на уровне не менее половины сердца."
        },
        image: "sourcres/aloh.webp",
        link: "https://modrinth.com/mod/aloh-(at-least-one-hp)",
        tags: []
    },
    {
        title: {
            en: "Chat translator",
            ru: "Chat translator"
        },
        description: {
            en: "This mod translates Minecraft chat into multiple languages.",
            ru: "Этот мод переводит чат Minecraft на несколько языков."
        },
        image: "sourcres/ct.webp",
        link: "https://modrinth.com/mod/chat-translator-fabric",
        wikiLink: "",
        sourceLink: "https://github.com/Stepan1411/sw4-chat-translator",
        tags: []
    }
];

// Render projects
function renderProjects() {
    const grid = document.querySelector('.projects-grid');
    grid.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const tagHTML = project.tags.map(tag => `<span class="tag ${tag}">${tag.charAt(0).toUpperCase() + tag.slice(1)}</span>`).join('');
        
        const wikiLinkHTML = project.wikiLink ? `
            <a href="${project.wikiLink}" class="project-link wiki-link" target="_blank" rel="noopener noreferrer">
                <span data-en="View Wiki" data-ru="Посмотреть Wiki">${currentLang === 'en' ? 'View Wiki' : 'Посмотреть Wiki'}</span> →
            </a>
        ` : '';
        
        const sourceLinkHTML = project.sourceLink ? `
            <a href="${project.sourceLink}" class="project-link source-link" target="_blank" rel="noopener noreferrer">
                <span data-en="View Source Code" data-ru="Посмотреть исходники">${currentLang === 'en' ? 'View Source Code' : 'Посмотреть исходники'}</span> →
            </a>
        ` : '';
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title.en}">
            </div>
            <div class="project-content">
                <h3 class="project-title" data-en="${project.title.en}" data-ru="${project.title.ru}">${currentLang === 'en' ? project.title.en : project.title.ru}</h3>
                <p class="project-description" data-en="${project.description.en}" data-ru="${project.description.ru}">${currentLang === 'en' ? project.description.en : project.description.ru}</p>
                <div class="project-tags">
                    ${tagHTML}
                </div>
                <div class="project-links">
                    <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <span data-en="View on Modrinth" data-ru="Смотреть на Modrinth">${currentLang === 'en' ? 'View on Modrinth' : 'Смотреть на Modrinth'}</span> →
                    </a>
                    ${wikiLinkHTML}
                    ${sourceLinkHTML}
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

renderProjects();
