# Подключение Telegram бота

## 1. Создание бота

1. Найдите @BotFather в Telegram
2. Отправьте команду `/newbot`
3. Введите имя бота (например: "AI Cook Bot")
4. Введите username бота (например: "ai_cook_helper_bot")
5. Получите токен бота (сохраните его!)

## 2. Настройка мини-приложения

1. Отправьте `/newapp` в @BotFather
2. Выберите созданного бота
3. Введите название приложения
4. Введите описание
5. Загрузите иконку 512x512px
6. Введите URL вашего приложения: `https://your-domain.lovable.app`
7. Получите ссылку на мини-приложение

## 3. Код для бота (Node.js)

```javascript
const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_BOT_TOKEN';
const webAppUrl = 'https://your-domain.lovable.app';

const bot = new TelegramBot(token, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 'Добро пожаловать в AI Cook Bot! 🍳', {
    reply_markup: {
      keyboard: [
        [{ text: '🔍 Найти рецепты', web_app: { url: webAppUrl } }]
      ],
      resize_keyboard: true
    }
  });
});

// Обработка текстовых сообщений (запросы рецептов)
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  if (text && !text.startsWith('/')) {
    // Открываем мини-приложение с запросом
    bot.sendMessage(chatId, `Ищу рецепты по запросу: "${text}"`, {
      reply_markup: {
        inline_keyboard: [[
          { 
            text: '🍳 Открыть рецепты', 
            web_app: { url: `${webAppUrl}?query=${encodeURIComponent(text)}` }
          }
        ]]
      }
    });
  }
});

// Обработка данных из мини-приложения
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app_data.data);
  
  if (data.type === 'cart_confirmed') {
    const products = data.products;
    let message = '🛒 Ваша корзина готова!\n\n';
    
    products.forEach((product, index) => {
      const searchUrl = `https://5ka.ru/search/?text=${encodeURIComponent(product.name)}`;
      message += `${index + 1}. [${product.name}](${searchUrl})\n`;
    });
    
    bot.sendMessage(chatId, message, { 
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    });
  }
});

console.log('Бот запущен!');
```

## 4. Интеграция с мини-приложением

В вашем React приложении добавьте:

```javascript
// Инициализация Telegram WebApp
useEffect(() => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    
    // Получение параметров из URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
      // Автоматический поиск по запросу из бота
      handleSearch(query);
    }
  }
}, []);

// Отправка данных обратно в бот
const sendToBot = (data) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.sendData(JSON.stringify(data));
    window.Telegram.WebApp.close();
  }
};
```

## 5. Настройка команд бота

В @BotFather отправьте `/setcommands` и добавьте:

```
start - Запустить бота
help - Помощь
recipes - Найти рецепты
```

## 6. Деплой

1. Разместите код бота на сервере (Heroku, VPS, и т.д.)
2. Опубликуйте мини-приложение через Lovable
3. Обновите URL в настройках бота

## 7. Тестирование

1. Найдите вашего бота в Telegram
2. Отправьте `/start`
3. Нажмите кнопку "Найти рецепты"
4. Протестируйте весь флоу: поиск → рецепт → корзина → ссылки

Готово! Ваш ИИ кулинарный бот готов к работе! 🚀