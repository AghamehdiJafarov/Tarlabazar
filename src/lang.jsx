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
  nav_halal:    { ru: "Почему халяль",                 en: "Why halal",                    az: "Niyə halal" },
  nav_deals:    { ru: "Мои заявки",                    en: "My requests",                  az: "Sorğularım" },
  nav_home:     { ru: "Главная",                       en: "Home",                         az: "Ana səhifə" },

  /* ---------- HERO ---------- */
  hero_eyebrow: { ru: "Халяльный прямой рынок · без посредников",
                  en: "Halal direct market · no middlemen",
                  az: "Halal birbaşa bazar · vasitəçisiz" },
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
  hero_stat3_l: { ru: "Ссудный процент",                en: "Interest / riba",              az: "Faiz / riba" },
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

  /* ---------- ПОЧЕМУ ХАЛЯЛЬ (5 принципов) ---------- */
  halal_eyebrow:{ ru: "Почему это халяль",              en: "Why this is halal",            az: "Niyə bu halaldır" },
  halal_h:      { ru: "Пять решений, встроенных в саму сделку",
                  en: "Five decisions built into the deal itself",
                  az: "Sövdələşmənin özünə qurulmuş beş qərar" },
  halal_p:      { ru: "Халяльность здесь — не наклейка, а устройство платформы. Каждый принцип убирает конкретный запрещённый элемент из обычного маркетплейса.",
                  en: "Halal here is not a label but the platform's design. Each principle removes a specific forbidden element from an ordinary marketplace.",
                  az: "Halal burada etiket deyil, platformanın quruluşudur. Hər prinsip adi bazardan konkret qadağan olunmuş elementi çıxarır." },

  halal1_h:     { ru: "Продаётся только реальный товар",en: "Only real goods are sold",     az: "Yalnız real mal satılır" },
  halal1_p:     { ru: "Фермер продаёт урожай, который у него физически есть и уже собран. Платформа никогда не владеет товаром и не перепродаёт его. Это исключает дропшиппинг и продажу того, чего у продавца нет — прямой запрет хадиса «не продавай то, чего у тебя нет».",
                  en: "The farmer sells produce he physically has and has already harvested. The platform never owns the goods and never resells them. This rules out dropshipping and selling what the seller doesn't have — the direct prohibition of the hadith \"do not sell what you do not have\".",
                  az: "Fermer fiziki olaraq sahib olduğu və artıq yığdığı məhsulu satır. Platforma heç vaxt mala sahib olmur və onu yenidən satmır. Bu, dropşippinqi və satıcının sahib olmadığı şeyi satmağı istisna edir — \"sahib olmadığın şeyi satma\" hədisinin birbaşa qadağası." },

  halal2_h:     { ru: "Доход — комиссия за услугу, не процент",en: "Income is a service fee, not interest",az: "Gəlir — xidmət komissiyası, faiz deyil" },
  halal2_p:     { ru: "Платформа берёт 2–3% за реальную услугу: свести стороны, проверить качество, помочь с логистикой. Это брокерство (симсара), дозволенное по согласию учёных. Никаких займов под процент, никакой рассрочки с наценкой — рибы на платформе нет.",
                  en: "The platform takes 2–3% for a real service: connecting the parties, verifying quality, helping with logistics. This is brokerage (simsara), permitted by scholarly consensus. No interest-bearing loans, no marked-up instalments — there is no riba on the platform.",
                  az: "Platforma real xidmət üçün 2–3% götürür: tərəfləri birləşdirmək, keyfiyyəti yoxlamaq, logistikaya kömək etmək. Bu, alimlərin razılığı ilə icazə verilən vasitəçilikdir (simsara). Faizli borc yoxdur, əlavəli hissə-hissə ödəniş yoxdur — platformada riba yoxdur." },

  halal3_h:     { ru: "Каждый лот — с ясными условиями",en: "Every lot has clear terms",    az: "Hər lotun aydın şərtləri var" },
  halal3_p:     { ru: "Культура, объём, цена за килограмм и сорт качества указаны прямо. Покупатель точно знает, что берёт. Это убирает гарар — чрезмерную неопределённость сделки, которую запрещает шариат. Качество измеримо и прозрачно, а не «на глаз перекупщика».",
                  en: "Crop, volume, price per kilo and quality grade are stated plainly. The buyer knows exactly what he is getting. This removes gharar — the excessive uncertainty forbidden by sharia. Quality is measurable and transparent, not \"by the reseller's eye\".",
                  az: "Məhsul, həcm, kiloqram başına qiymət və keyfiyyət dərəcəsi açıq göstərilir. Alıcı nə aldığını dəqiq bilir. Bu, qərəri — şəriətin qadağan etdiyi həddindən artıq qeyri-müəyyənliyi aradan qaldırır. Keyfiyyət ölçülə bilən və şəffafdır, \"vasitəçinin gözü ilə\" deyil." },

  halal4_h:     { ru: "Только собранный урожай",        en: "Only harvested produce",       az: "Yalnız yığılmış məhsul" },
  halal4_p:     { ru: "На платформе продаётся то, что уже собрано и наличествует. Нельзя продать будущий урожай, которого ещё нет на земле, — это отдельный шариатский запрет на продажу плодов до их появления. Никакого «кота в мешке» и никаких фьючерсов на несобранное.",
                  en: "The platform sells what is already harvested and on hand. You cannot sell a future harvest that isn't yet on the ground — a separate sharia prohibition on selling fruit before it appears. No \"pig in a poke\", no futures on the unharvested.",
                  az: "Platformada artıq yığılmış və mövcud olan satılır. Hələ torpaqda olmayan gələcək məhsulu satmaq olmaz — bu, meyvələr yetişməmiş satılmasına dair ayrıca şəriət qadağasıdır. \"Kisədə pişik\" yoxdur, yığılmamış üçün fyuçers yoxdur." },

  halal5_h:     { ru: "Деньги как честный залог",       en: "Money as honest trust",        az: "Pul dürüst əmanət kimi" },
  halal5_p:     { ru: "Оплата замораживается у банка-партнёра как доверенный залог (амана) до получения товара и переводится фермеру без какого-либо приращения. Платформа не держит чужие деньги у себя и не начисляет на них процент. Это одновременно халяльно и законно — не требует лицензии на собственный эскроу.",
                  en: "Payment is frozen with the partner bank as a trust (amana) until the goods are received, and transferred to the farmer without any increase. The platform doesn't hold others' money itself and doesn't accrue interest on it. This is both halal and lawful — it needs no licence for a proprietary escrow.",
                  az: "Ödəniş mal alınana qədər tərəfdaş bankda əmanət (amanə) kimi dondurulur və heç bir artım olmadan fermerə köçürülür. Platforma başqasının pulunu özündə saxlamır və ona faiz hesablamır. Bu, həm halal, həm qanunidir — öz eskrou üçün lisenziya tələb etmir." },

  halal_note:   { ru: "Приятное совпадение: то, что делает сделку халяльной, делает её и устойчивой. Международные агро-маркетплейсы разорялись именно на том, что запрещает шариат, — на займах под процент, на владении товаром и складами. Отказ от риска на деньгах и на чужом товаре спасает и веру, и бизнес.",
                  en: "A fitting coincidence: what makes the deal halal also makes it sustainable. International agri-marketplaces went bankrupt on exactly what sharia forbids — interest-bearing loans, owning goods and warehouses. Refusing to gamble on money and on others' goods saves both the faith and the business.",
                  az: "Yerinə düşən təsadüf: sövdələşməni halal edən onu həm də dayanıqlı edir. Beynəlxalq aqro-bazarlar məhz şəriətin qadağan etdiyi şeyə görə iflasa uğradı — faizli borclara, mal və anbar sahibliyinə görə. Pulla və başqasının malı ilə risk etməkdən imtina həm imanı, həm biznesi xilas edir." },

  /* ---------- CTA ---------- */
  final_h:      { ru: "Начни продавать или покупать напрямую",
                  en: "Start selling or buying directly",
                  az: "Birbaşa satmağa və ya almağa başla" },
  final_p:      { ru: "Каталог открыт сразу. Размести свой лот или найди нужный урожай без посредников.",
                  en: "The catalogue is open right away. Post your lot or find the produce you need without middlemen.",
                  az: "Kataloq dərhal açıqdır. Öz lotunu yerləşdir və ya vasitəçisiz lazımi məhsulu tap." },
  foot:         { ru: "Прямой рынок от поля до покупателя · без рибы · RU / EN / AZ",
                  en: "Direct market from field to buyer · riba-free · RU / EN / AZ",
                  az: "Tarladan alıcıya birbaşa bazar · ribasız · RU / EN / AZ" },

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
  new_sub:      { ru: "Только реальный, уже собранный урожай. Укажи ясные условия — так требует и здравый смысл, и халяль.",
                  en: "Only real, already-harvested produce. State clear terms — as both common sense and halal require.",
                  az: "Yalnız real, artıq yığılmış məhsul. Aydın şərtlər göstər — həm sağlam düşüncə, həm halal bunu tələb edir." },
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
