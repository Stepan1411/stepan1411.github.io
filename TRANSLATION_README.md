# Wiki Translation Script

Автоматический перевод markdown файлов вики на несколько языков.

## Установка

1. Установите Python 3.7 или выше
2. Установите необходимые библиотеки:

```bash
pip install deep-translator tqdm
```

## Использование

1. Поместите все оригинальные .md файлы в папку `wiki/`
2. Запустите скрипт:

```bash
python translate_wiki.py
```

3. Переведённые файлы появятся в `wiki/player/{язык}/`

## Структура

```
wiki/
├── Home.md (оригинал)
├── Commands.md (оригинал)
└── player/
    ├── en/
    │   ├── Home.md
    │   └── Commands.md
    ├── ru/
    │   ├── Home.md
    │   └── Commands.md
    ├── zh-CN/
    ├── fr/
    ├── es/
    └── de/
```

## Настройка

Отредактируйте переменные в начале `translate_wiki.py`:

- `SOURCE_DIR` - папка с оригинальными файлами
- `OUTPUT_DIR` - папка для переведённых файлов
- `SOURCE_LANG` - язык оригинала (по умолчанию "en")
- `TARGET_LANGUAGES` - список языков для перевода

## Особенности

- ✅ Работает с Python 3.13+
- ✅ Использует Google Translate через deep-translator
- ✅ Сохраняет форматирование markdown
- ✅ Не переводит блоки кода (```)
- ✅ Не переводит inline код (`code`)
- ✅ Автоматически создаёт папки для языков
- ✅ Копирует оригинал в папку `en/`

## Примечания

- Скрипт использует Google Translate API через deep-translator
- Есть небольшая задержка между запросами (0.1 сек)
- Для больших файлов перевод может занять время
- Рекомендуется проверить переводы вручную

## Troubleshooting

### Ошибка "No module named 'deep_translator'"
```bash
pip install deep-translator
```

### Ошибка "No module named 'cgi'" (Python 3.13+)
Используйте `deep-translator` вместо `googletrans`:
```bash
pip uninstall googletrans
pip install deep-translator
```

### Слишком много запросов
Увеличьте задержку в строке:
```python
time.sleep(0.5)  # Было 0.1
```
