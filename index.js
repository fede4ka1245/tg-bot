import express from 'express';
import * as path from "path";
import TelegramBot from 'node-telegram-bot-api';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

app.listen(5000);

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

const inlineWebAppLink = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    one_time_keyboard: true,
                    type: 'web_app',
                    text: 'web app',
                    web_app: {
                        url: process.env.WEB_APP,
                    }
                }
            ],
        ],
    }
}

bot.on('web_app_data', (msg) => {
    const value = JSON.parse(msg.web_app_data?.data)?.value;
    const chatId = msg.chat.id;

    if (value === 'currentDeals') {
        bot.sendMessage(chatId, `Окей, смотри, что у нас есть тут компании :\n`, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Tanium',
                        callback_data: 'Tanium'
                    }],
                    [{
                        text: 'Byju',
                        callback_data: 'Byju'
                    }],
                    [{
                        text: 'Rappi',
                        callback_data: 'Rappi'
                    }],
                    [{
                        text: 'CarDekho',
                        callback_data: 'CarDekho'
                    }],
                ],
            },
            parse_mode: 'html',
        });
    } else if (value === 'navigationOnArchitecture') {
        bot.sendMessage(chatId, `У нас <u>ежемесячно</u> проводится множество мероприятий`, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Nexus Global Chanel',
                        callback_data: 'Nexus Global Chanel'
                    }],
                    [{
                        text: 'Nexus Club Member',
                        callback_data: 'Nexus Global Chanel'
                    }],
                    [{
                        text: 'Web 3.0',
                        callback_data: 'Nexus Global Chanel'
                    }],
                    [{
                        text: 'Правила комьюнити',
                        callback_data: 'Nexus Global Chanel'
                    }],
                ],
            },
            parse_mode: 'html',
        });
    } else if (value === 'members') {
        bot.sendMessage(chatId, `Хочешь узнать немного о проекте`, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'web 3.0',
                        callback_data: 'Nexus Global Chanel'
                    }],
                    [{
                        text: 'ai',
                        callback_data: 'Nexus Global Chanel'
                    }],
                    [{
                        text: 'cybersecurity',
                        callback_data: 'Nexus Global Chanel'
                    }],
                    [{
                        text: 'fintech',
                        callback_data: 'Nexus Global Chanel'
                    }],
                ],
            },
        });
    } else if (value === 'community') {
        bot.sendMessage(chatId, `Давай помогу тебе`, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Показать запрос',
                        callback_data: 'Nexus Global Chanel'
                    }],
                    [{
                        text: 'Создать запрос',
                        callback_data: 'Nexus Global Chanel'
                    }],
                ],
            },
        });
    } else if (value === 'invest') {
        bot.sendMessage(chatId, `Давай помогу тебе`, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'KYC процесс',
                        callback_data: 'Nexus Global Chanel'
                    }],
                    [{
                        text: 'Онбординг на Аллокейшенс',
                        callback_data: 'Nexus Global Chanel'
                    }],
                    [{
                        text: 'Отправка денег',
                        callback_data: 'Nexus Global Chanel'
                    }],
                    [{
                        text: 'Закрытие сделки',
                        callback_data: 'Nexus Global Chanel'
                    }],
                ],
            },
        });
    } else if (value === 'help') {
        bot.sendMessage(chatId, `Давай помогу тебе`, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Часто задаваемые вопросы',
                        callback_data: 'Nexus Global Chanel'
                    }],
                ],
            },
        });
    }
});

bot.setMyCommands([
    {
        command: '/show_web_app_button',
        description: 'показывает кнопку web app'
    }
])

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    bot.getChatMenuButton({
        chat_id: chatId,
    }).then(resp => {
        console.log(resp);
    })

    if (msg.text === '/start') {
        bot.sendMessage(chatId, `Добро пожаловать, ${msg.from.first_name}!\n\nЯ - <b>investBot</b>, создан для того, чтобы помочь Вам \n\n<i>Have a nice time </i>`, {
            parse_mode: 'html',
            ...inlineWebAppLink
        });
    } else if (msg.text === '/show_web_app_button') {
        bot.sendMessage(chatId, "Вы можете открыть web app", {
            parse_mode: 'html',
            ...inlineWebAppLink
        });
    }
});

bot.on('callback_query', async (cb) => {
    bot.editMessageReplyMarkup({inline_keyboard: []}, {
        chat_id: cb.message.chat.id,
        message_id: cb.message.message_id,
    })

    if (cb.data === 'Tanium') {
        await bot.sendPhoto(cb.message.chat.id, path.join(__dirname, "message_file/Tanium.png"))
        await bot.sendMessage(cb.message.chat.id, `
🌎 По мере того как COVID-19 распространился по всему миру и вынудил многие компании перейти на удалённую работу, потребность в кибербезопасности значительно возросла. Внедрение цифровых технологий стало уже не выбором, а необходимостью. Компании стремятся усилить меры защиты от хакеров и утечек данных. \n\n
Пандемия не только ускорила переход на цифровые технологии, но и стала катализатором глобального роста всей отрасли кибербезопасности. По данным аналитического агентства Gartner, расходы пользователей на рынок информационной безопасности прогнозируется в размере 207 миллиардов долларов к 2024 году.\n\n
📈 Глобальное венчурное финансирование отрасли кибербезопасности достигло небывалого максимума - 7,8 миллиардов долларов. На долю США пришлось 76% от инвестиций, где самыми активными инвесторами выступили Accel, Insight Partners, Techstars, Y Combinator (по данным Crunchbase).\n\n
Отрасль кибербезопасности находиться в фазе активного роста: увеличение количества кибератак (более 150 тысяч только в США), увеличение расходов пользователей на услуги безопасности, увеличение венчурного финансирования.\n\n
Quartz предлагает инвестировать в компанию Tanium - единая цифровая платформа для киберзащиты, контроля и управления полтитикой безопасности конечных устройств (серверов, виртуальных машин, персональных компьютеров) в крупных компаниях.\n\n
⭐️ Почему мы идём в эту сделку?\n\n
1️⃣ Tanium является лидером EDR решений. За счет уникальных ценностных предложений Tanium достиг устойчивого конкурентного преимущества в сегменте EDR для крупнейших клиентов. Конкуренты не смогли повторить функционал осуществления запросов на естественном языке для поиска данных среди сотен тысяч конечных устройств за 15 секунд и управление в режиме реального времени любыми настройками конечных устройств.\n\n
2️⃣ EV/Sales меньше 15 -> огромный потенциал для роста оценки компании (средний показатель для технологических компаний с подобными темпами роста ~ (40-45)\n Два ближайших аналога CrowrdStrike и SentinelOne торгуются в 2.5х и 4.3х раза дороже текущей оценки Tanium по мультипликатору EV/Sales 2021.\n\n
Tanium - прибыльная компания за счет чего должна торговаться с премией к убыточным публичным аналогам\n\n
3️⃣ Темпы роста выше 40%, при показателе Ebitda margin >10%. \n\n
4️⃣ IPO (4Q 2021 - 2Q 2022) Компания может стать публичной уже в течении 12 месяцев\n\n
Все подробности сделки можно узнать у @egquartzvc и @fdquartzvc или оставить заявку на почту info@quartzcapital.co.uk\n\n
📎Ниже прикреплены аналитические материалы о рынке кибербезопасности и компании Tanium.\n\n
        `, { parse_mode: 'html'});
        await bot.sendDocument(cb.message.chat.id, path.join(__dirname, "message_file/Tanium.pdf"))
    } else if (cb.data === 'Byju') {
        await bot.sendPhoto(cb.message.chat.id, path.join(__dirname, "message_file/Byju.png"))
        await bot.sendMessage(cb.message.chat.id, `
Уважаемые партнёры мы рады предоставить вам новую инвестиционную возможность - компанию Byju’s по очень привлекательной цене. \n Мы инвестируем в компанию Byju’s по оценке $12.25B (это дисконт 26% к раунду, который компания только что подняла от Blackstone и UBS Group). \nhttps://techcrunch.com/2021/06/12/ubs-investment-makes-byjus-the-most-valuable-startup-in-india/ \n\n
Edtech giant Byju’s has become the most valuable startup in India after raising about $350 million in a new tranche of investment from UBS Group and Zoom founder Eric Yuan, Blackstone and others that valued the Bangalore-based firm at $16.5 billion (post-money).\n\n"
Фактически компания уже сейчас стоит на 35% дороже чем мы покупаем.\nНиже основная информация и презентация по сделке\n\n
Индия становится новым технологическим хабом, за последние года была создана инфраструктура благодаря которой использование интернета и онлайн платежей стало доступно не только жителям крупных городов, но и для жителей сельской местности.\nВсе больше инвесторов из США и Европы приходят на рынок Индии, свои отдельные индийские «команды» имеют Accel, Sequoia Capital, Bessemer Venture Partners, Tiger Global, Lightspeed и другие.\n\n
Byju’s- крупнейший EdTech индии с выручкой > $1B. Byuj’s растет сумасшедшими  темпами (168% YoY), а также уже имеет положительную EBITDA в FY 2021 г.\n Коэффициент EV/Sales, NTM - 6.58, для примера у Coursera данный показатель = 12, при темпах роста выручки в 3 раза меньше => компания имеет огромный потенциал роста.\n\n
Условия:\n
Оценка: $12.25B\n
Минимальная сумма инвестиций: $25 000\n
Дисконт к текущим раунду: 26% \n
Тип акций: Комманы \n
Структура владения: напрямую в каптейбле
        `, { parse_mode: 'html'})
        await bot.sendDocument(cb.message.chat.id, path.join(__dirname, "message_file/Byju.pdf"))
    } else if (cb.data === 'Rappi') {
        await bot.sendPhoto(cb.message.chat.id, path.join(__dirname, "message_file/Rappi.png"))
        await bot.sendMessage(cb.message.chat.id, `
🚀Quartz предлагает инвестировать в компанию Rappi - лидирующий Super App в Латинской Америке. Приложение Rappi представлено практически во всех вертикалях: доставка еды из ресторанов, доставка продуктов и алкоголя из супермаркетов, доставка медикаментов, e-commerce маркетплейс, покупка билетов на самолеты и поезда, бронирование гостиниц, стриминг, музыка, видеоигры.\n\n'
⭐️Почему мы идём в эту сделку?\n\n'
1️⃣ Rappi - единственный superapp в LATAM. Другие игроки региона не выходят за пределы рынков доставки.\n\n'
2️⃣ Метрики удержания клиентов Rappi в несколько раз лучше международных аналогов. В среднем каждый клиент на 5-ый год использования платформы тратит в 11 раз больше, чем в первый год (с учетом клиентов, которые перестали пользоваться сервисом). Конвертация MAU в DAU - 33% (при среднем значении по отрасли - 8%).\n\n
3️⃣ Ключевые конкуренты Rappi - международные Uber/Glovo/Delivery Hero, которые проиграли рынки Китая (лидер - Meituan), Индии (лидер - Zomato), России (лидер - Яндекс), Индонезии (лидер - GoJek). Мы считаем, что локальный игрок (Rappi) выиграет рынок и в LATAM за счет лучшего понимания клиента и его потребностей.\n\n
4️⃣ Rappi развивает финансовые сервисы в партнерстве с местными банками на 3 ключевых рынках - Мексика, Колумбия, Бразилии. Сейчас Rappi создает собственную платежную инфраструктуру (для снижения костов на обработку платежей), а также выпускает карты с 3% кэшбэком, который можно потратить на сервисы Rappi (рост лояльности). Кредитные карты - крайне маржинальный бизнес в LATAM (заемщики платят более 100% APY), благодаря использованию данных Rappi о клиенте возможна минимизация default rate.\n\n
5️⃣ На текущий момент компания оценивается в 9 выручек 2020 года, если брать показатель EV/sales 2021, то показатель равен 5,97. Публичные аналоги (DoorDash, Zomato идр) торгуются в с редеем с показателем 15-20 EV/Sales. Rappi растет темпами значительно быстрее конкурентов, а эффективная экономика доставки позволяет Rappi сохранят более высокую маржинальность. По нашему мнению Rappi должен торговаться с премией по мультипликаторам к основным конкурентам. Мы ожидаем возврат на инвестиции 2-4x к 1-2Q 2023 года.\n\n
Все подробности сделки можно узнать у\n
📎 @egquartzvc \n
📎 @fdquartzvc\n\n
Или оставить заявку на почту\n
✉️ info@quartzcapital.co.uk\n\n
📌 Ниже прикреплены аналитические материалы о компании Rappi.
        `, { parse_mode: 'html'})
        await bot.sendDocument(cb.message.chat.id, path.join(__dirname, "message_file/Rappi.pdf"))
    } else if (cb.data === 'CarDekho') {
        await bot.sendPhoto(cb.message.chat.id, path.join(__dirname, "message_file/Tanium.png"))
        bot.sendMessage(cb.message.chat.id, `
🔥Quartz представляет новое инвестиционное предложение\n\n'
🚗 Компания CarDekho - горизонтально интегрированный онлайн-маркетплейс автомобилей, мотоциклов и\nфинансовых услуг (автострахование и кредитование).\n\n'
📌 Cardekho объединяет несколько вертикалей на одной платформе: лидогенератор для дилеров и производителей новых автомобилей, перепродажа подержанных автомобилей, продажа страховок по модели B2B2C и лидогенерация для банков (Cardekho не несет страховой/кредитный риски)\n\n'
Ключевые драйверы роста:\n\n
1️⃣ Объем рынка подержанных авто в Индии в 2020 - $20b, прогнозируется к росту до $59B в 2025. Ключевая проблема - низкая доступность автокредитов. Всего 17% покупок финансируется за счет кредитных денег в Индии. В развитых странах 75%+, в РФ ±50%. Рост доступности кредитов (в том числе, за счет данных Cardekho) хотя бы до 40%-50% (средний прогноз по рынку к 2023/24) -> рост рынка автомобилей два раза.\n\n'
2️⃣ Улучшение юнит-экономики всех вертикалей за счет экосистемы сервисов. Cardekho - единственный мультивертикальный онлайн маркетплейсавтомобилей. Конкуренты - либо лидогенераторы для дилеров (Cartrade/Carwhale) либо онлайн дилеры, которые покупают себе на баланс и продают с наценкой (cars24, spinny). Cardekho - единственный кто выступает и как лидогенератор с огромным объемом пользовательского контента (оценки,отзывы) и как онлайн дилер подержанных автомобилей, а также допродает финансовые сервисы (страховка, кредиты) -> снижение CAC, улучшение юнит экономики по сравнению с конкурентами, сетевой эффект (сорсинг demand/supply из собственной экосистемы).\n\n'
3️⃣ Крайне низкий уровень проникновения автомобилей в Индии: меньше 30 машин на 1,000 человек. В странах SEA 78, в Китае 200, в США 800. Индия сегодня – это Китай в 2006 году. Аналитики ожидают рост авторынка в Индии до $216b в 2025.\n\n'
4️⃣ Выход из пандемии – драйвер роста спроса на поддержанные автомобили (избегание публичного транспорта, проблемы с поставкой новых автомобилей, отложенный спрос)\n\n
Вы можете получить аналитическую презентацию, перейдя по ссылке (https://docsend.com/view/rjxfw78f5pqv6k9d)\n\n
Оставить заявку на почту\n
✉️ info@quartzcapital.co.uk
        `, { parse_mode: 'html'})
    }
});
