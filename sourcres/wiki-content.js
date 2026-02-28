// Additional wiki content sections
wikiContent.combat = {
    en: `<h1>⚔️ Combat System</h1><p>Learn how PVP Bot handles combat.</p><div class="alert alert-info"><strong>Note:</strong> Bots use advanced AI to fight intelligently!</div><h2>Combat Features</h2><ul><li>Critical hits</li><li>Ranged combat (bows, crossbows)</li><li>Shield usage</li><li>Automatic weapon switching</li><li>Retreat when low HP</li></ul>`,
    ru: `<h1>⚔️ Система боя</h1><p>Узнайте, как PVP Bot управляет боем.</p><div class="alert alert-info"><strong>Примечание:</strong> Боты используют продвинутый ИИ для умного боя!</div><h2>Боевые возможности</h2><ul><li>Критические удары</li><li>Дальний бой (луки, арбалеты)</li><li>Использование щита</li><li>Автоматическая смена оружия</li><li>Отступление при низком HP</li></ul>`
};

wikiContent.navigation = {
    en: `<h1>🚶 Navigation</h1><p>How bots move and navigate.</p><h2>Movement Features</h2><ul><li>Bunny hopping for speed</li><li>Pathfinding around obstacles</li><li>Idle wandering</li><li>Following paths</li></ul>`,
    ru: `<h1>🚶 Навигация</h1><p>Как боты двигаются и ориентируются.</p><h2>Возможности передвижения</h2><ul><li>Банни-хоп для скорости</li><li>Обход препятствий</li><li>Случайное блуждание</li><li>Следование по путям</li></ul>`
};

wikiContent.paths = {
    en: `<h1>🛤️ Paths</h1><p>Create patrol routes for your bots.</p><h2>Creating a Path</h2><pre><code>/pvpbot path create patrol
/pvpbot path add patrol
/pvpbot path add patrol
/pvpbot path follow Guard1 patrol</code></pre>`,
    ru: `<h1>🛤️ Пути</h1><p>Создавайте маршруты патрулирования для ботов.</p><h2>Создание пути</h2><pre><code>/pvpbot path create патруль
/pvpbot path add патруль
/pvpbot path add патруль
/pvpbot path follow Охранник1 патруль</code></pre>`
};

wikiContent.factions = {
    en: `<h1>👥 Factions</h1><p>Organize bots into teams.</p><h2>Creating Factions</h2><pre><code>/pvpbot faction create Red
/pvpbot faction create Blue
/pvpbot faction add Red Bot1
/pvpbot faction add Blue Bot2
/pvpbot faction hostile Red Blue</code></pre>`,
    ru: `<h1>👥 Фракции</h1><p>Организуйте ботов в команды.</p><h2>Создание фракций</h2><pre><code>/pvpbot faction create Красные
/pvpbot faction create Синие
/pvpbot faction add Красные Бот1
/pvpbot faction add Синие Бот2
/pvpbot faction hostile Красные Синие</code></pre>`
};

wikiContent.kits = {
    en: `<h1>🎒 Kits</h1><p>Equipment presets for your bots.</p><h2>Creating a Kit</h2><ol><li>Fill your inventory with items</li><li>Run <code>/pvpbot createkit warrior</code></li><li>Give to bot: <code>/pvpbot givekit Bot1 warrior</code></li></ol>`,
    ru: `<h1>🎒 Наборы</h1><p>Предустановки снаряжения для ботов.</p><h2>Создание набора</h2><ol><li>Заполните инвентарь предметами</li><li>Выполните <code>/pvpbot createkit воин</code></li><li>Дайте боту: <code>/pvpbot givekit Бот1 воин</code></li></ol>`
};

wikiContent.settings = {
    en: `<h1>⚙️ Settings</h1><p>Configure bot behavior.</p><h2>Common Settings</h2><table><tr><th>Setting</th><th>Default</th><th>Description</th></tr><tr><td><code>combat</code></td><td>true</td><td>Enable combat</td></tr><tr><td><code>autotarget</code></td><td>false</td><td>Auto-search enemies</td></tr><tr><td><code>bhop</code></td><td>true</td><td>Bunny hop</td></tr><tr><td><code>movespeed</code></td><td>1.0</td><td>Speed multiplier</td></tr></table><h3>Example</h3><pre><code>/pvpbot settings autotarget true
/pvpbot settings movespeed 1.5</code></pre>`,
    ru: `<h1>⚙️ Настройки</h1><p>Настройте поведение ботов.</p><h2>Основные настройки</h2><table><tr><th>Настройка</th><th>По умолчанию</th><th>Описание</th></tr><tr><td><code>combat</code></td><td>true</td><td>Включить бой</td></tr><tr><td><code>autotarget</code></td><td>false</td><td>Авто-поиск врагов</td></tr><tr><td><code>bhop</code></td><td>true</td><td>Банни-хоп</td></tr><tr><td><code>movespeed</code></td><td>1.0</td><td>Множитель скорости</td></tr></table><h3>Пример</h3><pre><code>/pvpbot settings autotarget true
/pvpbot settings movespeed 1.5</code></pre>`
};
