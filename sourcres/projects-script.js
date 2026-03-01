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
    
    // Re-render projects to update translations
    if (typeof renderProjects === 'function') {
        renderProjects();
    }
}

// Projects data - Add your projects here
// Example with custom buttons:
// {
//     title: { en: "Project Name", ru: "Название проекта" },
//     description: { en: "Description", ru: "Описание" },
//     fullDescription: {  // Optional - detailed description in modal
//         en: "<h3>Features</h3><ul><li>Feature 1</li><li>Feature 2</li></ul><p>More details...</p>",
//         ru: "<h3>Возможности</h3><ul><li>Возможность 1</li><li>Возможность 2</li></ul><p>Подробнее...</p>"
//     },
//     image: "sourcres/image.webp",
//     link: "https://modrinth.com/...",  // Optional
//     wikiLink: "https://...",  // Optional
//     youtubeLink: "https://youtube.com/...",  // Optional
//     sourceLink: "https://github.com/...",  // Optional
//     customButtons: [  // Optional - array of custom buttons
//         {
//             url: "https://example.com",
//             color: "#ff6b6b",  // Hex color code
//             label: { en: "Custom Button", ru: "Кастомная кнопка" }
//         }
//     ],
//     date: "2024-01-15",  // Optional - displayed at bottom in gray
//     tags: [],
//     category: "mods"  // or "servers" or "scripts"
// }
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
        tags: [],
        category: "mods"
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
        tags: [],
        category: "mods"
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
        tags: [],
        category: "mods"
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
        tags: [],
        category: "mods"
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
        tags: [],
        category: "mods"
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
        tags: [],
        category: "mods"
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
        tags: [],
        category: "mods"
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
        tags: [],
        category: "mods"
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
        tags: [],
        category: "mods"
    },
    {
        title: {
            en: "SurvivalWorld season 4",
            ru: "SurvivalWorld сезон 4"
        },
        description: {
            en: "Server in development",
            ru: "Сервер в разроботке"
        },
        fullDescription: {
            en: `<h3>About Server</h3>
<ul>
<li>This will be a highly advanced private server with custom mods, lore, and events. They're calling it a "poor man's MineShield."</li>
</ul>`,
            ru: `<h3>О сервере</h3>
<ul>
<li>Это будет высокотехнологичный частный сервер с собственными модами, лором и событиями. Его называют "MineShield для бедных".</li>
</ul>`
        },
        image: "sourcres/sws4.png",
        link: "",
        wikiLink: "",
        sourceLink: "",
        date: "Started dev: 2026-02-10",
        tags: [],
        category: "servers"
    },
    {
        title: {
            en: "SurvivalWorld season 3",
            ru: "SurvivalWorld сезон 3"
        },
        description: {
            en: "This server is closed and twitch delete all streams :(",
            ru: "Этот сервер закрыт и twitch удалил все стримы :("
        },
        fullDescription: {
            en: `<h3>About Server</h3>
<ul>
<li>Same as SurvivalWorld Season 4, but with a custom datapack.</li>
</ul>`,
            ru: `<h3>О сервере</h3>
<ul>
<li>То же самое, что и в 4-м сезоне SurvivalWorld, но с самописным ДатаПаком.</li>
</ul>`
        },
        image: "sourcres/sws3.jpg",
        link: "",
        wikiLink: "",
        sourceLink: "",
        youtubeLink: "",
        date: "Started: 2025-06/07-??",
        customButtons: [
            {
                url: "https://stepan1411.tilda.ws/survivalworld",
                color: "#888888ff",
                label: {
                    en: "Website",
                    ru: "Сайт"
                }
            },
            {
                url: "https://www.twitch.tv/stepan1411/clip/TransparentRepleteCobblerPoooound-SixN0tOolCJ3Rtpl",
                color: "#5706daff",
                label: {
                    en: "Twitch clip",
                    ru: "Twitch клип"
                }
            }
        ],
        tags: [],
        category: "servers"
    },
    {
        title: {
            en: "SurvivalWorld season 2",
            ru: "SurvivalWorld сезон 2"
        },
        description: {
            en: "This server is closed",
            ru: "Этот сервер закрыт"
        },
        fullDescription: {
            en: `<h3>About Server</h3>
<ul>
<li>Same as SurvivalWorld Season 3, but with a custom datapack and on paper server.</li>
</ul>`,
            ru: `<h3>О сервере</h3>
<ul>
<li>То же самое, что и в 3-м сезоне SurvivalWorld, но с самописным ДатаПаком и сервер на paper.</li>
</ul>`
        },
        image: "sourcres/sws2.jpg",
        link: "",
        wikiLink: "",
        sourceLink: "",
        youtubeLink: "https://youtu.be/FsPju3fNhpc",
        date: "Started: 2025-05-28",
        customButtons: [
            {
                url: "https://stepan1411.tilda.ws/survivalworld",
                color: "#888888ff",
                label: {
                    en: "Website",
                    ru: "Сайт"
                }
            }
        ],
        tags: [],
        category: "servers"
    },
    {
        title: {
            en: "SurvivalWorld season 1",
            ru: "SurvivalWorld сезон 1"
        },
        description: {
            en: "This server is closed",
            ru: "Этот сервер закрыт"
        },
        fullDescription: {
            en: `<h3>About Server</h3>
<ul>
<li>Same as SurvivalWorld Season 2, but with a custom datapack and on paper server.</li>
</ul>`,
            ru: `<h3>О сервере</h3>
<ul>
<li>То же самое, что и в 2-м сезоне SurvivalWorld, но с самописным ДатаПаком и сервер на paper.</li>
</ul>`
        },
        image: "sourcres/sws1.jpg",
        link: "",
        wikiLink: "",
        sourceLink: "",
        youtubeLink: "https://youtu.be/AwLYbP9-Tvw",
        date: "Started: 2025-04-15",
        customButtons: [
            {
                url: "https://stepan1411.tilda.ws/survivalworld",
                color: "#888888ff",
                label: {
                    en: "Website",
                    ru: "Сайт"
                }
            }
        ],
        tags: [],
        category: "servers"
    },
    {
        title: {
            en: "StepanWorld",
            ru: "StepanWorld"
        },
        description: {
            en: "A very old server, it was a free downloaded server build.",
            ru: "Это был очень старый сервер, бесплатная, скачанная сборка сервера."
        },
        fullDescription: {
            en: `<h3>About Server</h3>
<ul>
<li>A very old server, it was a free downloaded server build.</li>
<li>As I recall, it had Anarchy, Grif Hub, and Doors (also downloaded from the internet).</li>
<li>It was all hosted on my old computer.</li>
<h3>Cringe shorts.</h3>
<li>These shorts are only available to inquisitive people like you :)</li>
<li>https://youtube.com/shorts/Q4B03ebaXaI?feature=share</li>
<li>https://youtube.com/shorts/tnj7n8f3k_A?feature=share</li>
<li>https://youtube.com/shorts/NMauxMA3DIM?feature=share</li>
<li>https://youtube.com/shorts/cnrDUfLcUn0?feature=share</li>
<li>https://youtube.com/shorts/qqVFwZnxib8?feature=share</li>
<li>https://youtube.com/shorts/4qrJdDuAbtY?feature=share</li>
<li>https://youtube.com/shorts/ny00n-4dVeI?feature=share</li>
<li>https://youtube.com/shorts/PWtAL6iFykw?feature=share</li>
<li>https://youtube.com/shorts/QGDmSGqU0U0?feature=share</li>
<li>https://youtube.com/shorts/HJCR9H80wdk?feature=share</li>
<li>https://youtube.com/shorts/bKuPxtxPwZI?feature=share</li>
<li>https://youtube.com/shorts/-UPnMVsBeUM?feature=share</li>
<li>https://youtube.com/shorts/AeWTO1aYQyQ?feature=share</li>
<li>There's a lot more of this and there are even animations, but I don't want to show all of it :)</li>
</ul>`,
            ru: `<h3>О сервере</h3>
<ul>
<li>Это был очень старый сервер, бесплатная, скачанная версия.</li>
<li>Насколько я помню, на нём были Anarchy, Grif Hub и Doors (также скачанные из интернета).</li>
<li>Всё это размещалось на моём старом компьютере.</li>
<h3>Кринжовые шортсы.</h3>
<li>Эти шортсы доступны только любознательным как ты :)</li>
<li>https://youtube.com/shorts/Q4B03ebaXaI?feature=share</li>
<li>https://youtube.com/shorts/tnj7n8f3k_A?feature=share</li>
<li>https://youtube.com/shorts/NMauxMA3DIM?feature=share</li>
<li>https://youtube.com/shorts/cnrDUfLcUn0?feature=share</li>
<li>https://youtube.com/shorts/qqVFwZnxib8?feature=share</li>
<li>https://youtube.com/shorts/4qrJdDuAbtY?feature=share</li>
<li>https://youtube.com/shorts/ny00n-4dVeI?feature=share</li>
<li>https://youtube.com/shorts/PWtAL6iFykw?feature=share</li>
<li>https://youtube.com/shorts/QGDmSGqU0U0?feature=share</li>
<li>https://youtube.com/shorts/HJCR9H80wdk?feature=share</li>
<li>https://youtube.com/shorts/bKuPxtxPwZI?feature=share</li>
<li>https://youtube.com/shorts/-UPnMVsBeUM?feature=share</li>
<li>https://youtube.com/shorts/AeWTO1aYQyQ?feature=share</li>
<li>Там ещё мнооого этого и даже есть анимации но я не хочю показывать всё это :)</li>
</ul>`
        },
        image: "sourcres/sw.png",
        link: "",
        wikiLink: "",
        sourceLink: "",
        youtubeLink: "https://youtube.com/live/d2Eqg_amWQ8",
        date: "Started: 2024/2023-04/05/06-??",
        customButtons: [
            {
                url: "https://youtube.com/live/WZVZhUs9rP0",
                color: "#ff0000ff",
                label: {
                    en: "Wathch on YouTube 2",
                    ru: "Смотреть на YouTube 2"
                }
            },
            {
                url: "https://youtube.com/live/aRqN84k1HYo",
                color: "#ff0000ff",
                label: {
                    en: "Wathch on YouTube 3",
                    ru: "Смотреть на YouTube 3"
                }
            },,
            {
                url: "https://youtu.be/-5sZ8J8v7N4",
                color: "#ff0000ff",
                label: {
                    en: "Wathch on YouTube 4",
                    ru: "Смотреть на YouTube 4"
                }
            },
            {
                url: "https://hotmc.ru/minecraft-server-269432",
                color: "#888888ff",
                label: {
                    en: "Website",
                    ru: "Сайт"
                }
            }
        ],
        tags: [],
        category: "servers"
    },
    {
        title: {
            en: "StepanTopWorld season 2",
            ru: "StepanTopWorld сезон 2"
        },
        description: {
            en: "Almost StepanWorld but a little different. This server closed very quickly.",
            ru: "Почти StepanWorld но немного другое. Этот сервер закрылся очень быстро."
        },
        image: "sourcres/stw.jpg",
        link: "",
        wikiLink: "",
        sourceLink: "",
        youtubeLink: "",
        date: "Started: 2023-??-??",
        tags: [],
        category: "servers"
    },
    {
        title: {
            en: "StepanTopWorld",
            ru: "StepanTopWorld"
        },
        description: {
            en: "A very very old server.",
            ru: "Это был очень очень старый сервер."
        },
        fullDescription: {
            en: `<h3>About Server</h3>
<ul>
<li>A very, very old server. My friends and I built houses. I made command blocks that guided us around the server. There were various plugins—I don't remember which ones, but I think they were for some machines and privates. The server was hosted on Aternos. Once or twice, I started a stream on this server, and 5-8 people showed up and built houses. During one stream, the server was flooded with bots and they tried to hack my account.</li>
</ul>`,
            ru: `<h3>О сервере</h3>
<ul>
<li>Очень-очень старый сервер. Мы с друзьями строили дома. Я делал командные блоки, которые направляли нас по серверу. Были разные плагины — я не помню, какие именно, но, кажется, они были для каких-то машин и приваты. Сервер размещался на Aternos. Один или два раза я запускал стрим на этом сервере, и появлялось 5-8 человек, которые строили дома. Во время одного из стримов сервер был завален ботами, и они пытались взломать мой аккаунт.</li>
</ul>`
        },
        image: "sourcres/stw.jpg",
        link: "",
        wikiLink: "",
        sourceLink: "",
        youtubeLink: "",
        date: "Started: 2023/2022-??-??",
        tags: [],
        category: "servers"
    },
    {
        title: {
            en: "OSC Nuke generator",
            ru: "OSC Nuke generator"
        },
        description: {
            en: "Generates Nuke charge like Wemmbu",
            ru: "Генерирует Nuke заряд как у Wemmbu"
        },
        image: "sourcres/osc.webp",
        link: "",
        sourceLink: "https://github.com/Stepan1411/Orbital-Strike-Cannon-nuke-generator",
        tags: [],
        category: "scripts"
    },
    {
        title: {
            en: "Markdown file translator",
            ru: "Markdown file translator"
        },
        description: {
            en: "Translates all .md files into different languages",
            ru: "Переводит все .md файлы на разные языки"
        },
        image: "sourcres/markdown.png",
        link: "",
        sourceLink: "https://github.com/Stepan1411/markdown-file-translator",
        tags: [],
        category: "scripts"
    }
];

let currentCategory = 'mods';

// Tab switching
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const newCategory = btn.getAttribute('data-category');
        
        // Don't do anything if clicking the same category
        if (newCategory === currentCategory) return;
        
        // Remove active class from all buttons
        tabButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Animate transition
        animateTransition(newCategory);
    });
});

// Animate transition between categories
function animateTransition(newCategory) {
    const grid = document.querySelector('.projects-grid');
    const cards = grid.querySelectorAll('.project-card');
    
    // Add transitioning class to prevent interactions
    grid.classList.add('transitioning');
    
    // Add slide-out animation to all cards
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('slide-out');
        }, index * 30); // Stagger the animation
    });
    
    // Wait for animation to complete, then update category and render
    setTimeout(() => {
        currentCategory = newCategory;
        renderProjects();
        grid.classList.remove('transitioning');
    }, cards.length * 30 + 300); // Wait for all cards to slide out
}

// Render projects
function renderProjects() {
    const grid = document.querySelector('.projects-grid');
    grid.innerHTML = '';
    
    // Filter projects by category
    const filteredProjects = projects.filter(p => p.category === currentCategory);
    
    if (filteredProjects.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; opacity: 0.6;">
                <h3 style="font-size: 24px; margin-bottom: 12px;">${currentLang === 'en' ? 'No projects yet' : 'Пока нет проектов'}</h3>
                <p>${currentLang === 'en' ? 'Projects in this category will appear here soon' : 'Проекты в этой категории скоро появятся здесь'}</p>
            </div>
        `;
        return;
    }
    
    filteredProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = `${index * 50}ms`; // Stagger the slide-in animation
        
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
        
        const youtubeLinkHTML = project.youtubeLink ? `
            <a href="${project.youtubeLink}" class="project-link youtube-link" target="_blank" rel="noopener noreferrer">
                <span data-en="Watch on YouTube" data-ru="Смотреть на YouTube">${currentLang === 'en' ? 'Watch on YouTube' : 'Смотреть на YouTube'}</span> →
            </a>
        ` : '';
        
        // Custom buttons support
        let customButtonsHTML = '';
        if (project.customButtons && Array.isArray(project.customButtons)) {
            customButtonsHTML = project.customButtons.map(btn => `
                <a href="${btn.url}" class="project-link custom-button" style="background-color: ${btn.color || '#3b9cff'} !important; color: white !important;" target="_blank" rel="noopener noreferrer">
                    <span data-en="${btn.label.en}" data-ru="${btn.label.ru}">${currentLang === 'en' ? btn.label.en : btn.label.ru}</span> →
                </a>
            `).join('');
        }
        
        const dateHTML = project.date ? `
            <div class="project-date">${project.date}</div>
        ` : '';
        
        const descriptionButtonHTML = project.fullDescription ? `
            <button class="project-link description-btn" data-project-id="${index}">
                <span data-en="View Description" data-ru="Посмотреть описание">${currentLang === 'en' ? 'View Description' : 'Посмотреть описание'}</span> →
            </button>
        ` : '';
        
        const modrinthLinkHTML = project.link ? `
            <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">
                <span data-en="View on Modrinth" data-ru="Смотреть на Modrinth">${currentLang === 'en' ? 'View on Modrinth' : 'Смотреть на Modrinth'}</span> →
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
                    ${modrinthLinkHTML}
                    ${wikiLinkHTML}
                    ${youtubeLinkHTML}
                    ${customButtonsHTML}
                    ${descriptionButtonHTML}
                    ${sourceLinkHTML}
                </div>
                ${dateHTML}
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // Add event listeners for description buttons
    document.querySelectorAll('.description-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project-id');
            const filteredProjects = projects.filter(p => p.category === currentCategory);
            const project = filteredProjects[projectId];
            if (project && project.fullDescription) {
                openModal(project);
            }
        });
    });
}

// Modal functionality
const modal = document.getElementById('descriptionModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');

function openModal(project) {
    modalTitle.textContent = currentLang === 'en' ? project.title.en : project.title.ru;
    modalDescription.innerHTML = currentLang === 'en' ? project.fullDescription.en : project.fullDescription.ru;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// Initialize
updateLanguage(currentLang);
renderProjects();
