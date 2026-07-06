import React, { createContext, useContext, useState, useEffect } from "react";

const LangCtx = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const s = localStorage.getItem("tarlabazar_lang");
      if (s === "ru" || s === "en" || s === "az") return s;
    } catch {}
    return "ru";
  });
  useEffect(() => {
    try { localStorage.setItem("tarlabazar_lang", lang); } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}
export function useLang() {
  const ctx = useContext(LangCtx);
  return ctx || { lang: "ru", setLang: () => {} };
}

export const DICT = {
  /* ---------- общее / навигация ---------- */
  brand:        { ru: "TarlaBazar",                    en: "TarlaBazar",                   az: "TarlaBazar" },
  tagline:      { ru: "От поля до покупателя, напрямую",en: "From field to buyer, directly",az: "Tarladan alıcıya, birbaşa" },
  nav_catalog:  { ru: "Каталог",                       en: "Catalogue",                    az: "Kataloq" },
  nav_new:      { ru: "Разместить лот",                en: "Post a lot",                   az: "Lot yerləşdir" },
  nav_how:      { ru: "Как это работает",              en: "How it works",                 az: "Necə işləyir" },
  nav_halal:    { ru: "Как защищена сделка",           en: "Deal protection",              az: "Sövdələşmənin qorunması" },
  nav_deals:    { ru: "Мои заявки",                    en: "My requests",                  az: "Sorğularım" },
  nav_home:     { ru: "Главная",                       en: "Home",                         az: "Ana səhifə" },

  /* ---------- HERO ---------- */
  hero_eyebrow: { ru: "Прямой рынок · без цепочки посредников",
                  en: "Direct market · no chain of middlemen",
                  az: "Birbaşa bazar · vasitəçi zənciri olmadan" },
  hero_h:       { ru: "Фермер и покупатель\nвстречаются напрямую",
                  en: "Farmer and buyer\nmeet directly",
                  az: "Fermer və alıcı\nbirbaşa görüşür" },
  hero_p:       { ru: "Мелкие и средние хозяйства продают свой реальный, уже собранный урожай напрямую магазинам, ресторанам и переработчикам. Без цепочки перекупщиков, которая поднимает цену в 2–3 раза. Каждый лот — с ясным объёмом, ценой и сортом качества. Оплата проходит через банк-партнёр и держится как залог до получения товара.",
                  en: "Small and mid-sized farms sell their real, already-harvested produce directly to shops, restaurants and processors. Without the chain of resellers that inflates the price 2–3 times. Every lot has a clear volume, price and quality grade. Payment goes through a partner bank and is held in trust until the goods are received.",
                  az: "Kiçik və orta təsərrüfatlar öz real, artıq yığılmış məhsulunu birbaşa mağazalara, restoranlara və emalçılara satır. Qiyməti 2–3 dəfə qaldıran vasitəçi zənciri olmadan. Hər lotun aydın həcmi, qiyməti və keyfiyyət dərəcəsi var. Ödəniş tərəfdaş bank vasitəsilə keçir və mal alınana qədər əmanət kimi saxlanılır." },
  hero_cta_buy: { ru: "Смотреть каталог",               en: "Browse the catalogue",         az: "Kataloqa bax" },
  hero_cta_sell:{ ru: "Разместить свой лот",            en: "Post your lot",                az: "Öz lotunu yerləşdir" },

  hero_stat1_l: { ru: "Наценка посредников",            en: "Reseller markup",              az: "Vasitəçi əlavəsi" },
  hero_stat1_v: { ru: "×2–3",                           en: "×2–3",                         az: "×2–3" },
  hero_stat2_l: { ru: "Комиссия платформы",             en: "Platform fee",                 az: "Platforma komissiyası" },
  hero_stat2_v: { ru: "2–3%",                           en: "2–3%",                         az: "2–3%" },
  hero_stat3_l: { ru: "Скрытые наценки",                en: "Hidden markups",               az: "Gizli əlavələr" },
  hero_stat3_v: { ru: "0",                              en: "0",                            az: "0" },

  /* ---------- ПРОБЛЕМА ---------- */
  prob_eyebrow: { ru: "Проблема",                       en: "Problem",                      az: "Problem" },
  prob_h:       { ru: "Между полем и прилавком стоит 3–4 перекупщика",
                  en: "3–4 resellers stand between the field and the shelf",
                  az: "Tarla ilə piştaxta arasında 3–4 vasitəçi dayanır" },
  prob_p:       { ru: "Фермер в регионе продаёт яблоки по 0,40 маната за килограмм, а в столице их покупают по 1,40–1,60. Разницу забирает цепочка посредников. Мелкое хозяйство с полутора гектарами не может само выйти на сеть — объём слишком мал, а логистика в одиночку слишком дорога. В итоге либо продают за бесценок перекупщику, либо урожай гниёт в поле.",
                  en: "A farmer in the regions sells apples at 0.40 manat per kilo; in the capital they cost 1.40–1.60. The difference is taken by the chain of middlemen. A small farm with a hectare and a half can't reach a retail chain alone — the volume is too small and solo logistics too expensive. So they either sell for a pittance to a reseller, or the harvest rots in the field.",
                  az: "Bölgədəki fermer almanı kiloqramı 0,40 manata satır, paytaxtda isə onu 1,40–1,60-a alırlar. Fərqi vasitəçi zənciri götürür. Bir yarım hektarlıq kiçik təsərrüfat şəbəkəyə tək çıxa bilmir — həcm çox kiçik, tək logistika isə çox bahadır. Nəticədə ya vasitəçiyə dəyər-dəyməzinə satırlar, ya da məhsul tarlada çürüyür." },

  /* ---------- КАК РАБОТАЕТ (3 шага) ---------- */
  how_eyebrow:  { ru: "Как это работает",               en: "How it works",                 az: "Necə işləyir" },
  how_h:        { ru: "Три шага от лота до оплаты",     en: "Three steps from lot to payment",az: "Lotdan ödənişə üç addım" },
  how1_h:       { ru: "Фермер размещает лот",           en: "The farmer posts a lot",       az: "Fermer lot yerləşdirir" },
  how1_p:       { ru: "Указывает культуру, реальный объём собранного урожая, цену за килограмм, сорт качества и регион. Лот виден покупателям сразу.",
                  en: "Specifies the crop, the real harvested volume, the price per kilo, the quality grade and the region. The lot is visible to buyers immediately.",
                  az: "Məhsulu, yığılmış real həcmi, kiloqram başına qiyməti, keyfiyyət dərəcəsini və bölgəni göstərir. Lot dərhal alıcılara görünür." },
  how2_h:       { ru: "Покупатель отправляет заявку",   en: "The buyer sends a request",    az: "Alıcı sorğu göndərir" },
  how2_p:       { ru: "Магазин, ресторан или завод выбирает лот и подаёт заявку на нужный объём. Стороны видят условия и договариваются напрямую, без цепочки посредников.",
                  en: "A shop, restaurant or plant picks a lot and requests the volume it needs. Both sides see the terms and agree directly, with no chain of middlemen.",
                  az: "Mağaza, restoran və ya zavod lot seçib lazım olan həcmə sorğu verir. Tərəflər şərtləri görür və vasitəçi zənciri olmadan birbaşa razılaşır." },
  how3_h:       { ru: "Оплата через банк-партнёр",      en: "Payment via partner bank",     az: "Tərəfdaş bank vasitəsilə ödəniş" },
  how3_p:       { ru: "Покупатель вносит оплату на счёт банка-партнёра. Деньги держатся как залог. Когда покупатель подтверждает получение товара, банк переводит сумму фермеру, а платформа берёт свою комиссию за услугу. Никакого процента.",
                  en: "The buyer pays into the partner bank's account. The money is held in trust. When the buyer confirms receipt of the goods, the bank transfers the sum to the farmer and the platform takes its service fee. No interest.",
                  az: "Alıcı tərəfdaş bankın hesabına ödəyir. Pul əmanət kimi saxlanılır. Alıcı malın alındığını təsdiqləyəndə bank məbləği fermerə köçürür, platforma isə xidmət komissiyasını götürür. Heç bir faiz yoxdur." },

  /* ---------- ПОЧЕМУ ТАК УСТРОЕНО (5 принципов защиты сделки) ---------- */
  halal_eyebrow:{ ru: "Как защищена сделка",            en: "How the deal is protected",    az: "Sövdələşmə necə qorunur" },
  halal_h:      { ru: "Пять решений, встроенных в саму платформу",
                  en: "Five decisions built into the platform itself",
                  az: "Platformanın özünə qurulmuş beş qərar" },
  halal_p:      { ru: "Каждое решение убирает конкретный риск, на котором обычный покупатель или продавец теряет деньги. Это не правила поверх площадки, а её устройство.",
                  en: "Each decision removes a specific risk on which an ordinary buyer or seller loses money. These aren't rules on top of the platform — they are its design.",
                  az: "Hər qərar adi alıcının və ya satıcının pul itirdiyi konkret riski aradan qaldırır. Bunlar platformanın üstündəki qaydalar deyil, onun quruluşudur." },

  halal1_h:     { ru: "Продаётся только реальный товар",en: "Only real goods are sold",     az: "Yalnız real mal satılır" },
  halal1_p:     { ru: "Фермер продаёт урожай, который у него физически есть и уже собран. Платформа никогда не владеет товаром и не перепродаёт его. Покупатель не платит за то, что существует только на бумаге, — на площадке нет перепродажи чужого несуществующего товара и цепочек, где никто не отвечает за наличие.",
                  en: "The farmer sells produce he physically has and has already harvested. The platform never owns the goods and never resells them. The buyer doesn't pay for something that exists only on paper — there is no reselling of someone else's non-existent goods and no chains where no one is responsible for availability.",
                  az: "Fermer fiziki olaraq sahib olduğu və artıq yığdığı məhsulu satır. Platforma heç vaxt mala sahib olmur və onu yenidən satmır. Alıcı yalnız kağızda mövcud olan şeyə görə ödəmir — burada başqasının mövcud olmayan malının yenidən satışı və heç kimin mövcudluğa cavab vermədiyi zəncirlər yoxdur." },

  halal2_h:     { ru: "Прозрачная комиссия вместо скрытой наценки",en: "Transparent fee instead of a hidden markup",az: "Gizli əlavə əvəzinə şəffaf komissiya" },
  halal2_p:     { ru: "Платформа берёт 2–3% за конкретную услугу: свести стороны, проверить качество, помочь с логистикой. Комиссия видна отдельной строкой и не зависит от суммы займа или отсрочки, потому что займов и рассрочки с наценкой на площадке нет. Ты платишь за услугу, а не за доступ к деньгам.",
                  en: "The platform takes 2–3% for a concrete service: connecting the parties, verifying quality, helping with logistics. The fee is shown as a separate line and doesn't depend on any loan amount or deferral, because there are no loans or marked-up instalments on the platform. You pay for a service, not for access to money.",
                  az: "Platforma konkret xidmət üçün 2–3% götürür: tərəfləri birləşdirmək, keyfiyyəti yoxlamaq, logistikaya kömək etmək. Komissiya ayrıca sətirdə göstərilir və heç bir borc məbləğindən və ya təxirdən asılı deyil, çünki burada borc və əlavəli hissə-hissə ödəniş yoxdur. Sən pula çıxış üçün yox, xidmət üçün ödəyirsən." },

  halal3_h:     { ru: "Каждый лот — с ясными условиями",en: "Every lot has clear terms",    az: "Hər lotun aydın şərtləri var" },
  halal3_p:     { ru: "Культура, объём, цена за килограмм и сорт качества указаны прямо. Покупатель точно знает, что берёт, ещё до заявки. Это убирает неопределённость сделки, на которой обычно и происходят споры о цене. Качество измеримо и прозрачно, а не «на глаз перекупщика».",
                  en: "Crop, volume, price per kilo and quality grade are stated plainly. The buyer knows exactly what he is getting before even requesting. This removes the uncertainty on which price disputes usually happen. Quality is measurable and transparent, not \"by the reseller's eye\".",
                  az: "Məhsul, həcm, kiloqram başına qiymət və keyfiyyət dərəcəsi açıq göstərilir. Alıcı sorğudan əvvəl nə aldığını dəqiq bilir. Bu, adətən qiymət mübahisələrinin baş verdiyi qeyri-müəyyənliyi aradan qaldırır. Keyfiyyət ölçülə bilən və şəffafdır, \"vasitəçinin gözü ilə\" deyil." },

  halal4_h:     { ru: "Только собранный урожай",        en: "Only harvested produce",       az: "Yalnız yığılmış məhsul" },
  halal4_p:     { ru: "На площадке продаётся то, что уже собрано и наличествует. Нельзя выставить будущий урожай, которого ещё нет на земле, — покупатель не берёт на себя риск чужого неурожая и не платит вперёд за то, что может не вырасти. Никакого «кота в мешке».",
                  en: "The platform sells what is already harvested and on hand. You cannot list a future harvest that isn't yet on the ground — the buyer doesn't take on the risk of someone else's crop failure and doesn't pay in advance for something that may not grow. No \"pig in a poke\".",
                  az: "Platformada artıq yığılmış və mövcud olan satılır. Hələ torpaqda olmayan gələcək məhsulu qoymaq olmaz — alıcı başqasının məhsul itkisi riskini öz üzərinə götürmür və böyüməyə bilən şeyə görə əvvəlcədən ödəmir. \"Kisədə pişik\" yoxdur." },

  halal5_h:     { ru: "Безопасная оплата через банк",   en: "Safe payment via the bank",    az: "Bank vasitəsilə təhlükəsiz ödəniş" },
  halal5_p:     { ru: "Оплата замораживается у банка-партнёра как залог до получения товара и переводится фермеру только после подтверждения. Платформа не держит чужие деньги у себя. Фермер уверен, что получит оплату, покупатель — что не заплатит вперёд впустую. Это решает главную боль села — «отгрузил, а денег не увидел».",
                  en: "Payment is frozen with the partner bank as a deposit until the goods are received, and transferred to the farmer only after confirmation. The platform doesn't hold others' money itself. The farmer is sure he'll be paid, the buyer sure he won't pay in advance for nothing. This solves the main rural pain — \"shipped, but never saw the money\".",
                  az: "Ödəniş mal alınana qədər tərəfdaş bankda əmanət kimi dondurulur və yalnız təsdiqdən sonra fermerə köçürülür. Platforma başqasının pulunu özündə saxlamır. Fermer ödəniş alacağına, alıcı boş yerə əvvəlcədən ödəməyəcəyinə əmindir. Bu, kəndin əsas ağrısını həll edir — \"göndərdim, amma pulu görmədim\"." },

  halal_note:   { ru: "За каждым из этих решений стоит реальный провал: международные агро-платформы разорялись именно там, где брали на себя чужой риск — выдавали займы, скупали товар на склад, платили вперёд. Площадка, которая не рискует чужими деньгами и чужим товаром, устойчивее по определению.",
                  en: "Behind each of these decisions is a real failure: international agri-platforms went bankrupt exactly where they took on someone else's risk — issuing loans, buying goods into warehouses, paying in advance. A platform that doesn't gamble with others' money and others' goods is more resilient by definition.",
                  az: "Bu qərarların hər birinin arxasında real uğursuzluq dayanır: beynəlxalq aqro-platformalar məhz başqasının riskini öz üzərinə götürdükləri yerdə iflasa uğradı — borc verdilər, malı anbara aldılar, əvvəlcədən ödədilər. Başqasının pulu və malı ilə risk etməyən platforma tərifə görə daha dayanıqlıdır." },

  /* ---------- ПРОМО-ВИДЕО ---------- */
  vid_eyebrow:  { ru: "Промо",                          en: "Promo",                        az: "Promo" },
  vid_h:        { ru: "Как работает площадка",          en: "How the platform works",       az: "Platforma necə işləyir" },
  vid_p:        { ru: "Короткий обзор: от размещения лота фермером до оплаты через банк.",
                  en: "A short overview: from the farmer posting a lot to payment via the bank.",
                  az: "Qısa icmal: fermerin lot yerləşdirməsindən bank vasitəsilə ödənişə qədər." },
  vid_placeholder_h:{ ru: "Место для промо-ролика",     en: "Promo video placeholder",      az: "Promo video yeri" },
  vid_placeholder_p:{ ru: "Вставь ID ролика с YouTube в переменную YT_ID в начале файла Landing.jsx — и здесь появится видео.",
                  en: "Set your YouTube video ID in the YT_ID variable at the top of Landing.jsx and the video will appear here.",
                  az: "YouTube video ID-ni Landing.jsx faylının əvvəlindəki YT_ID dəyişəninə yaz — və burada video görünəcək." },
  vid_watch:    { ru: "Смотреть промо",                 en: "Watch promo",                  az: "Promonu izlə" },

  /* ---------- ПРЕЗЕНТАЦИЯ ---------- */
  deck_nav:     { ru: "Презентация",                    en: "Deck",                         az: "Təqdimat" },
  deck_eyebrow: { ru: "Презентация",                    en: "Deck",                         az: "Təqdimat" },
  deck_h:       { ru: "Полный обзор в одном файле",     en: "The full overview in one file",az: "Tam icmal bir faylda" },
  deck_p:       { ru: "Проблема, как устроена площадка, защита сделки и рынок — в одной PDF-презентации для инвестора или партнёра.",
                  en: "Problem, how the platform works, deal protection and market — in one PDF deck for an investor or partner.",
                  az: "Problem, platformanın quruluşu, sövdələşmənin qorunması və bazar — investor və ya tərəfdaş üçün bir PDF təqdimatında." },
  deck_btn:     { ru: "Скачать презентацию (PDF)",      en: "Download deck (PDF)",          az: "Təqdimatı yüklə (PDF)" },

  /* ---------- CTA ---------- */
  final_h:      { ru: "Начни продавать или покупать напрямую",
                  en: "Start selling or buying directly",
                  az: "Birbaşa satmağa və ya almağa başla" },
  final_p:      { ru: "Каталог открыт сразу. Размести свой лот или найди нужный урожай без посредников.",
                  en: "The catalogue is open right away. Post your lot or find the produce you need without middlemen.",
                  az: "Kataloq dərhal açıqdır. Öz lotunu yerləşdir və ya vasitəçisiz lazımi məhsulu tap." },
  foot:         { ru: "Прямой рынок от поля до покупателя · без посредников · RU / EN / AZ",
                  en: "Direct market from field to buyer · no middlemen · RU / EN / AZ",
                  az: "Tarladan alıcıya birbaşa bazar · vasitəçisiz · RU / EN / AZ" },

  /* ================= КАТАЛОГ ================= */
  cat_title:    { ru: "Каталог лотов",                  en: "Lot catalogue",                az: "Lot kataloqu" },
  cat_sub:      { ru: "Реальные предложения от фермеров. Наличный собранный урожай.",
                  en: "Real offers from farmers. Harvested produce on hand.",
                  az: "Fermerlərdən real təkliflər. Yığılmış mövcud məhsul." },
  cat_filter_crop:{ ru: "Культура",                     en: "Crop",                         az: "Məhsul" },
  cat_filter_region:{ ru: "Регион",                     en: "Region",                       az: "Bölgə" },
  cat_filter_grade:{ ru: "Сорт",                        en: "Grade",                        az: "Dərəcə" },
  cat_filter_all:{ ru: "Все",                           en: "All",                          az: "Hamısı" },
  cat_empty_h:  { ru: "Пока ни одного лота",            en: "No lots yet",                  az: "Hələ heç bir lot yoxdur" },
  cat_empty_p:  { ru: "Каталог наполняется реальными предложениями фермеров. Здесь появятся лоты, как только их разместят. Хочешь быть первым — размести свой лот.",
                  en: "The catalogue fills with real farmer offers. Lots will appear here as soon as they are posted. Want to be first — post your lot.",
                  az: "Kataloq fermerlərin real təklifləri ilə dolur. Lotlar yerləşdirilən kimi burada görünəcək. Birinci olmaq istəyirsən — öz lotunu yerləşdir." },
  cat_empty_btn:{ ru: "Разместить первый лот",          en: "Post the first lot",           az: "İlk lotu yerləşdir" },
  cat_count:    { ru: "лотов",                          en: "lots",                         az: "lot" },
  cat_demo_hint:{ ru: "Это рабочий каркас: размещённые лоты сохраняются в твоём браузере. На боевом сервере они будут видны всем.",
                  en: "This is a working skeleton: posted lots are saved in your browser. On a live server they'll be visible to everyone.",
                  az: "Bu işlək karkasdır: yerləşdirilən lotlar brauzerində saxlanılır. Canlı serverdə onlar hamıya görünəcək." },

  /* карточка лота */
  card_per_kg:  { ru: "за кг",                          en: "per kg",                       az: "kq üçün" },
  card_available:{ ru: "Доступно",                      en: "Available",                    az: "Mövcud" },
  card_view:    { ru: "Открыть лот",                    en: "Open lot",                     az: "Lotu aç" },
  card_grade:   { ru: "Сорт",                           en: "Grade",                        az: "Dərəcə" },

  /* ================= РАЗМЕЩЕНИЕ ЛОТА ================= */
  new_title:    { ru: "Разместить лот",                 en: "Post a lot",                   az: "Lot yerləşdir" },
  new_sub:      { ru: "Только реальный, уже собранный урожай. Укажи ясные условия — покупатель должен точно знать, что берёт.",
                  en: "Only real, already-harvested produce. State clear terms — the buyer must know exactly what he's getting.",
                  az: "Yalnız real, artıq yığılmış məhsul. Aydın şərtlər göstər — alıcı nə aldığını dəqiq bilməlidir." },
  new_farm:     { ru: "Название хозяйства или имя",     en: "Farm or your name",            az: "Təsərrüfatın adı və ya adın" },
  new_farm_ph:  { ru: "Напр.: Хозяйство Мамедова, Губа",en: "e.g. Mammadov Farm, Quba",     az: "Məs.: Məmmədov Təsərrüfatı, Quba" },
  new_crop:     { ru: "Культура",                       en: "Crop",                         az: "Məhsul" },
  new_region:   { ru: "Регион",                         en: "Region",                       az: "Bölgə" },
  new_volume:   { ru: "Объём в наличии, кг",            en: "Volume on hand, kg",           az: "Mövcud həcm, kq" },
  new_price:    { ru: "Цена за кг, ₼",                  en: "Price per kg, ₼",              az: "Kq üçün qiymət, ₼" },
  new_grade:    { ru: "Сорт качества",                  en: "Quality grade",                az: "Keyfiyyət dərəcəsi" },
  new_grade_hint:{ ru: "Сорт можно определить в первом инструменте — AgroLens — по фотографии.",
                  en: "The grade can be determined in the first tool — AgroLens — from a photo.",
                  az: "Dərəcəni birinci alətdə — AgroLens — şəkildən müəyyən etmək olar." },
  new_harvested:{ ru: "Подтверждаю: урожай уже собран и физически в наличии",
                  en: "I confirm: the harvest is already gathered and physically on hand",
                  az: "Təsdiq edirəm: məhsul artıq yığılıb və fiziki olaraq mövcuddur" },
  new_harvested_req:{ ru: "Это обязательное условие. Платформа не размещает продажу несобранного урожая.",
                  en: "This is a required condition. The platform does not list sales of unharvested produce.",
                  az: "Bu, məcburi şərtdir. Platforma yığılmamış məhsulun satışını yerləşdirmir." },
  new_note:     { ru: "Описание (необязательно)",       en: "Description (optional)",       az: "Təsvir (istəyə bağlı)" },
  new_note_ph:  { ru: "Условия самовывоза, упаковка, готовность к отгрузке…",
                  en: "Pickup terms, packaging, readiness to ship…",
                  az: "Özü götürmə şərtləri, qablaşdırma, göndərişə hazırlıq…" },
  new_submit:   { ru: "Опубликовать лот",               en: "Publish the lot",              az: "Lotu dərc et" },
  new_published:{ ru: "Лот опубликован",                en: "Lot published",                az: "Lot dərc edildi" },
  new_err_fill: { ru: "Заполни культуру, объём и цену", en: "Fill in crop, volume and price",az: "Məhsul, həcm və qiyməti doldur" },
  new_err_harvest:{ ru: "Отметь подтверждение, что урожай собран",
                  en: "Tick the confirmation that the harvest is gathered",
                  az: "Məhsulun yığıldığını təsdiqləyən qeydi işarələ" },

  /* ================= ЛОТ (детали) ================= */
  lot_back:     { ru: "К каталогу",                     en: "Back to catalogue",            az: "Kataloqa qayıt" },
  lot_notfound: { ru: "Лот не найден",                  en: "Lot not found",                az: "Lot tapılmadı" },
  lot_notfound_p:{ ru: "Возможно, лот удалён или ссылка устарела.",
                  en: "The lot may have been removed or the link is outdated.",
                  az: "Lot silinmiş və ya keçid köhnəlmiş ola bilər." },
  lot_volume:   { ru: "Объём в наличии",                en: "Volume on hand",               az: "Mövcud həcm" },
  lot_price:    { ru: "Цена за кг",                     en: "Price per kg",                 az: "Kq üçün qiymət" },
  lot_grade:    { ru: "Сорт качества",                  en: "Quality grade",                az: "Keyfiyyət dərəcəsi" },
  lot_region:   { ru: "Регион",                         en: "Region",                       az: "Bölgə" },
  lot_farm:     { ru: "Хозяйство",                      en: "Farm",                         az: "Təsərrüfat" },
  lot_posted:   { ru: "Размещён",                       en: "Posted",                       az: "Yerləşdirilib" },
  lot_request_h:{ ru: "Отправить заявку",               en: "Send a request",               az: "Sorğu göndər" },
  lot_buyer:    { ru: "Ваша компания / имя",            en: "Your company / name",          az: "Şirkətiniz / adınız" },
  lot_buyer_ph: { ru: "Напр.: Сеть «Свежий рынок», Баку",en: "e.g. Fresh Market chain, Baku",az: "Məs.: \"Təzə Bazar\" şəbəkəsi, Bakı" },
  lot_qty:      { ru: "Нужный объём, кг",               en: "Volume needed, kg",            az: "Lazımi həcm, kq" },
  lot_sum:      { ru: "Сумма заявки",                   en: "Request total",                az: "Sorğu məbləği" },
  lot_fee_note: { ru: "Комиссия платформы 2,5% за услугу посредничества входит отдельной строкой при оформлении. Оплата — через банк-партнёр, как залог до получения товара.",
                  en: "A 2.5% platform service fee is itemised separately at checkout. Payment is via the partner bank, held in trust until the goods are received.",
                  az: "2,5% platforma xidmət komissiyası sifarişdə ayrıca sətirlə göstərilir. Ödəniş tərəfdaş bank vasitəsilə, mal alınana qədər əmanət kimi." },
  lot_send:     { ru: "Отправить заявку",               en: "Send request",                 az: "Sorğu göndər" },
  lot_sent:     { ru: "Заявка отправлена фермеру",      en: "Request sent to the farmer",   az: "Sorğu fermerə göndərildi" },
  lot_err_qty:  { ru: "Укажи объём и своё название",    en: "Enter the volume and your name",az: "Həcmi və adını göstər" },
  lot_err_over: { ru: "Объём заявки больше, чем есть в наличии",
                  en: "Requested volume exceeds what's on hand",
                  az: "Sorğu həcmi mövcud olandan çoxdur" },
  lot_requests_on:{ ru: "Заявок на этот лот",           en: "Requests on this lot",         az: "Bu lota sorğular" },
  lot_remove:   { ru: "Удалить лот",                    en: "Remove lot",                   az: "Lotu sil" },

  /* ================= ЗАЯВКИ ================= */
  deals_title:  { ru: "Заявки",                         en: "Requests",                     az: "Sorğular" },
  deals_sub:    { ru: "Заявки, которые ты отправил как покупатель, и заявки на твои лоты.",
                  en: "Requests you've sent as a buyer, and requests on your lots.",
                  az: "Alıcı kimi göndərdiyin sorğular və lotlarına gələn sorğular." },
  deals_empty_h:{ ru: "Заявок пока нет",                en: "No requests yet",              az: "Hələ sorğu yoxdur" },
  deals_empty_p:{ ru: "Когда ты отправишь заявку на лот или кто-то откликнется на твой, заявки появятся здесь.",
                  en: "When you send a request on a lot, or someone responds to yours, requests will appear here.",
                  az: "Bir lota sorğu göndərdiyində və ya kimsə səninkinə cavab verdiyində sorğular burada görünəcək." },
  deals_status_requested:{ ru: "Отправлена",            en: "Sent",                         az: "Göndərilib" },
  deals_status_accepted:{ ru: "Принята фермером",       en: "Accepted by farmer",           az: "Fermer qəbul etdi" },
  deals_status_paid:{ ru: "Оплачена (в залоге у банка)",en: "Paid (held by bank)",          az: "Ödənilib (bankda əmanətdə)" },
  deals_status_delivered:{ ru: "Товар получен · оплата у фермера",en: "Delivered · farmer paid",az: "Mal alındı · fermer ödəniş aldı" },
  deals_status_declined:{ ru: "Отклонена",              en: "Declined",                     az: "Rədd edildi" },
  deals_accept: { ru: "Принять",                        en: "Accept",                       az: "Qəbul et" },
  deals_decline:{ ru: "Отклонить",                      en: "Decline",                      az: "Rədd et" },
  deals_pay:    { ru: "Оплатить через банк",            en: "Pay via bank",                 az: "Bank vasitəsilə ödə" },
  deals_confirm:{ ru: "Подтвердить получение",          en: "Confirm receipt",              az: "Alınmanı təsdiqlə" },
  deals_pay_note:{ ru: "Демонстрация потока оплаты. На боевой версии здесь открывается платёжный шлюз банка-партнёра.",
                  en: "A demonstration of the payment flow. In the live version this opens the partner bank's payment gateway.",
                  az: "Ödəniş axınının nümayişi. Canlı versiyada burada tərəfdaş bankın ödəniş şlüzü açılır." },
  deals_col_lot:{ ru: "Лот",                            en: "Lot",                          az: "Lot" },
  deals_col_who:{ ru: "Покупатель",                     en: "Buyer",                        az: "Alıcı" },
  deals_col_qty:{ ru: "Объём",                          en: "Volume",                       az: "Həcm" },
  deals_col_sum:{ ru: "Сумма",                          en: "Sum",                          az: "Məbləğ" },
  deals_col_status:{ ru: "Статус",                      en: "Status",                       az: "Status" },

  /* общие единицы / термины */
  u_kg:         { ru: "кг",                             en: "kg",                           az: "kq" },
  currency:     { ru: "₼",                              en: "₼",                            az: "₼" },
  reset_data:   { ru: "Очистить мои данные",            en: "Clear my data",                az: "Məlumatlarımı təmizlə" },
  reset_confirm:{ ru: "Удалить все размещённые лоты и заявки из этого браузера?",
                  en: "Delete all posted lots and requests from this browser?",
                  az: "Bu brauzerdən bütün yerləşdirilmiş lotları və sorğuları silmək?" },

  /* культуры */
  crop_apple:   { ru: "Яблоки",       en: "Apples",       az: "Alma" },
  crop_tomato:  { ru: "Томаты",       en: "Tomatoes",     az: "Pomidor" },
  crop_pomegranate:{ ru: "Гранаты",   en: "Pomegranates", az: "Nar" },
  crop_cherry:  { ru: "Черешня",      en: "Cherries",     az: "Gilas" },
  crop_citrus:  { ru: "Цитрусовые",   en: "Citrus",       az: "Sitrus" },
  crop_persimmon:{ ru: "Хурма",       en: "Persimmon",    az: "Xurma" },
  crop_hazelnut:{ ru: "Фундук",       en: "Hazelnut",     az: "Fındıq" },
  crop_grape:   { ru: "Виноград",     en: "Grapes",       az: "Üzüm" },
  crop_potato:  { ru: "Картофель",    en: "Potatoes",     az: "Kartof" },
  crop_onion:   { ru: "Лук",          en: "Onion",        az: "Soğan" },
  crop_other:   { ru: "Другое",       en: "Other",        az: "Digər" },

  /* регионы */
  reg_quba:     { ru: "Губа",         en: "Quba",         az: "Quba" },
  reg_khachmaz: { ru: "Хачмаз",       en: "Khachmaz",     az: "Xaçmaz" },
  reg_lankaran: { ru: "Ленкорань",    en: "Lankaran",     az: "Lənkəran" },
  reg_goychay:  { ru: "Гёйчай",       en: "Goychay",      az: "Göyçay" },
  reg_ismayilli:{ ru: "Исмаиллы",     en: "Ismayilli",    az: "İsmayıllı" },
  reg_shaki:    { ru: "Шеки",         en: "Shaki",        az: "Şəki" },
  reg_ganja:    { ru: "Гянджа",       en: "Ganja",        az: "Gəncə" },
  reg_other:    { ru: "Другой",       en: "Other",        az: "Digər" },
};

export function t(lang, key) {
  const row = DICT[key];
  if (!row) return key;
  return row[lang] || row.en || key;
}

/* списки для селектов */
export const CROPS = ["apple","tomato","pomegranate","cherry","citrus","persimmon","hazelnut","grape","potato","onion","other"];
export const REGIONS = ["quba","khachmaz","lankaran","goychay","ismayilli","shaki","ganja","other"];
export const GRADES = ["A","B","C"];
