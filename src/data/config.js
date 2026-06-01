// ╔══════════════════════════════════════════════════════════════════╗
// ║          БАРЛЫҚ ДЕРЕКТЕР ОСЫНДА — ТЕК ОСЫ ФАЙЛДЫ ӨЗГЕРТІҢІЗ     ║
// ║   БҮКІЛ МӘТІНДі, КҮНДІ, ОРЫНДЫ ОСЫДАН ӨЗГЕРТУГЕ БОЛАДЫ         ║
// ╚══════════════════════════════════════════════════════════════════╝

import introPosterFile from "../../images/intro-poster-new-cnddqy2q.jpg";

// ─── ТОЙ ИЕЛЕРІ ────────────────────────────────────────────────────
export const HOSTS = {
  person1: "Бекболат",
  person2: "Баршагүл",
};

// ─── ЖҰП ТУРАЛЫ ДЕРЕКТЕР ────────────────────────────────────────────
export const COUPLE = {
  person1: "Ұларбек",
  person2: "Айсымбат",
  monogramImage: "/images/monogram-dd4gsvtc.png",
};

// ─── МЕДИА ФАЙЛДАРЫ ─────────────────────────────────────────────────
export const MEDIA = {
  introVideo: "/media/intro-video-new-celmqonn.mp4",
  heroVideo: "/media/hero-video-c3ekv1og.mp4",
  backgroundMusic: "/media/toi.mp3",
  introPoster: introPosterFile,
};

// ─── СУРЕТТЕР ───────────────────────────────────────────────────────
export const IMAGES = {
  columnLeft: "/images/column-left-deau9trj.png",
  columnRight: "/images/column-right-dejzoxz8.png",
  yachtIllustration: "/images/yacht-illustration-bxptm2nz.png",
  peninsulaHotel: "/images/peninsula-hotel-dfdfguc8.png",
  curtainLeft: "/images/curtain-left-new-c9ybpbwk.png",
  curtainCenter: "/images/curtain-center-new-ewkr26zu.png",
  curtainRight: "/images/curtain-right-new-dusl3iyi.png",
  candles: "/images/candles-bldm94c8.png",
  flowerVase: "/images/flower-vase-b9-turuq.png",
  bouquet: "/images/bouquet-bbyupj3k.png",
  flowerStand: "/images/flower-stand-bmjqhdxb.png",
  cypressTrees: "/images/cypress-trees-bn8j7j-a.png",
  rosesTopLeft: "/images/roses-top-left-d0rrxzlv.png",
  rosesBottomRight: "/images/roses-bottom-right-c-wj2fia.png",
  vaseLeft: "/images/vase-left-dfax-fu4.png",
  vaseRight: "/images/vase-right-bfgtpz8l.png",
  hotelPeninsula: "/images/hotel-peninsula-is4jsbdc.png",
  hotelMarriott: "/images/hotel-marriott-wv0e4iky.png",
  hotelNovotel: "/images/hotel-novotel-cuychsif.png",
};

// ─── ІС-ШАРАЛАР ─────────────────────────────────────────────────────
export const EVENTS = {
  cruise: {
    date: "2026-06-23",
    displayDate: "23.06.2026",
    time: "18:30",
    endTime: "21:30",
    returnTime: "22:00",
    venue: "The Peninsula Private Quay",
    mapsUrl:
      "https://www.google.com/maps/place/The+Peninsula+Istanbul,+Kemanke%C5%9F+Karamustafa+Pa%C5%9Fa,+Kemanke%C5%9F+Cd.+No:34,+34425+Beyo%C4%9Flu%2F%C4%B0stanbul/@41.0230125,28.9779274,17z",
  },
  wedding: {
    date: "2026-06-24",
    displayDate: "24.06.2026",
    time: "17:00",
    venue: '"Sky Palace" тойханасы',
    mapsUrl:
      "https://www.google.com/maps/place/SKY+Palace/@48.9660524,89.9239171,17z",
  },
};

// ─── ҚОНАҚ ҮЙЛЕР ────────────────────────────────────────────────────
export const HOTELS = [
  {
    name: "The Peninsula Istanbul",
    price: "€735",
    image: IMAGES.hotelPeninsula,
    bookingUrl: null,
  },
  {
    name: "JW Marriott Istanbul",
    price: "€314",
    image: IMAGES.hotelMarriott,
    bookingUrl: null,
  },
  {
    name: "Novotel Istanbul",
    price: "€192",
    image: IMAGES.hotelNovotel,
    bookingUrl: null,
  },
];

// ─── RSVP FIREBASE ──────────────────────────────────────────────────
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDN_HPzbKc_eLjbCEqoLuzGECbYoFhuOwk",
  authDomain: "saya-24ec4.firebaseapp.com",
  databaseURL: "https://saya-24ec4-default-rtdb.firebaseio.com",
  projectId: "saya-24ec4",
  storageBucket: "saya-24ec4.firebasestorage.app",
  messagingSenderId: "864275314522",
  appId: "1:864275314522:web:2941818dbd6a9cd7506563",
  measurementId: "G-YLK41QNRWW",
};

// RSVP жауап беру мерзімі
export const RSVP_DEADLINE = "2026-06-15";

export const GUEST_COMMENTS = {
  kz: [
    {
      name: "Айару",
      message:
        "Бұл шақырудың әр деталі сондай нәзік әрі әсем көрінеді. Күні келгенше асыға күтеміз.",
    },
    {
      name: "Нұрасыл",
      message:
        "Видео мен атмосфера керемет үйлескен. Мерекелеріңіз махаббат пен жылылыққа толы болсын.",
    },
    {
      name: "Мөлдір",
      message:
        "Шақырудың стилі өте есте қаларлық. Сіздердің қуаныштарыңызбен бірге болу біз үшін үлкен мәртебе.",
    },
  ],
  mn: [
    {
      name: "Аяа",
      message:
        "Урилгын уур амьсгал маш тансаг харагдаж байна. Тэр өдрийг тэсэн ядан хүлээж байна.",
    },
    {
      name: "Насан",
      message:
        "Видео болон дизайн нь үнэхээр гоёмсог зохицжээ. Та хоёрын баяр хайраар дүүрэн байх болтугай.",
    },
    {
      name: "Солонго",
      message:
        "Энэ урилга маш дурсамжтай, сэтгэлд дулаахан санагдлаа. Баярт тань хамт байхад баяртай байна.",
    },
  ],
};

// ─── АУДАРМАЛАР ─────────────────────────────────────────────────────
// Тілдерді осы блоктан өзгертіңіз
export const TRANSLATIONS = {
  // ══════════════════════════════════════════════════════════════════
  //  ҚАЗАҚ ТІЛІ
  // ══════════════════════════════════════════════════════════════════
  kz: {
    langLabel: "ҚАЗ",

    // Hero
    gettingMarried: "Тойға шақыру",
    keepScrolling: "Одан әрі жылжыңыз",
    andRsvp: "және жауапты жолдаңыз",

    // Countdown
    countdown: "Тойға дейін",
    countdownUntil: "2026 жылдың 24 маусымына дейін",
    days: "Күн",
    hours: "Сағат",
    minutes: "Минут",

    // Calendar
    calendarMonth: "Маусым 2026",
    calendarDays: ["Дс", "Сс", "Ср", "Бс", "Жм", "Сн", "Жк"],

    // Wedding Hosts
    weddingHosts: "Той иелері",

    // Celebrations
    celebrations: "Той рәсімдері",
    cruiseTitle: "Той алдындағы қарсы алу кеші",
    cruiseSubtitle: "Іс-шара орнынан шығу",
    cruiseDesc: "Іс-шара орнынан шығу",
    viewOnMap: "Картада қарау",
    weddingLabel: "Үйлену той",

    // Itinerary
    weddingWeekend: "Той бағдарламасы",
    itinerary: "Бағдарлама",
    weekendDates: "24 маусым 2026",
    cruiseDate: "23 маусым 2026",
    cruiseJoinText: "Коктейльдер мен тәттілерге қосылыңыз",
    cruiseDeparture: "Іс-шара орнынан шығу",
    cruiseCocktails: "Күн батысы кезіндегі коктейль мен тәттілер",
    cruiseReturn: "Іс-шара орнына оралу",
    weddingDate: '24 маусым 2026 · "Sky Palace" тойханасы',
    weddingArrival: "Келу мен қарсы алу сусындары",
    ceremony: "Неке рәсімі",
    banquet: "Той дастарханы",
    party: "Той кеші",
    afterParty: "Кешкі той соңы",

    // Dress code
    dressCode: "Дресс код",
    welcomeCruiseEvent: "Той алдындағы кеш",
    july22nd: "23 маусым",
    whiteCocktail: "Ақ коктейль киімі",
    weddingEvent: "Үйлену той",
    july23rd: "24 маусым",
    blackTie: "Қара галстук",

    // Hotels
    whereToStay: "Қайда тұруға болады",
    recommendedHotels: "Іс-шара орнына жақын ұсынылатын қонақ үйлер",
    priceDetails:
      "бір түн · екілік стандарт бөлме · салықтар мен таңғы ас кіреді",
    bookingSoon: "Брондау сілтемесі жақын арада",

    // Gift
    giftTitle: "Той сыйлығы",
    giftQuote: "Сіздің қатысуыңыз — бізге ең үлкен сыйлық.",
    giftDesc:
      "Егер бізді сыйлықпен марапаттағыңыз келсе, ақша сыйлықты артық көреміз. Банк деректемелері жеке хабарланады.",

    guestCommentsTitle: "Сэтгэгдлүүд",
    guestCommentsSubtitle: "Қонақтардың жылы сөздері",
    previousComment: "Алдыңғы пікір",
    nextComment: "Келесі пікір",

    // RSVP
    rsvp: "RSVP",
    rsvpDeadlineText:
      "2026 жылдың 15 маусымына дейін жауап беруіңізді өтінеміз",
    willYouJoin: "Бізге қосыласыз ба? *",
    yesAttend: "Қуанышпен қабылдаймын",
    noAttend: "Өкінішке орай, бара алмаймын",
    whichEvents: "Қандай іс-шараларға қатысасыз? *",
    eventWedding: "Үйлену рәсімі және банкет – 24 маусым",
    guestCount: "Қонақтар саны",
    principalGuest: "Негізгі қонақ",
    fullName: "Толық аты-жөні",
    emailAddress: "Электрондық пошта",
    childrenQuery: "Балалар бірге келе ме?",
    yes: "Иә",
    no: "Жоқ",
    messageForCouple: "Жұп үшін хабарлама",
    messagePlaceholder: "Сізден хабар алуды шын жүректен тілейміз.",
    submitResponse: "Жіберу",

    // RSVP dialogs
    validName: "Толық атыңызды енгізіңіз.",
    validEmail: "Жарамды электрондық пошта мекенжайын енгізіңіз.",
    validEvent: "Кемінде бір іс-шараны таңдаңыз.",
    submitting: "Жіберілуде...",
    successAcceptTitle: "Алғыс білдіреміз",
    successAcceptDesc:
      "Бізбен бірге тойлайтыныңызға қуаныштымыз.<br>Біздің тарихымыздың бөлігі болғаныңыз үшін рақмет.",
    successAcceptSub: "Сіздермен бірге болуды асыға күтеміз!",
    successDeclineTitle: "Жылулықпен",
    successDeclineDesc:
      "Бізге қосыла алмайтыныңызды естіп өкіндік.<br>Той күні ойларымызда боласыз.",
    successDeclineSub: "Хабарлағаныңыз үшін рақмет.",
    errorTitle: "Жіберу қатесі",
    errorDesc:
      "Жауабыңызды тіркей алмадық. Қайталап көріңіз немесе тіке хабарласыңыз.",
    close: "Жабу",

    // Footer
    madeWithLove: "Жасаған:",
  },

  // ══════════════════════════════════════════════════════════════════
  //  МОНГОЛ ХЭЛ
  // ══════════════════════════════════════════════════════════════════
  mn: {
    langLabel: "МОН",
    couple: "Уларбек & Айсымбат",

    // Hero
    gettingMarried: "Тойд урьж байна",
    keepScrolling: "Доош гүйлгэнэ үү",
    andRsvp: "болон RSVP",

    // Countdown
    countdown: "Тоолол",
    countdownUntil: "2026 оны 6-р сарын 24 хүртэл",
    days: "Өдөр",
    hours: "Цаг",
    minutes: "Минут",

    // Calendar
    calendarMonth: "6-р сар 2026",
    calendarDays: ["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"],

    // Wedding Hosts
    weddingHosts: "Хуримын эзэд",

    // Celebrations
    celebrations: "Баяр ёслолууд",
    cruiseTitle: "Той өмнөх угтлагын үдэшлэг",
    cruiseSubtitle: "Талбайгаас гарна",
    cruiseDesc: "Талбайгаас гарна",
    viewOnMap: "Газрын зураг дээр харах",
    weddingLabel: "Хурим",

    // Itinerary
    weddingWeekend: "Хуримын хөтөлбөр",
    itinerary: "Хөтөлбөр",
    weekendDates: "2026 оны 6-р сарын 24",
    cruiseDate: "6-р сарын 23, 2026",
    cruiseJoinText: "Коктейль болон хүнс хоолонд нэгдэнэ үү",
    cruiseDeparture: "Талбайгаас гарах",
    cruiseCocktails: "Нарны жаргалт үеийн коктейль ба зууш",
    cruiseReturn: "Талбайд ирэх",
    weddingDate: '6-р сарын 24, 2026 · "Sky Palace" хуримын ордон',
    weddingArrival: "Ирэх ба угтлагын ундаа",
    ceremony: "Гэрлэлтийн ёслол",
    banquet: "Хурим найр",
    party: "Баяр үдэшлэг",
    afterParty: "Үдэшлэгийн төгсгөл",

    // Dress code
    dressCode: "Дресс код",
    welcomeCruiseEvent: "Той өмнөх үдэшлэг",
    july22nd: "6-р сарын 23",
    whiteCocktail: "Цагаан коктейль хувцас",
    weddingEvent: "Хурим",
    july23rd: "6-р сарын 24",
    blackTie: "Хар галстук",

    // Hotels
    whereToStay: "Хаана байх вэ",
    recommendedHotels: "Үйл явдлын газрын ойролцоо санал болгох зочид буудлууд",
    priceDetails:
      "шөнийн · хоёр орны стандарт өрөө · татвар ба өглийн цай оруулан",
    bookingSoon: "Захиалгын холбоос удахгүй",

    // Gift
    giftTitle: "Хуримын бэлэг",
    giftQuote: "Таны ирэлт бол бидний хамгийн том бэлэг.",
    giftDesc:
      "Хэрэв та биднийг бэлгээр хүндэтгэхийг хүсвэл, бид мөнгөн бэлгийг илүүд үзнэ. Банкны дэлгэрэнгүй мэдээллийг тусад нь хуваалцана.",

    guestCommentsTitle: "Ізгі лебіздер",
    guestCommentsSubtitle: "Зочдын халуун үгс",
    previousComment: "Өмнөх сэтгэгдэл",
    nextComment: "Дараах сэтгэгдэл",

    // RSVP
    rsvp: "RSVP",
    rsvpDeadlineText:
      "2026 оны 6-р сарын 1-ний өдрийн дотор хариу өгөхийг хүсье",
    willYouJoin: "Та бидэнтэй нэгдэх үү? *",
    yesAttend: "Баяртайгаар хүлээн авна",
    noAttend: "Харамсалтай нь ирж чадахгүй байна",
    whichEvents: "Та ямар арга хэмжээнд оролцох вэ? *",
    eventWedding: "Хуримын ёслол ба хүлээн авалт – 6-р сарын 24",
    guestCount: "Таны дагалдагчдын тоо",
    principalGuest: "Үндсэн зочин",
    fullName: "Бүтэн нэр",
    emailAddress: "Имэйл хаяг",
    childrenQuery: "Хүүхдүүд дагалдах уу?",
    yes: "Тийм",
    no: "Үгүй",
    messageForCouple: "Хосуудад мэндчилгээ",
    messagePlaceholder: "Хосуудад сэтгэлийн үгийг бичнэ үү.",
    submitResponse: "Хариу илгээх",

    // RSVP dialogs
    validName: "Бүтэн нэрээ оруулна уу.",
    validEmail: "Зөв имэйл хаяг оруулна уу.",
    validEvent: "Хамгийн багадаа нэг арга хэмжээ сонгоно уу.",
    submitting: "Илгээж байна...",
    successAcceptTitle: "Талархал",
    successAcceptDesc:
      "Та биднтэй хамт тэмдэглэх болсонд баяртай байна.<br>Манай түүхийн нэг хэсэг болсонд баярлалаа.",
    successAcceptSub: "Та нартай хамт байхыг тэсэн ядан хүлээж байна!",
    successDeclineTitle: "Дулааны мэдрэмжтэйгээр",
    successDeclineDesc:
      "Та биднтэй нэгдэж чадахгүй байгааг мэдэж харамсаж байна.<br>Тухайн өдөр та бидний сэтгэлд байх болно.",
    successDeclineSub: "Мэдэгдсэнд баярлалаа.",
    errorTitle: "Илгээх алдаа",
    errorDesc:
      "Таны хариуг бүртгэж чадсангүй. Дахин оролдоно уу эсвэл хосуудтай шууд холбоо барина уу.",
    close: "Хаах",

    // Footer
    madeWithLove: "Бүтээсэн:",
  },
};
