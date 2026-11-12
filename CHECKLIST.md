# Calm Oasis Spa — The $10K Checklist

Проверено 10 ноября 2026. Локальная версия через HTTP, Chrome.

## Что получилось

Русскоязычная концепция камерного городского спа в Москве. Название Calm Oasis Spa сохранено. Новый буквенный знак CO, фавикон, семь сгенерированных фотографий в согласованной палитре, локальная типографика Tenor Sans / Montserrat и пять доработанных страниц.

У сайта есть ясная задача: помочь сравнить процедуры и спокойно выбрать формат визита. Главная строится на фотографиях и тексте, а не на универсальном наборе карточек. На телефоне иначе организованы первый экран, строки услуг, форма и навигация. Стек остаётся HTML/CSS/JavaScript, без библиотек времени выполнения и сборщика.

Контакты, часы и адрес — часть вымышленного портфолио-концепта. Реального спа, подтверждённой записи и платежей сайт не представляет.

## Восемь пунктов исходного PDF

| Пункт                             | Решение                                                                                                                                                                                                                                                                                                                                                           | Результат                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1. Собственное направление        | Светлая городская среда, прохладный зелёный, фактура льна, человеческие жесты и выразительный русский текст. Нет декоративных glow/blur-кругов, стеклянных карточек, bento, орнаментальных номеров, водяных эффектов или курсора ради эффекта.                                                                                                                    | Выполнено                                                                               |
| 2. Работающая типографика         | Tenor Sans для крупных заголовков и Montserrat для чтения и интерфейса. Обе семьи локальны, кириллица сохранена в WOFF2. Размеры текста в rem, иерархия проверена при увеличении текста.                                                                                                                                                                          | Выполнено                                                                               |
| 3. Сдержанный цвет                | Основные цвета: #F7F8F5, #233F39, #35463F, #DEE8E1, #EAE9DF. Вспомогательные серо-зелёные тона служат подписям и разделителям.                                                                                                                                                                                                                                    | Выполнено                                                                               |
| 4. Иерархия и воздух              | Крупная фотография и короткое предложение на первом экране; дальше — подход, выбор, пространство, практические ответы и форма. Высоты текстовых блоков зависят от содержания.                                                                                                                                                                                     | Выполнено                                                                               |
| 5. Осмысленные изображения        | Семь новых кадров: гостья, процедура в одежде, уход за лицом, маникюр, интерьер, подготовка камней и подарок. Единая художественная подача, разные сюжеты, адаптивные WebP. Старые фотографии сохранены файлами и не используются в новой странице.                                                                                                               | Выполнено                                                                               |
| 6. Тонкое движение                | Подпись первого экрана, контекстная смена фото по выбору процедуры, прерываемые раскрытия описаний, отклик выбора в форме, открытие/закрытие меню и галереи. Один небольшой сдвиг фотографии пространства при прокрутке на компьютере. Без автосмены и повторяющегося fade-up. Учитывается prefers-reduced-motion; на сенсорном устройстве скролл-сдвиг отключён. | Выполнено                                                                               |
| 7. Отдельная мобильная композиция | Короткая ссылка записи и меню в шапке; фотография под текстом первого экрана; название процедуры отдельно, цена и длительность ниже; текстовые ответы без горизонтальных лент, вертикальная форма на маленьком экране.                                                                                                                                            | Выполнено в браузерной проверке                                                         |
| 8. Невидимое качество             | Семантические страницы, доступные формы и диалоги, keyboard focus, skip-link, title/description/Open Graph, локальные ресурсы. CLS 0, проверка контраста и сценариев пройдена.                                                                                                                                                                                    | Строгий порог менее 2 секунд на медленном профиле пока не достигнут; см. измерение ниже |

## Содержание и сценарии

- Переработаны index.html, services.html, thanks.html, privacy-policy.html, terms-conditions.html. Адреса разных стран и городов сведены к одной демонстрационной локации.
- Вместо противоречивых описаний и неподтверждённых отзывов — предметные тексты о формате визита, ощущениях, выборе и подготовке. Нет обещаний лечения, выдуманных наград, стажа или расписания свободных слотов.
- 18 процедур в трёх направлениях: тело, лицо, руки и стопы. Длительность, цена и название связаны через общий набор данных. Прежние направления, включая тайский массаж, аромамассаж, массаж стоп и подарочный запрос, представлены в новой структуре.
- Услуги раскрываются нативными details/summary. Без JavaScript описания остаются доступны, все 18 процедур показаны.
- Главная меняет иллюстрацию при открытии процедуры. При ошибке загрузки сохраняется предыдущее загруженное фото.
- Категории меню фильтруют направления. Кнопка выбора переносит услугу в форму; её название, время и цена появляются в сводке.
- Работает вход через URL с идентификатором процедуры, повторное редактирование выбора со страницы результата, помощь с выбором и подарочный сертификат.
- Поля имеют видимые подписи. Заполненный email и телефон проверяются после выхода из поля; ошибки исправленного поля убираются без повторной отправки. При отправке появляется связанная сводка обязательных ошибок.
- Форма не отправляет имя, email, телефон, дату или сообщение. В sessionStorage записывается только идентификатор процедуры для thanks.html. При запрете хранилища показано объяснение.
- Подарочный запрос не выпускает сертификат и не открывает оплату. Дата в форме — пожелание, а не подтверждённый слот. Эти ограничения видны рядом с формой.
- Навигация без JavaScript остаётся доступной; форма отключена и объясняет необходимость сценария. Личные данные не уходят обычным GET-запросом при отключении JS.
- Указатель мыши не оставляет внешнюю рамку; Tab сохраняет видимый фокус. Диалоги поддерживают Escape и возврат фокуса.

## Проверка

151 успешная проверка, 95 комбинаций страницы и ширины, пять аудитов axe-core.

Проверены ширины 320, 360, 375, 390, 400, 401, 480, 640, 760, 761, 768, 900, 960, 961, 1024, 1100, 1101, 1440 и 1920 px на каждой из пяти страниц. Горизонтального переполнения и обрезанного текста в проверке нет.

Дополнительно проверены:

- загрузка локальных шрифтов и отсутствие дубликатов id;
- все направления меню и количество доступных процедур;
- выбор услуги и подарочного запроса, предзаполнение через ссылку, возврат к выбранной услуге;
- раскрытия, быстрые повторные клики, режим уменьшения движения;
- галерея, Escape и возврат фокуса;
- мобильное меню и его закрытие при расширении окна; альбомная ориентация 844×390;
- email, необязательный телефон, обязательное согласие, сводка ошибок;
- отсутствие передачи и сохранения контактов при завершении сценария;
- отключённые сценарии и запрещённый sessionStorage;
- увеличение текста до 200% с дополнительными межбуквенными и межсловными интервалами на основных страницах;
- разбор HTML, 316 локальных ссылок/якорей/путей CSS, SVG XML, синтаксис собственного JavaScript, git diff --check.

axe-core с тегами WCAG 2 A/AA и 2.1 AA на всех пяти страницах: нарушений и пунктов incomplete не найдено. Это автоматическая проверка, не сертификат полной доступности.

Контраст базовых сочетаний: основной зелёный на белом 10,70:1; текст на белом 9,38:1; вторичный текст на светло-зелёном 5,27:1 и на бумажном фоне 5,42:1; белый на основном зелёном 10,70:1.

Визуально просмотрены первый экран и отдельные сцены на компьютере и телефоне, категории меню, мобильный диалог, форма и страница результата.

## Скорость и границы проверки

Холодная загрузка главной: Chrome, viewport 390×844, DPR 1, без кэша, локальный HTTP без сжатия ответов.

| Профиль                             | LCP    | Load event | CLS |
| ----------------------------------- | ------ | ---------- | --- |
| Локальная сеть                      | 0,41 с | 0,09 с     | 0   |
| 1,6 Мбит/с, задержка 150 мс, CPU ×4 | 2,20 с | 2,27 с     | 0   |

Передано около 144 КБ локальных ресурсов за замер, включая подгружаемый ближайший контент. Главная фотография имеет высокий приоритет и адаптивные источники; основные шрифты подготовлены локально; изображения ниже первого экрана загружаются отложенно. Анимация не задерживает показ главной фотографии.

Порог PDF «менее 2 секунд» на медленном профиле не закрыт. Условия будущего хостинга, сжатие, кэш и реальные устройства могут изменить результат. Физические iPhone/Android, Safari/Firefox, скорость на опубликованном домене и реальная отправка заявок не проверялись. Универсальная гарантия загрузки на любом устройстве не заявляется. Для настоящего бизнеса отдельно нужны реальные контакты, система записи и подходящие документы.

## Ресурсы и изображения

Новый CO-знак и фотографии созданы встроенным image_gen. Отдельная версия фавикона получила непрозрачную светлую подложку, чтобы знак читался и на тёмной вкладке. Для экспорта размеров и WebP использован Pillow; новые фотографии не подвергались программной перерисовке. Прозрачность исходного знака сохранена.

Корень готовых файлов: C:/Users/muzal/OneDrive/Desktop/ProjectsPortfolio/CalmOasisSpa/.

| Назначение                  | Файлы в проекте                       |
| --------------------------- | ------------------------------------- |
| Главный кадр                | img/spa-arrival-{480,800,1440}.webp   |
| Процедура в одежде          | img/spa-hands-{480,800,1440}.webp     |
| Уход за лицом               | img/spa-face-{480,800,1440}.webp      |
| Пространство                | img/spa-studio-{480,800,1440}.webp    |
| Подготовка камней           | img/spa-ritual-{480,800,1440}.webp    |
| Маникюр                     | img/spa-nails-{480,800,1440}.webp     |
| Подарок                     | img/spa-gift-{480,800,1440}.webp      |
| Буквенный знак              | img/brand-mark-{64,192,384}.png       |
| Фавикон и иконка устройства | favicon.png, img/apple-touch-icon.png |

Старые пользовательские фотографии и старый logo.png оставлены на месте. Исходные PNG генератора сохранены в его стандартном хранилище.

SVG-кнопки скачаны из официальной коллекции [Lucide](https://lucide.dev/); лицензия в img/lucide-LICENSE.txt. [Tenor Sans](https://github.com/google/fonts/tree/main/ofl/tenorsans) — fonts/TenorSans-OFL.txt; исходный Montserrat сохранён с fonts/OFL.txt. Для калибровки подачи и структуры просмотрены [Aesop](https://www.aesop.com/) и [THE WELL](https://www.the-well.com/). Их тексты и изображения не копировались.

## Финальные запросы генерации

Ниже — точные промпты финальных выбранных изображений. У фотографий и исходного знака режим generate; у фавикона — edit с исходным CO-знаком в роли референса.

### spa-arrival

Use case: photorealistic-natural. A commissioned editorial photograph for Calm Oasis Spa, a contemporary private urban spa. Realistic premium photography, quiet daylight, porcelain white, deep pine green, pale mineral green, brushed stainless steel and light ash wood. Architectural clarity, rich natural skin tones, tangible clean linen, no beige candlelit stock-spa styling, no black stones stacked with flowers, no lotus logo, no text, no watermark. Believable anatomy and hands. Adults only. Landscape 3:2. Spacious private treatment room with a wide frosted window at right, pale mineral-green walls and a simple ash-wood bench. A beautiful adult woman aged 28 with short dark hair wearing a fully closed light-green linen robe sits in a relaxed side pose near the window. A neatly made treatment bed with crisp white towels is visible at left, soft real daylight, editorial architectural photograph, generous breathing space but not empty. View from a doorway at human eye level; no candles, no jungle leaves.

### spa-hands

Use case: photorealistic-natural. Portrait 4:5 editorial photograph for Calm Oasis Spa. A professional woman therapist in a pale sage short-sleeve uniform stands behind a seated adult woman guest. The guest wears a completely closed ivory linen robe with long sleeves and full-length trousers. Both people are fully dressed. The therapist gently rests her two hands on the guest's clothed shoulders during a seated relaxation session. All contact is over clothing. Frame from their heads to the guest's knees, calm natural expressions, believable fingers and hands, clean modern room with pale mineral-green walls, soft window daylight, folded white towels on an ash-wood shelf. Premium realistic commissioned photography, no candles, no medical equipment, no writing or watermark.

### spa-face

Use case: photorealistic-natural. A commissioned editorial photograph for Calm Oasis Spa, a contemporary private urban spa. Realistic premium photography, quiet daylight, porcelain white, deep pine green, pale mineral green, brushed stainless steel and light ash wood. Architectural clarity, rich natural skin tones, tangible clean linen, no beige candlelit stock-spa styling, no black stones stacked with flowers, no lotus logo, no text, no watermark. Believable anatomy and hands. Adults only. Portrait 4:5. An adult woman with medium brown skin, eyes gently closed, dark hair wrapped in a white cotton towel, reclining during a gentle facial treatment. A woman therapist in pale green uniform carefully applies a plain cream mask with a small flat facial brush at the cheek. Clean professional spa scene, no medical devices or needles, face and hands fully framed, soft side daylight, realistic skin texture.

### spa-studio

Use case: photorealistic-natural. A commissioned editorial photograph for Calm Oasis Spa, a contemporary private urban spa. Realistic premium photography, quiet daylight, porcelain white, deep pine green, pale mineral green, brushed stainless steel and light ash wood. Architectural clarity, rich natural skin tones, tangible clean linen, no beige candlelit stock-spa styling, no black stones stacked with flowers, no lotus logo, no text, no watermark. Believable anatomy and hands. Adults only. Landscape 3:2. Beautiful contemporary urban spa relaxation lounge, view along a pale green tiled corridor toward a quiet sitting area with two sculptural oak chairs, folded white linen and ribbed glass panels. A brushed steel tray with a water carafe and two clear glasses. Soft directional daylight across large stone-colour floor tiles. Architectural magazine photograph, no people, no decorative foliage, no mist or fake glow, calm asymmetry and clean geometry.

### spa-ritual

Use case: photorealistic-natural. A commissioned editorial photograph for Calm Oasis Spa, a contemporary private urban spa. Realistic premium photography, quiet daylight, porcelain white, deep pine green, pale mineral green, brushed stainless steel and light ash wood. Architectural clarity, rich natural skin tones, tangible clean linen, no beige candlelit stock-spa styling, no black stones stacked with flowers, no lotus logo, no text, no watermark. Believable anatomy and hands. Adults only. Landscape 3:2. Tight editorial still life of one hand of a professional spa therapist holding a single smooth warm basalt massage stone above a shallow brushed-steel tray on folded white linen. Another two stones sit separately in the tray, not stacked. A clear plain glass bottle of massage oil beside it without a label. Real soft daylight, pale mineral-green surface, close focus on tactile materials and human gesture, no candles, no flowers, no mystical props.

### spa-nails

Use case: photorealistic-natural. A commissioned editorial photograph for Calm Oasis Spa, a contemporary private urban spa. Realistic premium photography, quiet daylight, porcelain white, deep pine green, pale mineral green, brushed stainless steel and light ash wood. Architectural clarity, rich natural skin tones, tangible clean linen, no beige candlelit stock-spa styling, no black stones stacked with flowers, no lotus logo, no text, no watermark. Believable anatomy and hands. Adults only. Portrait 4:5. Professional manicure at a refined modern spa. Two natural hands of a young adult woman with dark skin resting on a clean white linen cushion, a therapist in pale sage uniform gently files one fingernail with a plain professional nail file. Natural nude manicure, clean realistic fingers with five digits, a small brushed steel bowl at side, light ash table, softly lit by daylight, no bright colourful salon clutter, no text.

### spa-gift

Use case: photorealistic-natural. A commissioned editorial photograph for Calm Oasis Spa, a contemporary private urban spa. Realistic premium photography, quiet daylight, porcelain white, deep pine green, pale mineral green, brushed stainless steel and light ash wood. Architectural clarity, rich natural skin tones, tangible clean linen, no beige candlelit stock-spa styling, no black stones stacked with flowers, no lotus logo, no text, no watermark. Believable anatomy and hands. Adults only. Landscape 3:2. Refined editorial still life of a thick blank uncoated ivory folded card in a pale pine-green paper sleeve, resting on light ash wood next to folded white linen and one small brushed metal clip. Soft architectural daylight from left, crisp paper edges, restrained meaningful gift presentation for a contemporary urban spa, absolutely no lettering or logos, no ribbons, flowers or candles.

### spa-monogram

Use case: logo-brand. One bespoke typographic monogram made from the two uppercase Latin letters C and O, for Calm Oasis Spa. Deep pine green #233F39 solid flat ink on a transparent background. A sophisticated clear geometric sans-serif C and a slightly narrower O arranged as one compact carefully kerned lettermark, the C open at the right; both letters remain legible. Thick enough to read at 24 pixels. No lotus, leaf, flower, water drop, wave, circle border, illustration, texture, shadow, glow, gradients or additional text. Centered square composition, mark occupies about 80 percent of the canvas. Professional restrained graphic identity, transparent negative space.

### Favicon / app icon

Create a favicon and app icon from this exact Calm Oasis Spa CO monogram. Preserve the exact shapes, colour and relative arrangement of the C and O. Place it centred on a fully opaque flat porcelain-white #F7F8F5 square background, keeping about 10 percent clear margin on all sides around the mark. Enlarge the supplied mark within the square so it remains readable at very small tab sizes. No new letters, no border, no rounded corners, no shadow, no texture, no gradients. This is a technical brand-icon variant with a light background for visibility in both light and dark browser tabs.

## Точечные правки после просмотра

- Первый экран на десктопе рассчитывается по высоте окна с учётом хедера. Размер заголовка, отступы и высота фотографии адаптируются к высоте экрана; текст не обрезается, прокрутка остальной страницы сохранена. Проверены 1920×1080, 1440×900, 1366×768, 1280×720, 1024×768, 1440×700, 1280×600 и 961×600: нижняя граница hero совпадает с границей экрана.
- В блоке процедур главной страницы одновременно раскрыт один пункт. Проверены последовательное и быстрое переключение, клавиатура и режим уменьшенного движения. Анимация закрытия сохранена.
- Блок записи получил глубокий зелёный фон, а форма — отдельную светлую панель с акцентной верхней границей и собственным заголовком. Оформление одинаково на главной и странице процедур; на телефоне панель перестраивается в одну колонку.
- Повторно пройдены 151 основная проверка, 95 сочетаний страниц и ширин, пять аудитов доступности, а также 18 дополнительных проверок первого экрана и аккордеона. Ошибок приложения нет. Проверены синтаксис JavaScript и 316 локальных ссылок, путей и якорей.
