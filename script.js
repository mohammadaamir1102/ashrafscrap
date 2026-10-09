/* ==========================================================================
   ASHRAF STEEL SCRAP TRADERS — script.js
   Vanilla ES6+. No frameworks, no build tools.
   A. CONFIG (edit here)  B. DATA  C. i18n (EN/हिंदी/मराठी)  D. Helpers
   E. Feature modules  F. Boot
   ========================================================================== */
(function () {
  "use strict";

  /* ========================================================================
     A. CONFIG  —  EDIT ONLY THIS SECTION TO UPDATE THE WHOLE SITE
     ======================================================================== */
  var CONFIG = {
    owner: "Ashraf Khan",
    business: "Ashraf Steel Scrap Traders",
    tagline: "Sahi Tol. Sahi Daam. Turant Payment.",
    taglineHi: "सही तोल. सही दाम. तुरंत पेमेंट.",
    taglineMr: "योग्य तोल. योग्य दर. तात्काळ पेमेंट.",

    phone: "917718012713",              // digits only, no + or spaces
    phoneDisplay: "+91 77180 12713",
    email: "ashrafsteelscrap@gmail.com",

    address: "Plot No. 42, Satpur MIDC, Nashik, Maharashtra 422007",
    city: "Nashik",
    region: "Maharashtra",

    timings: "Mon – Sat, 9:00 AM – 7:00 PM",
    timingsHi: "सोम – शनि, सुबह 9:00 – शाम 7:00",
    timingsMr: "सोम – शनि, सकाळी 9:00 – संध्याकाळी 7:00",

    mapEmbed: "https://www.google.com/maps?q=Nashik,Maharashtra,India&output=embed",

    waMessage: "Hello Ashraf Bhai, I want to sell steel scrap. Please contact me.",
    waMessageHi: "नमस्ते आशराफ भाई, मुझे लोहे का कबाड़ बेचना है। कृपया संपर्क करें।",
    waMessageMr: "नमस्कार आशराफ भाई, मला स्टील भंगार विकायचा आहे. कृपया संपर्क करा.",

    stats: { years: 10, tons: 5000, clients: 500, areas: 8 },
    founded: 2014,

    areas: ["Nashik City", "Satpur MIDC", "Ambad MIDC", "Sinnar", "Igatpuri", "Malegaon", "Dindori", "Niphad"]
  };

  /* ========================================================================
     B. DATA
     ======================================================================== */
  var RATES = [
    { id: "hms",        en: "HMS 1 & 2 (Heavy Melting)", hi: "एचएमएस 1 और 2",         mr: "एचएमएस 1 आणि 2",          rate: 34500,  trend: "up" },
    { id: "ms",         en: "MS Scrap (Mild Steel)",      hi: "एमएस स्क्रैप",            mr: "एमएस स्क्रॅप",            rate: 32000,  trend: "up" },
    { id: "ss304",      en: "Stainless Steel 304",        hi: "स्टेनलेस स्टील 304",       mr: "स्टेनलेस स्टील 304",       rate: 128000, trend: "flat" },
    { id: "ss316",      en: "Stainless Steel 316",        hi: "स्टेनलेस स्टील 316",       mr: "स्टेनलेस स्टील 316",       rate: 195000, trend: "up" },
    { id: "castiron",   en: "Cast Iron",                  hi: "कास्ट आयरन",              mr: "कास्ट आयर्न",              rate: 28500,  trend: "down" },
    { id: "turning",    en: "Turning / Boring",           hi: "टर्निंग / बोरिंग",        mr: "टर्निंग / बोरिंग",        rate: 26500,  trend: "flat" },
    { id: "structural", en: "Structural & Rail Scrap",    hi: "स्ट्रक्चरल / रेल स्क्रैप", mr: "स्ट्रक्चरल / रेल स्क्रॅप", rate: 33000,  trend: "up" }
  ];

  var SCRAP_TYPES = [
    { id: "hms",   icon: "beam",   en: { t: "HMS 1 & 2", d: "Heavy melting scrap — thick iron and steel, the backbone of every kabadi deal." }, hi: { t: "एचएमएस 1 और 2", d: "मोटा लोहा और स्टील स्क्रैप, हर कबाड़ सौदे की रीढ़।" }, mr: { t: "एचएमएस 1 आणि 2", d: "जाड लोखंड व स्टील भंगार — प्रत्येक कबाडी सौद्याचा कणा." } },
    { id: "ms",    icon: "sheet",  en: { t: "MS Scrap", d: "Mild steel from shops, workshops and fabrication units at top rates." }, hi: { t: "एमएस स्क्रैप", d: "दुकान, वर्कशॉप और फैब्रिकेशन यूनिट का माइल्ड स्टील, बेहतरीन रेट पर।" }, mr: { t: "एमएस स्क्रॅप", d: "दुकान, वर्कशॉप व फॅब्रिकेशन युनिटचे माइल्ड स्टील, उत्तम दरात." } },
    { id: "ss",    icon: "shield", en: { t: "Stainless Steel", d: "SS 304 and 316 bought after grade testing — get the true SS value." }, hi: { t: "स्टेनलेस स्टील", d: "SS 304 और 316, ग्रेड जांच के बाद सही दाम।" }, mr: { t: "स्टेनलेस स्टील", d: "SS 304 व 316, ग्रेड तपासणीनंतर योग्य किंमत." } },
    { id: "ci",    icon: "cube",   en: { t: "Cast Iron", d: "Heavy cast iron parts, manhole covers, machines and fittings." }, hi: { t: "कास्ट आयरन", d: "भारी कास्ट आयरन पार्ट्स, ढक्कन और मशीन पुर्जे।" }, mr: { t: "कास्ट आयर्न", d: "जड कास्ट आयर्न भाग, झाकणे व मशीन पुर्जे." } },
    { id: "turn",  icon: "coil",   en: { t: "Turning / Boring", d: "Lathe turning, borings and machine shop chips — weighed fairly." }, hi: { t: "टर्निंग / बोरिंग", d: "लेथ टर्निंग, बोरिंग और चिप्स, सही तोल के साथ।" }, mr: { t: "टर्निंग / बोरिंग", d: "लेथ टर्निंग, बोरिंग व चिप्स, योग्य तोलासह." } },
    { id: "struct",icon: "pipe",   en: { t: "Structural & Rail", d: "I-beams, channels, angles, plates, pipes and rail scrap." }, hi: { t: "स्ट्रक्चरल और रेल", d: "आई-बीम, चैनल, एंगल, प्लेट, पाइप और रेल स्क्रैप।" }, mr: { t: "स्ट्रक्चरल व रेल", d: "आय-बीम, चॅनेल, अँगल, प्लेट, पाइप व रेल भंगार." } },
    { id: "ind",   icon: "gear",   en: { t: "Industrial / Factory Scrap", d: "Production waste, offcuts and full factory clearance handled end to end." }, hi: { t: "इंडस्ट्रियल स्क्रैप", d: "प्रोडक्शन वेस्ट, ऑफकट और पूरी फैक्ट्री क्लीयरेंस।" }, mr: { t: "औद्योगिक / कारखाना भंगार", d: "उत्पादन वेस्ट, ऑफकट व संपूर्ण कारखाना क्लिअरन्स." } },
    { id: "mach",  icon: "gear",   en: { t: "Old Machinery", d: "Discarded machines, motors, generators and decommissioned equipment." }, hi: { t: "पुरानी मशीनरी", d: "पुरानी मशीनें, मोटर, जनरेटर और बंद उपकरण।" }, mr: { t: "जुनी यंत्रसामग्री", d: "जुनी मशीन, मोटर, जनरेटर व बंद उपकरणे." } },
    { id: "demol", icon: "shield", en: { t: "Demolition Scrap", d: "Site demolition iron, TMT bars, grills and gate scrap cleared fast." }, hi: { t: "डिमोलिशन स्क्रैप", d: "साइट का लोहा, टीएमटी बार, ग्रिल और गेट स्क्रैप।" }, mr: { t: "डिमोलिशन भंगार", d: "साइटचे लोखंड, TMT बार, ग्रिल व गेट भंगार." } },
    { id: "mixed", icon: "mix",    en: { t: "Mixed Metal Scrap", d: "Unsorted bhangar of all kinds — we sort and weigh it honestly." }, hi: { t: "मिक्स मेटल स्क्रैप", d: "सब तरह का मिला-जुला भंगार, ईमानदारी से तोला जाएगा।" }, mr: { t: "मिश्र धातू भंगार", d: "सर्व प्रकारचा मिश्र भंगार, प्रामाणिकपणे तोलला जाईल." } }
  ];

  var FAQ = [
    { en: { q: "How are steel scrap rates decided in Nashik?", a: "Rates depend on scrap type, purity, thickness and daily market demand. HMS and MS are priced differently from SS 304/316. We share the latest rate on WhatsApp before pickup, so there are no surprises." },
      hi: { q: "नाशिक में लोहे के स्क्रैप का रेट कैसे तय होता है?", a: "रेट स्क्रैप के प्रकार, शुद्धता, मोटाई और रोज़ के बाज़ार भाव पर निर्भर करता है। HMS और MS का भाव SS 304/316 से अलग होता है। पिकअप से पहले हम WhatsApp पर ताज़ा रेट बताते हैं।" },
      mr: { q: "नाशिकमध्ये स्टील भंगाराचे दर कसे ठरतात?", a: "दर भंगाराचा प्रकार, शुद्धता, जाडी व रोजच्या बाजारभावावर अवलंबून असतात. HMS व MS चे दर SS 304/316 पेक्षा वेगळे असतात. पिकअपपूर्वी आम्ही व्हॉट्सअ‍ॅपवर ताजा दर सांगतो." } },
    { en: { q: "Do you offer free scrap pickup in Nashik?", a: "Yes. Doorstep pickup is completely free across Nashik city, Satpur and Ambad MIDC, Sinnar, Igatpuri, Malegaon, Dindori and Niphad for a reasonable quantity." },
      hi: { q: "क्या नाशिक में मुफ्त स्क्रैप पिकअप मिलता है?", a: "हाँ। नाशिक शहर, सतपुर और अंबड MIDC, सिन्नर, इगतपुरी, मालेगांव, दिंडोरी और निफाड में उचित मात्रा पर घर तक मुफ्त पिकअप।" },
      mr: { q: "नाशिकमध्ये मोफत भंगार पिकअप मिळतो का?", a: "हो. नाशिक शहर, सतपूर व अंबड MIDC, सिन्नर, इगतपुरी, मालेगाव, दिंडोरी व निफाडमध्ये योग्य प्रमाणात मोफत घरपोच पिकअप." } },
    { en: { q: "How fast do I get payment for my scrap?", a: "Payment is instant — choose cash, UPI or direct bank transfer. Money is settled right after weighing, on the spot." },
      hi: { q: "स्क्रैप के पैसे कितनी जल्दी मिलते हैं?", a: "पेमेंट तुरंत — नकद, UPI या बैंक ट्रांसफर। तोल के तुरंत बाद मौके पर भुगतान।" },
      mr: { q: "भंगाराचे पैसे किती लवकर मिळतात?", a: "पेमेंट तात्काळ — रोख, UPI किंवा बँक ट्रान्सफर. तोलानंतर लगेच जागेवरच भुगतान." } },
    { en: { q: "Is there a minimum quantity to sell scrap?", a: "No strict minimum for shopkeepers and households, but free doorstep pickup usually applies to about 50 kg and above. Smaller lots are welcome at our yard." },
      hi: { q: "स्क्रैप बेचने के लिए कम से कम कितनी मात्रा चाहिए?", a: "दुकानदारों और घरों के लिए कोई सख्त सीमा नहीं, लेकिन मुफ्त पिकअप आमतौर पर लगभग 50 किलो से ऊपर। छोटी मात्रा हमारे यार्ड पर लाई जा सकती है।" },
      mr: { q: "भंगार विकण्यासाठी किमान किती प्रमाण हवे?", a: "दुकानदार व घरांसाठी कठोर मर्यादा नाही, पण मोफत पिकअप सामान्यतः सुमारे 50 किलो व त्यावरील. लहान प्रमाण आमच्या यार्डवर आणू शकता." } },
    { en: { q: "What documents are required to sell scrap?", a: "For individuals a valid ID proof is enough. For factories and industries a basic GST invoice or delivery challan helps. The process stays simple and transparent." },
      hi: { q: "स्क्रैप बेचने के लिए कौन से दस्तावेज़ चाहिए?", a: "व्यक्ति के लिए वैध पहचान पत्र पर्याप्त है। फैक्ट्री और उद्योग के लिए GST इनवॉइस या डिलीवरी चालान मददगार होता है। पूरी प्रक्रिया आसान और पारदर्शी रहती है।" },
      mr: { q: "भंगार विकण्यासाठी कोणती कागदपत्रे लागतात?", a: "व्यक्तीसाठी वैध ओळखपत्र पुरेसे आहे. कारखाने व उद्योगांसाठी GST बीजक किंवा डिलिव्हरी चलन उपयुक्त ठरते. प्रक्रिया सोपी व पारदर्शक असते." } },
    { en: { q: "Which areas in and around Nashik do you cover?", a: "We cover Nashik city, Satpur MIDC, Ambad MIDC, Sinnar, Igatpuri, Malegaon, Dindori, Niphad and nearby areas of Nashik district." },
      hi: { q: "नाशिक और आसपास आप किन क्षेत्रों में सेवा देते हैं?", a: "हम नाशिक शहर, सतपुर MIDC, अंबड MIDC, सिन्नर, इगतपुरी, मालेगांव, दिंडोरी, निफाड और नज़दीकी इलाकों में सेवा देते हैं।" },
      mr: { q: "नाशिक व परिसरात तुम्ही कोणत्या भागांत सेवा देता?", a: "आम्ही नाशिक शहर, सतपूर MIDC, अंबड MIDC, सिन्नर, इगतपुरी, मालेगाव, दिंडोरी, निफाड व जवळच्या भागांत सेवा देतो." } }
  ];

  var GALLERY = [
    { file: "images/gallery-1.jpg", w: 800, h: 600,  alt: "HMS 1 and 2 heavy melting steel scrap stacked in our Nashik yard" },
    { file: "images/gallery-2.jpg", w: 800, h: 1000, alt: "Digital weighing scale being used to weigh steel scrap fairly" },
    { file: "images/gallery-3.jpg", w: 800, h: 600,  alt: "Truck loading steel scrap for pickup in Nashik" },
    { file: "images/gallery-4.jpg", w: 800, h: 600,  alt: "Stainless steel 304 and 316 scrap sorted by grade" },
    { file: "images/gallery-5.jpg", w: 800, h: 1000, alt: "Cast iron machine parts and scrap ready for weighing" },
    { file: "images/gallery-6.jpg", w: 800, h: 600,  alt: "Structural steel beams and pipes collected from a site" }
  ];

  /* ========================================================================
     C. i18n DICTIONARY  (English / हिंदी / मराठी)
     ======================================================================== */
  var I18N = {
    en: {
      skip: "Skip to content", tickerLabel: "Today's Rates",
      navScrap: "Scrap", navRates: "Rates", navEstimator: "Estimator", navHow: "How it works",
      navWhy: "Why us", navAreas: "Areas", navGallery: "Gallery", navFaq: "FAQ", navContact: "Contact",
      waChat: "WhatsApp", waSell: "Sell on WhatsApp", callNow: "Call Now", callAria: "Call Ashraf Khan",
      heroEyebrow: "Nashik's trusted kabad & bhangar buyer since 2014",
      heroL1: "Sell Your Steel Scrap",
      heroL2: 'at <em class="grad">Best Rates</em> in Nashik',
      heroSub: "Fair digital tol. Sahi daam. Turant payment. HMS, MS, SS 304/316, cast iron and industrial scrap — free doorstep pickup across Nashik.",
      heroWa: "Get Best Rate on WhatsApp",
      badgeWeigh: "Fair Digital Weighing", badgePay: "Instant Payment", badgePickup: "Free Doorstep Pickup",
      heroCardLive: "Live today", perTon: "/ ton", heroCardNote: "Indicative rate. Final price after weighing on WhatsApp.", seeAllRates: "See all today's rates →",
      statYears: "Years of experience", statTons: "Tons of scrap collected", statClients: "Happy clients", statAreas: "Service areas covered",
      typesTitle: "Scrap we buy at best rates", typesIntro: "From household bhangar to full factory clearance — if it's metal, we weigh it right and pay the right daam.",
      ratesTitle: "Today's scrap rates (indicative)", ratesIntro: "Rates change daily with the market. Contact us on WhatsApp for the latest price before you sell.",
      thType: "Scrap type", thRate: "Rate (₹ / ton)", thTrend: "Trend", thAction: "Action",
      ratesNote: "Rates change daily. Contact on WhatsApp for the latest price.", getRate: "Get Rate on WhatsApp",
      estTitle: "Scrap value estimator", estIntro: "Pick your scrap type, enter the weight and get an instant ballpark value. No sign-up, no waiting.",
      estTypeLabel: "Scrap type", estWeightLabel: "Weight", unitKg: "kg", unitTon: "ton",
      estBtn: "Estimate value", estDisc: "Estimate only. Final rate on WhatsApp.", estConfirm: "Confirm price on WhatsApp",
      howTitle: "How it works", howIntro: "Four simple steps from your first message to money in your hand.",
      how1t: "Contact us", how1d: "Send us a WhatsApp message or call with your scrap type, rough quantity and location. We share the latest rate instantly.",
      how2t: "Inspection", how2d: "Our team visits your site for free, checks the material purity and grade, and confirms the final price with you.",
      how3t: "Weighing", how3d: "We weigh everything on a certified digital scale in front of you — full transparency, no guessing, no cutting corners.",
      how4t: "Instant payment", how4d: "Get paid immediately — cash, UPI or bank transfer. Then our team loads and clears everything so you're free.",
      whyTitle: "Why Nashik sells to Ashraf", whyIntro: "Sahi tol and sahi daam are not marketing words for us — they are how we have done business for over a decade.",
      why1t: "100% honest weighing", why1d: "Certified digital scales, zero manipulation. You see every kilogram on the display. Our name is built on fair tol.",
      why2t: "Best market rates", why2d: "We track daily scrap prices so your metal gets its true value — not an undercut number.",
      why3t: "Free doorstep pickup", why3d: "Our trucks reach your home, shop, warehouse or factory at no extra charge across Nashik.",
      why4t: "Instant payment", why4d: "Cash, UPI or bank transfer the moment weighing is done. No waiting, no excuses.",
      why5t: "Bulk & industrial deals", why5d: "Factories, warehouses and contractors get dedicated handling and priority pickup slots.",
      why6t: "Trusted since 2014", why6d: "Over 10 years, 5000+ tons and 500+ happy clients across Nashik district. Relationships that last far beyond one deal.",
      areasTitle: "Service areas in and around Nashik", areasIntro: "Free pickup across Nashik city and nearby industrial belts. Not sure if we cover you? Just message us.",
      galleryTitle: "From our yard", galleryIntro: "Real scrap, real trucks, real weighings. Tap any photo to view it larger.",
      testTitle: "What our clients say", testIntro: "Trusted by shopkeepers, households, factories and contractors across Nashik.",
      t1q: "\"Tol ekdum sahi tha. HMS scrap ka rate market se better mila aur paise turant UPI mein aa gaye. Very professional team.\"", t1n: "Rajesh Patil", t1r: "Factory owner, Satpur MIDC",
      t2q: "\"Ghar ka purana bhangar aur lokhand bech diya. Free pickup aaya, digital scale par wazan hua, koi gadbad nahi. Highly recommended.\"", t2n: "Sunita Deshmukh", t2r: "Homeowner, Panchavati",
      t3q: "\"We cleared an entire warehouse of old machinery and structural scrap. Ashraf Bhai handled everything and settled the payment the same day.\"", t3n: "Imran Shaikh", t3r: "Contractor, Ambad MIDC",
      faqTitle: "Frequently asked questions", faqIntro: "Everything about rates, pickup, payment and selling scrap in Nashik.",
      contactTitle: "Get in touch", contactIntro: "Send us an enquiry and we'll reply on WhatsApp within minutes during business hours.",
      cWa: "WhatsApp / Phone", cAddr: "Address", cTime: "Timings", cEmail: "Email",
      phWeight: "e.g. 500",
      footerTag: "Sahi Tol. Sahi Daam. Turant Payment.", footerBlurb: "Steel scrap buyer and kabadi in Nashik since 2014. HMS, MS, SS, cast iron and industrial scrap.",
      footerQuick: "Quick links", footerAreas: "Areas we serve", footerContact: "Contact", rights: "All rights reserved.", madein: "Made with care in Nashik 🇮🇳", builtby: "Built by", selectScrap: "Select scrap type"
    },
    hi: {
      skip: "मुख्य सामग्री पर जाएँ", tickerLabel: "आज के भाव",
      navScrap: "स्क्रैप", navRates: "भाव", navEstimator: "अनुमान", navHow: "कैसे काम करता है",
      navWhy: "हम क्यों", navAreas: "क्षेत्र", navGallery: "गैलरी", navFaq: "सवाल-जवाब", navContact: "संपर्क",
      waChat: "व्हाट्सएप", waSell: "व्हाट्सएप पर बेचें", callNow: "अभी कॉल करें", callAria: "आशराफ खान को कॉल करें",
      heroEyebrow: "2014 से नाशिक का भरोसेमंद कबाड़ और भंगार खरीदार",
      heroL1: "अपना लोहे का स्क्रैप बेचें",
      heroL2: 'नाशिक में <em class="grad">सबसे अच्छे भाव</em> पर',
      heroSub: "सही डिजिटल तोल। सही दाम। तुरंत पेमेंट। HMS, MS, SS 304/316, कास्ट आयरन और इंडस्ट्रियल स्क्रैप — पूरे नाशिक में मुफ्त घर तक पिकअप।",
      heroWa: "व्हाट्सएप पर सबसे अच्छा भाव पाएं",
      badgeWeigh: "सही डिजिटल तोल", badgePay: "तुरंत पेमेंट", badgePickup: "मुफ्त घर तक पिकअप",
      heroCardLive: "आज लाइव", perTon: "/ टन", heroCardNote: "अनुमानित भाव। तोल के बाद व्हाट्सएप पर अंतिम दाम।", seeAllRates: "आज के सभी भाव देखें →",
      statYears: "साल का अनुभव", statTons: "टन स्क्रैप एकत्र", statClients: "खुश ग्राहक", statAreas: "सेवा क्षेत्र",
      typesTitle: "सबसे अच्छे भाव पर हम यह स्क्रैप खरीदते हैं", typesIntro: "घर के भंगार से लेकर पूरी फैक्ट्री क्लीयरेंस तक — धातु है तो सही तोल और सही दाम पक्का।",
      ratesTitle: "आज के स्क्रैप भाव (अनुमानित)", ratesIntro: "भाव रोज़ बाज़ार के साथ बदलते हैं। बेचने से पहले ताज़ा भाव के लिए व्हाट्सएप पर संपर्क करें।",
      thType: "स्क्रैप का प्रकार", thRate: "भाव (₹ / टन)", thTrend: "रुझान", thAction: "कार्रवाई",
      ratesNote: "भाव रोज़ बदलते हैं। ताज़ा कीमत के लिए व्हाट्सएप पर संपर्क करें।", getRate: "व्हाट्सएप पर भाव पाएं",
      estTitle: "स्क्रैप मूल्य अनुमानक", estIntro: "अपना स्क्रैप चुनें, वज़न डालें और तुरंत अनुमानित मूल्य देखें। कोई साइन-अप नहीं, कोई इंतज़ार नहीं।",
      estTypeLabel: "स्क्रैप का प्रकार", estWeightLabel: "वज़न", unitKg: "किलो", unitTon: "टन",
      estBtn: "मूल्य का अनुमान लगाएं", estDisc: "केवल अनुमान। अंतिम भाव व्हाट्सएप पर।", estConfirm: "व्हाट्सएप पर भाव पक्का करें",
      howTitle: "यह कैसे काम करता है", howIntro: "पहले संदेश से हाथ में पैसे तक चार आसान कदम।",
      how1t: "संपर्क करें", how1d: "अपने स्क्रैप का प्रकार, अनुमानित मात्रा और लोकेशन के साथ व्हाट्सएप संदेश या कॉल करें। हम तुरंत ताज़ा भाव बताते हैं।",
      how2t: "निरीक्षण", how2d: "हमारी टीम मुफ्त में आपकी जगह आती है, मटेरियल की शुद्धता और ग्रेड जांचती है और अंतिम भाव तय करती है।",
      how3t: "तोल", how3d: "हम आपके सामने प्रमाणित डिजिटल कांटे पर सब तोलते हैं — पूरी पारदर्शिता, कोई गड़बड़ नहीं।",
      how4t: "तुरंत पेमेंट", how4d: "तुरंत भुगतान — नकद, UPI या बैंक ट्रांसफर। फिर हमारी टीम सब उठाकर ले जाती है।",
      whyTitle: "नाशिक क्यों आशराफ को बेचता है", whyIntro: "सही तोल और सही दाम हमारे लिए सिर्फ शब्द नहीं — दस साल से हमारा काम ऐसे ही चल रहा है।",
      why1t: "100% ईमानदार तोल", why1d: "प्रमाणित डिजिटल कांटा, कोई हेराफेरी नहीं। हर किलो आपके सामने डिस्प्ले पर।",
      why2t: "सबसे अच्छे बाज़ार भाव", why2d: "हम रोज़ स्क्रैप भाव ट्रैक करते हैं ताकि आपकी धातु को सही कीमत मिले।",
      why3t: "मुफ्त घर तक पिकअप", why3d: "हमारे ट्रक आपके घर, दुकान, गोदाम या फैक्ट्री तक बिना अतिरिक्त शुल्क पहुंचते हैं।",
      why4t: "तुरंत पेमेंट", why4d: "तोल खत्म होते ही नकद, UPI या बैंक ट्रांसफर। कोई इंतज़ार नहीं।",
      why5t: "थोक और औद्योगिक सौदे", why5d: "फैक्ट्री, गोदाम और ठेकेदारों को समर्पित सेवा और प्राथमिकता पिकअप।",
      why6t: "2014 से भरोसेमंद", why6d: "10+ साल, 5000+ टन और नाशिक जिले में 500+ खुश ग्राहक। एक सौदे से बढ़कर रिश्ते।",
      areasTitle: "नाशिक और आसपास सेवा क्षेत्र", areasIntro: "नाशिक शहर और नज़दीकी औद्योगिक क्षेत्रों में मुफ्त पिकअप। संदेह है? बस संदेश करें।",
      galleryTitle: "हमारे यार्ड से", galleryIntro: "असली स्क्रैप, असली ट्रक, असली तोल। बड़ा देखने के लिए फोटो पर टैप करें।",
      testTitle: "हमारे ग्राहक क्या कहते हैं", testIntro: "नाशिक के दुकानदारों, घरों, फैक्ट्रियों और ठेकेदारों का भरोसा।",
      t1q: "\"तोल एकदम सही था। HMS स्क्रैप का भाव बाज़ार से बेहतर मिला और पैसे तुरंत UPI में आ गए।\"", t1n: "राजेश पाटिल", t1r: "फैक्ट्री मालिक, सतपुर MIDC",
      t2q: "\"घर का पुराना भंगार और लोहा बेच दिया। मुफ्त पिकअप आया, डिजिटल कांटे पर वज़न हुआ, कोई गड़बड़ नहीं।\"", t2n: "सुनीता देशमुख", t2r: "गृहस्वामी, पंचवटी",
      t3q: "\"हमने पुरानी मशीनरी और स्ट्रक्चरल स्क्रैप का पूरा गोदाम खाली किया। आशराफ भाई ने सब संभाला और उसी दिन भुगतान किया।\"", t3n: "इमरान शेख", t3r: "ठेकेदार, अंबड MIDC",
      faqTitle: "अक्सर पूछे जाने वाले सवाल", faqIntro: "नाशिक में भाव, पिकअप, पेमेंट और स्क्रैप बेचने से जुड़ी हर बात।",
      contactTitle: "संपर्क करें", contactIntro: "अपनी जानकारी भेजें, हम काम के समय में कुछ ही मिनटों में व्हाट्सएप पर जवाब देते हैं।",
      cWa: "व्हाट्सएप / फोन", cAddr: "पता", cTime: "समय", cEmail: "ईमेल",
      phWeight: "उदा. 500",
      footerTag: "सही तोल. सही दाम. तुरंत पेमेंट.", footerBlurb: "2014 से नाशिक में स्टील स्क्रैप खरीदार और कबाड़ी। HMS, MS, SS, कास्ट आयरन और इंडस्ट्रियल स्क्रैप।",
      footerQuick: "त्वरित लिंक", footerAreas: "सेवा क्षेत्र", footerContact: "संपर्क", rights: "सर्वाधिकार सुरक्षित।", madein: "नाशिक में प्यार से बनाया गया 🇮🇳", builtby: "बनाया", selectScrap: "स्क्रैप का प्रकार चुनें"
    },
    mr: {
      skip: "मुख्य सामग्रीवर जा", tickerLabel: "आजचे दर",
      navScrap: "स्क्रॅप", navRates: "दर", navEstimator: "अंदाज", navHow: "कसे चालते",
      navWhy: "आम्ही का", navAreas: "भाग", navGallery: "गॅलरी", navFaq: "प्रश्न", navContact: "संपर्क",
      waChat: "व्हॉट्सअ‍ॅप", waSell: "व्हॉट्सअ‍ॅपवर विका", callNow: "आता कॉल करा", callAria: "आशराफ खान यांना कॉल करा",
      heroEyebrow: "2014 पासून नाशिकचा विश्वासू कबाड व भंगार खरेदीदार",
      heroL1: "तुमचा स्टील भंगार विका",
      heroL2: 'नाशिकमध्ये <em class="grad">सर्वोत्तम दरात</em>',
      heroSub: "योग्य डिजिटल तोल. योग्य दर. तात्काळ पैसे. HMS, MS, SS 304/316, कास्ट आयर्न आणि औद्योगिक भंगार — संपूर्ण नाशिकमध्ये मोफत घरपोच पिकअप.",
      heroWa: "व्हॉट्सअ‍ॅपवर सर्वोत्तम दर मिळवा",
      badgeWeigh: "योग्य डिजिटल तोल", badgePay: "तात्काळ पेमेंट", badgePickup: "मोफत घरपोच पिकअप",
      heroCardLive: "आज लाईव्ह", perTon: "/ टन", heroCardNote: "अंदाजे दर. तोलानंतर व्हॉट्सअ‍ॅपवर अंतिम दर.", seeAllRates: "आजचे सर्व दर पाहा →",
      statYears: "वर्षांचा अनुभव", statTons: "टन भंगार गोळा", statClients: "समाधानी ग्राहक", statAreas: "सेवा भाग",
      typesTitle: "आम्ही सर्वोत्तम दरात हा भंगार खरेदी करतो", typesIntro: "घरगुती भंगारापासून ते संपूर्ण कारखाना क्लिअरन्सपर्यंत — धातू असेल तर योग्य तोल आणि योग्य दर पक्का.",
      ratesTitle: "आजचे भंगार दर (अंदाजे)", ratesIntro: "दर रोज बाजारानुसार बदलतात. विकण्यापूर्वी ताज्या दरासाठी व्हॉट्सअ‍ॅपवर संपर्क करा.",
      thType: "भंगाराचा प्रकार", thRate: "दर (₹ / टन)", thTrend: "कल", thAction: "क्रिया",
      ratesNote: "दर रोज बदलतात. ताज्या किमतीसाठी व्हॉट्सअ‍ॅपवर संपर्क करा.", getRate: "व्हॉट्सअ‍ॅपवर दर मिळवा",
      estTitle: "भंगार मूल्य अंदाजक", estIntro: "तुमचा भंगार निवडा, वजन टाका आणि तात्काळ अंदाजे मूल्य पाहा. साइन-अप नाही, वाट नाही.",
      estTypeLabel: "भंगाराचा प्रकार", estWeightLabel: "वजन", unitKg: "किलो", unitTon: "टन",
      estBtn: "मूल्याचा अंदाज घ्या", estDisc: "फक्त अंदाज. अंतिम दर व्हॉट्सअ‍ॅपवर.", estConfirm: "व्हॉट्सअ‍ॅपवर दर निश्चित करा",
      howTitle: "हे कसे चालते", howIntro: "पहिल्या संदेशापासून हातात पैसे येईपर्यंत चार सोपे टप्पे.",
      how1t: "संपर्क करा", how1d: "तुमच्या भंगाराचा प्रकार, अंदाजे प्रमाण आणि ठिकाणासह व्हॉट्सअ‍ॅप संदेश किंवा कॉल करा. आम्ही तात्काळ ताजा दर सांगतो.",
      how2t: "तपासणी", how2d: "आमची टीम मोफत तुमच्या ठिकाणी येते, सामग्रीची शुद्धता व दर्जा तपासते आणि अंतिम दर ठरवते.",
      how3t: "तोल", how3d: "आम्ही तुमच्या समोर प्रमाणित डिजिटल काट्यावर सर्व तोलतो — पूर्ण पारदर्शकता, फसवणूक नाही.",
      how4t: "तात्काळ पेमेंट", how4d: "तात्काळ पैसे — रोख, UPI किंवा बँक ट्रान्सफर. नंतर आमची टीम सर्व उचलून नेते.",
      whyTitle: "नाशिक आशराफकडे का विकते", whyIntro: "योग्य तोल आणि योग्य दर हे आमच्यासाठी केवळ शब्द नाहीत — दहा वर्षांपासून आमचा व्यवसाय असाच चालतो.",
      why1t: "100% प्रामाणिक तोल", why1d: "प्रमाणित डिजिटल काटा, फसवणूक शून्य. प्रत्येक किलो तुमच्या समोर डिस्प्लेवर.",
      why2t: "सर्वोत्तम बाजारभाव", why2d: "आम्ही रोज भंगार भाव ट्रॅक करतो जेणेकरून तुमच्या धातूला योग्य किंमत मिळेल.",
      why3t: "मोफत घरपोच पिकअप", why3d: "आमचे ट्रक तुमच्या घर, दुकान, गोदाम किंवा कारखान्यापर्यंत अतिरिक्त शुल्काशिवाय पोहोचतात.",
      why4t: "तात्काळ पेमेंट", why4d: "तोल संपताच रोख, UPI किंवा बँक ट्रान्सफर. वाट नाही.",
      why5t: "घाऊक व औद्योगिक सौदे", why5d: "कारखाने, गोदामे आणि कंत्राटदारांना समर्पित सेवा व प्राधान्य पिकअप.",
      why6t: "2014 पासून विश्वासू", why6d: "10+ वर्षे, 5000+ टन आणि नाशिक जिल्ह्यात 500+ समाधानी ग्राहक. एका सौद्यापलीकडे नाती.",
      areasTitle: "नाशिक व परिसरातील सेवा भाग", areasIntro: "नाशिक शहर आणि जवळच्या औद्योगिक भागांत मोफत पिकअप. शंका? फक्त संदेश करा.",
      galleryTitle: "आमच्या यार्डमधून", galleryIntro: "खरे भंगार, खरे ट्रक, खरा तोल. मोठे पाहण्यासाठी फोटोवर टॅप करा.",
      testTitle: "आमचे ग्राहक काय म्हणतात", testIntro: "नाशिकच्या दुकानदार, घरे, कारखाने आणि कंत्राटदारांचा विश्वास.",
      t1q: "\"तोल अगदी योग्य होता. HMS भंगाराचा दर बाजारापेक्षा चांगला मिळाला आणि पैसे लगेच UPI मध्ये आले.\"", t1n: "राजेश पाटील", t1r: "कारखाना मालक, सतपूर MIDC",
      t2q: "\"घरातील जुना भंगार आणि लोखंड विकले. मोफत पिकअप आला, डिजिटल काट्यावर वजन झाले, काही गोंधळ नाही.\"", t2n: "सुनीता देशमुख", t2r: "गृहमालक, पंचवटी",
      t3q: "\"आम्ही जुनी यंत्रसामग्री व स्ट्रक्चरल भंगाराचे पूर्ण गोदाम रिकामे केले. आशराफ भाईंनी सर्व सांभाळले व त्याच दिवशी पेमेंट केले.\"", t3n: "इम्रान शेख", t3r: "कंत्राटदार, अंबड MIDC",
      faqTitle: "वारंवार विचारले जाणारे प्रश्न", faqIntro: "नाशिकमध्ये दर, पिकअप, पेमेंट आणि भंगार विकण्याबाबत सर्व काही.",
      contactTitle: "संपर्क साधा", contactIntro: "तुमची माहिती पाठवा, कामाच्या वेळेत आम्ही काही मिनिटांत व्हॉट्सअ‍ॅपवर उत्तर देतो.",
      cWa: "व्हॉट्सअ‍ॅप / फोन", cAddr: "पत्ता", cTime: "वेळ", cEmail: "ईमेल",
      phWeight: "उदा. 500",
      footerTag: "योग्य तोल. योग्य दर. तात्काळ पेमेंट.", footerBlurb: "2014 पासून नाशिकमध्ये स्टील भंगार खरेदीदार व कबाडी. HMS, MS, SS, कास्ट आयर्न आणि औद्योगिक भंगार.",
      footerQuick: "झटपट दुवे", footerAreas: "सेवा भाग", footerContact: "संपर्क", rights: "सर्व हक्क राखीव.", madein: "नाशिकमध्ये प्रेमाने बनवलेले 🇮🇳", builtby: "बनवले", selectScrap: "भंगाराचा प्रकार निवडा"
    }
  };
  var LANGS = ["en", "hi", "mr"];
  var LANG_LABEL = { en: "हिं", hi: "मरा", mr: "EN" };

  /* ========================================================================
     D. HELPERS
     ======================================================================== */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  function storageGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function storageSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function waLink(msg) { return "https://wa.me/" + CONFIG.phone + "?text=" + encodeURIComponent(msg || defaultWaMessage()); }
  function telLink() { return "tel:+" + CONFIG.phone; }
  function defaultWaMessage() {
    return currentLang === "hi" ? CONFIG.waMessageHi : (currentLang === "mr" ? CONFIG.waMessageMr : CONFIG.waMessage);
  }
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function formatINR(n) { try { return "₹" + Number(n).toLocaleString("en-IN"); } catch (e) { return "₹" + n; } }

  var ICONS = {
    beam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 6h18v3H3zM3 15h18v3H3zM10 9h4v6h-4z"/></svg>',
    sheet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M5 5h14v3H5zM5 10h14v3H5zM5 15h14v3H5z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/></svg>',
    coil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><path d="M12 3v3"/></svg>',
    pipe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 9h11a4 4 0 0 1 4 4v8"/><path d="M3 6v6M6 9v3M18 21h3"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>',
    mix: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 8h16M4 16h16"/><circle cx="8" cy="8" r="2"/><circle cx="16" cy="16" r="2"/><circle cx="14" cy="8" r="2"/></svg>'
  };

  /* ========================================================================
     E. FEATURE MODULES
     ======================================================================== */
  var currentLang = "en";
  function t(key) { var p = I18N[currentLang] || I18N.en; return p[key] != null ? p[key] : (I18N.en[key] != null ? I18N.en[key] : key); }
  function localize(obj) { return obj ? (obj[currentLang] || obj.en) : obj; }

  function applyStaticI18n() {
    $$("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = v; else el.textContent = v;
    });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    $$("[data-i18n-placeholder]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"))); });
    var langBtn = $("#langToggle");
    if (langBtn) { langBtn.textContent = LANG_LABEL[currentLang]; langBtn.setAttribute("aria-label", "Switch language / भाषा बदला"); }
    document.documentElement.lang = currentLang;
  }

  function setLang(lang) {
    currentLang = LANGS.indexOf(lang) > -1 ? lang : "en";
    storageSet("ashraf-lang", currentLang);
    applyStaticI18n();
    renderDynamic();
  }

  /* Theme */
  function setTheme(theme, persist) {
    var th = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", th);
    var btn = $("#themeToggle");
    if (btn) btn.setAttribute("aria-pressed", th === "light" ? "true" : "false");
    var meta = $("#themeColorMeta");
    if (meta) meta.setAttribute("content", th === "light" ? "#F4F5F7" : "#0B0D10");
    if (persist) storageSet("ashraf-theme", th);
  }
  function initTheme() {
    var saved = storageGet("ashraf-theme");
    if (saved === "light" || saved === "dark") { setTheme(saved, false); return; }
    setTheme("light", false); // default theme is white/light
  }

  /* Contact links */
  function initContactLinks() {
    $$("[data-wa]").forEach(function (el) {
      var m = el.getAttribute("data-wa-msg");
      if (!m || m === CONFIG.waMessage) m = defaultWaMessage(); // generic CTAs follow the active language
      el.setAttribute("href", waLink(m));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
    $$("[data-tel]").forEach(function (el) { el.setAttribute("href", telLink()); });
    ["#cPhoneText", "#footerPhone"].forEach(function (id) { var el = $(id); if (el) el.textContent = CONFIG.phoneDisplay; });
    var a = $("#cAddrText"); if (a) a.textContent = CONFIG.address;
    var fa = $("#footerAddr"); if (fa) fa.textContent = CONFIG.address;
    var e = $("#cEmailText"); if (e) e.textContent = CONFIG.email;
    applyTimings();
  }
  function applyTimings() {
    var tm = $("#cTimeText");
    var ft = $("#footerTime");
    var val = currentLang === "hi" ? CONFIG.timingsHi : (currentLang === "mr" ? CONFIG.timingsMr : CONFIG.timings);
    if (tm) tm.textContent = val;
    if (ft) ft.textContent = val;
  }

  /* Ticker + hero rate */
  function renderTicker() {
    var track = $("#tickerTrack");
    if (!track) return;
    var items = RATES.map(function (r) {
      var label = localize(r);
      var arrow = r.trend === "up" ? "▲" : (r.trend === "down" ? "▼" : "•");
      var cls = r.trend === "up" ? "up" : (r.trend === "down" ? "down" : "");
      return '<span class="ticker__item">' + escapeHtml(label) + ' <b>' + formatINR(r.rate) + "</b>/ton <span class=\"" + cls + "\">" + arrow + "</span></span>";
    });
    track.innerHTML = items.join("") + items.join("");
    var hr = $("#heroRate"); if (hr && RATES[0]) hr.textContent = formatINR(RATES[0].rate);
  }

  /* Marquee */
  function renderMarquee() {
    var track = $("#marqueeTrack");
    if (!track) return;
    var words = ["HMS", "MS SCRAP", "SS 304", "CAST IRON", "TURNING", "RAIL SCRAP", "PIPES"];
    var html = "";
    for (var i = 0; i < 2; i++) words.forEach(function (w) { html += "<span>" + w + '</span><span class="sep">•</span>'; });
    track.innerHTML = html;
  }

  /* Scrap cards */
  function renderScrapCards() {
    var wrap = $("#scrapCards");
    if (!wrap) return;
    wrap.innerHTML = SCRAP_TYPES.map(function (s) {
      var c = localize(s);
      var msg = currentLang === "en"
        ? "Hello Ashraf Bhai, I want to sell " + c.t + ". Please share the rate."
        : (currentLang === "hi" ? "नमस्ते आशराफ भाई, मुझे " + c.t + " बेचना है। कृपया भाव बताएं।" : "नमस्कार आशराफ भाई, मला " + c.t + " विकायचा आहे. कृपया दर सांगा.");
      return '<article class="card tilt reveal">' +
          '<span class="card__icon" aria-hidden="true">' + (ICONS[s.icon] || ICONS.cube) + "</span>" +
          "<h3>" + escapeHtml(c.t) + "</h3><p>" + escapeHtml(c.d) + "</p>" +
          '<a class="btn btn--wa card__cta" href="' + waLink(msg) + '" target="_blank" rel="noopener noreferrer" data-wa data-wa-msg="' + escapeHtml(msg) + '">' +
            '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-1.7-.6-3.6-2.2-4.9-4.3-.5-.8-.9-1.8-.9-2.6 0-.8.4-1.5.7-1.8.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2.1.4 0 .6l-.4.6c-.2.2-.3.3-.1.6.5.9 1.2 1.6 2.1 2.1.3.2.5.1.7-.1l.6-.7c.2-.2.4-.2.6-.1l1.7.8c.4.2.5.3.5.5 0 .1 0 .6-.2 1Z"/></svg>' +
            "<span>" + t("getRate") + "</span></a></article>";
    }).join("");
    if (window.__ashrafReveal) window.__ashrafReveal(wrap);
    initTilt(wrap);
    initButtons(wrap);
  }

  /* Rates table */
  function renderRatesTable() {
    var body = $("#ratesBody");
    if (!body) return;
    body.innerHTML = RATES.map(function (r) {
      var label = localize(r);
      var tr = r.trend === "up" ? '<span class="trend up">▲ ' + (currentLang === "en" ? "Up" : (currentLang === "hi" ? "बढ़त" : "वाढ")) + "</span>"
             : r.trend === "down" ? '<span class="trend down">▼ ' + (currentLang === "en" ? "Down" : (currentLang === "hi" ? "गिरावट" : "घट")) + "</span>"
             : '<span class="trend flat">• ' + (currentLang === "en" ? "Stable" : (currentLang === "hi" ? "स्थिर" : "स्थिर")) + "</span>";
      var msg = currentLang === "en" ? "Hello Ashraf Bhai, please share today's rate for " + label + "."
              : (currentLang === "hi" ? "नमस्ते आशराफ भाई, " + label + " का आज का भाव बताएं।" : "नमस्कार आशराफ भाई, " + label + " चा आजचा दर सांगा.");
      return "<tr>" +
        '<td data-label="' + escapeHtml(t("thType")) + '">' + escapeHtml(label) + "</td>" +
        '<td data-label="' + escapeHtml(t("thRate")) + '" class="rate">' + formatINR(r.rate) + "</td>" +
        '<td data-label="' + escapeHtml(t("thTrend")) + '">' + tr + "</td>" +
        '<td data-label="' + escapeHtml(t("thAction")) + '"><a class="btn btn--wa" href="' + waLink(msg) + '" target="_blank" rel="noopener noreferrer" data-wa data-wa-msg="' + escapeHtml(msg) + '">' + t("getRate") + "</a></td></tr>";
    }).join("");
    initButtons(body);
  }

  function fillRateOptions(select, withPlaceholder) {
    if (!select) return;
    var keep = select.value;
    var html = withPlaceholder ? '<option value="" disabled>' + escapeHtml(t("selectScrap")) + "</option>" : "";
    html += RATES.map(function (r) { return '<option value="' + r.id + '">' + escapeHtml(localize(r)) + "</option>"; }).join("");
    select.innerHTML = html;
    if (keep && select.querySelector('option[value="' + keep + '"]')) select.value = keep;
  }
  function rateById(id) { for (var i = 0; i < RATES.length; i++) if (RATES[i].id === id) return RATES[i]; return null; }

  /* Estimator */
  var estState = { value: 0, typeId: "", weight: 0, unit: "kg", rate: 0, valid: false };
  var estRaf = null;

  function estMessage() {
    if (!estState.valid) return defaultWaMessage();
    var typeLabel = localize(rateById(estState.typeId));
    var unit = estState.unit === "kg" ? t("unitKg") : t("unitTon");
    if (currentLang === "en") return "Hello Ashraf Bhai, estimator result: " + typeLabel + ", weight " + estState.weight + " " + estState.unit + ", estimated value " + formatINR(estState.value) + ". Please confirm the final rate.";
    if (currentLang === "hi") return "नमस्ते आशराफ भाई, अनुमानक: " + typeLabel + ", वज़न " + estState.weight + " " + unit + ", अनुमानित मूल्य " + formatINR(estState.value) + "। कृपया अंतिम भाव बताएं।";
    return "नमस्कार आशराफ भाई, अंदाजक: " + typeLabel + ", वजन " + estState.weight + " " + unit + ", अंदाजे मूल्य " + formatINR(estState.value) + ". कृपया अंतिम दर सांगा.";
  }
  function refreshEstimatorText() {
    var meta = $("#estMeta"), confirm = $("#estConfirm");
    if (meta) {
      if (estState.valid) meta.textContent = estState.weight + " " + (estState.unit === "kg" ? t("unitKg") : t("unitTon")) + " × " + formatINR(estState.rate) + "/ton";
      else meta.textContent = "";
    }
    if (confirm) { var m = estMessage(); confirm.setAttribute("href", waLink(m)); confirm.setAttribute("data-wa-msg", m); }
  }
  function initEstimator() {
    var form = $("#estimatorForm");
    if (!form) return;
    var typeSel = $("#estType"), weightIn = $("#estWeight"), unitSel = $("#estUnit");
    var valueEl = $("#estValue"), metaEl = $("#estMeta"), confirm = $("#estConfirm");
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var r = rateById(typeSel.value);
      var w = parseFloat(weightIn.value);
      var unit = unitSel.value;
      if (estRaf) { cancelAnimationFrame(estRaf); estRaf = null; }
      if (!r) {
        estState.valid = false; valueEl.textContent = formatINR(0);
        metaEl.textContent = currentLang === "en" ? "Please choose a scrap type." : (currentLang === "hi" ? "कृपया स्क्रैप का प्रकार चुनें।" : "कृपया भंगाराचा प्रकार निवडा.");
        return;
      }
      if (!w || w <= 0) {
        estState.valid = false; valueEl.textContent = formatINR(0);
        metaEl.textContent = currentLang === "en" ? "Please enter a valid weight." : (currentLang === "hi" ? "कृपया वज़न डालें।" : "कृपया वजन टाका.");
        return;
      }
      var value = Math.round((unit === "kg" ? w / 1000 : w) * r.rate);
      estState = { value: value, typeId: r.id, weight: w, unit: unit, rate: r.rate, valid: true };
      refreshEstimatorText();

      var shown = Number((valueEl.textContent || "0").replace(/[^0-9]/g, "")) || 0;
      if (reduced) { valueEl.textContent = formatINR(value); return; }
      var t0 = null, dur = 500;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        valueEl.textContent = formatINR(Math.round(shown + (value - shown) * (1 - Math.pow(1 - p, 3))));
        estRaf = p < 1 ? requestAnimationFrame(step) : null;
      }
      estRaf = requestAnimationFrame(step);
    });
  }

  /* Areas */
  function renderAreas() {
    var list = $("#areasList");
    if (!list) return;
    list.innerHTML = CONFIG.areas.map(function (a) { return "<li>" + escapeHtml(a) + "</li>"; }).join("");
    if (window.__ashrafReveal) window.__ashrafReveal(list);
  }

  /* Gallery + lightbox */
  var galleryItems = [], lbIndex = 0;
  function renderGallery() {
    var grid = $("#gallery-grid");
    if (!grid) return;
    grid.innerHTML = GALLERY.map(function (g, i) {
      return '<figure class="gallery-item reveal" data-index="' + i + '" data-fallback="' + escapeHtml(g.alt) + '" tabindex="0" role="button" aria-label="View image: ' + escapeHtml(g.alt) + '">' +
        '<img src="' + g.file + '" alt="' + escapeHtml(g.alt) + '" width="' + g.w + '" height="' + g.h + '" loading="lazy" decoding="async" onerror="this.closest(\'.gallery-item\').classList.add(\'img-missing\')" />' +
        "<figcaption>" + escapeHtml(g.alt) + "</figcaption></figure>";
    }).join("");
    galleryItems = GALLERY.slice();
    if (window.__ashrafReveal) window.__ashrafReveal(grid);
    initLightbox();
  }
  function openLightbox(i) {
    var lb = $("#lightbox"), img = $("#lbImg");
    if (!lb || !img || !galleryItems.length) return;
    lbIndex = (i + galleryItems.length) % galleryItems.length;
    img.src = galleryItems[lbIndex].file; img.alt = galleryItems[lbIndex].alt;
    lb.hidden = false; requestAnimationFrame(function () { lb.classList.add("is-open"); });
    document.body.style.overflow = "hidden";
    var c = $("#lbClose"); if (c) c.focus();
  }
  function closeLightbox() {
    var lb = $("#lightbox"); if (!lb) return;
    lb.classList.remove("is-open"); document.body.style.overflow = "";
    setTimeout(function () { lb.hidden = true; }, 300);
  }
  function initLightbox() {
    var grid = $("#gallery-grid");
    if (!grid || grid.dataset.bound) return;
    grid.dataset.bound = "1";
    grid.addEventListener("click", function (e) { var f = e.target.closest(".gallery-item"); if (f) openLightbox(Number(f.getAttribute("data-index"))); });
    grid.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var f = e.target.closest(".gallery-item"); if (f) { e.preventDefault(); openLightbox(Number(f.getAttribute("data-index"))); }
    });
    var close = $("#lbClose"), prev = $("#lbPrev"), next = $("#lbNext");
    if (close) close.addEventListener("click", closeLightbox);
    if (prev) prev.addEventListener("click", function () { openLightbox(lbIndex - 1); });
    if (next) next.addEventListener("click", function () { openLightbox(lbIndex + 1); });
    var lb = $("#lightbox");
    if (lb) {
      lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
      var sx = null;
      lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener("touchend", function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) openLightbox(lbIndex + (dx < 0 ? 1 : -1)); sx = null; }, { passive: true });
    }
    document.addEventListener("keydown", function (e) {
      if (!lb || lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
      if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
    });
  }

  /* FAQ */
  function renderFaq() {
    var wrap = $("#faq-list");
    if (!wrap) return;
    wrap.innerHTML = FAQ.map(function (f, i) {
      var c = localize(f);
      return '<div class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-' + i + '" id="faq-q-' + i + '"><span>' + escapeHtml(c.q) + '</span><span class="faq__icon" aria-hidden="true"></span></button>' +
        '<div class="faq__a" id="faq-a-' + i + '" role="region" aria-labelledby="faq-q-' + i + '"><div class="faq__a-inner">' + escapeHtml(c.a) + "</div></div></div>";
    }).join("");
    $$(".faq__q", wrap).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement, panel = btn.nextElementSibling, open = item.classList.contains("is-open");
        $$(".faq__item.is-open", wrap).forEach(function (o) {
          o.classList.remove("is-open");
          var b = $(".faq__q", o); if (b) b.setAttribute("aria-expanded", "false");
          var p = $(".faq__a", o); if (p) p.style.maxHeight = null;
        });
        if (!open) { item.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); panel.style.maxHeight = panel.scrollHeight + "px"; }
      });
    });
  }

  /* Counters */
  function initCounters() {
    var nums = $$(".stat__num");
    if (!nums.length) return;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function run(el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0, suffix = el.getAttribute("data-suffix") || "";
      if (reduced) { el.textContent = target.toLocaleString("en-IN") + suffix; return; }
      var t0 = null, dur = 1300;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN") + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }); }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* Reveal */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      window.__ashrafReveal = function (root) { $$(".reveal", root || document).forEach(function (el) { el.classList.add("is-visible"); }); };
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    function observeAll(root) {
      $$(".reveal", root || document).forEach(function (el) { if (!el.classList.contains("is-visible")) io.observe(el); });
    }
    window.__ashrafReveal = observeAll;
    observeAll(document);
  }

  /* Nav + mobile menu */
  function initNav() {
    var nav = $("#nav");
    function onScroll() { if (nav) nav.classList.toggle("is-stuck", (window.scrollY || 0) > 30); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var sections = $$("[data-nav]");
    if (sections.length && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var id = en.target.getAttribute("id");
            $$(".nav__links a").forEach(function (a) { a.classList.remove("is-active"); });
            $$('.nav__links a[href="#' + id + '"]').forEach(function (a) { a.classList.add("is-active"); });
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(function (s) { io.observe(s); });
    }

    var menuBtn = $("#menuBtn"), menu = $("#mobileMenu"), closeTimer = null;
    function setMenu(open) {
      if (!menu || !menuBtn) return;
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      if (open) {
        menu.hidden = false;
        document.body.classList.add("menu-open");
        requestAnimationFrame(function () { menu.classList.add("is-open"); });
        document.body.style.overflow = "hidden";
        var first = menu.querySelector("a"); if (first) setTimeout(function () { first.focus(); }, 60);
      } else {
        menu.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        document.body.style.overflow = "";
        closeTimer = setTimeout(function () { menu.hidden = true; closeTimer = null; }, 340);
      }
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    if (menuBtn) menuBtn.addEventListener("click", function () { setMenu(!(menu && menu.classList.contains("is-open"))); });
    if (menu) $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); menuBtn && menuBtn.focus(); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu && menu.classList.contains("is-open")) { setMenu(false); if (menuBtn) menuBtn.focus(); } });
    // close when resizing up to desktop (menu no longer reachable otherwise)
    var onResize = function () { if (window.innerWidth > 1080 && menu && menu.classList.contains("is-open")) setMenu(false); };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
  }

  /* Scroll progress + back to top */
  function initScrollUI() {
    var bar = $("#scrollProgress"), top = $("#backTop");
    function onScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      if (top) top.hidden = !(window.scrollY > 640);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (top) top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* Tilt + spotlight */
  function initTilt(root) {
    if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    $$(".tilt, .card, .bento__cell", root || document).forEach(function (el) {
      if (el.dataset.tiltBound) return; el.dataset.tiltBound = "1";
      var raf = null, rect = null, ex = 0, ey = 0;
      el.addEventListener("pointermove", function (e) {
        ex = e.clientX; ey = e.clientY;
        if (!rect) rect = el.getBoundingClientRect();
        var x = (ex - rect.left) / rect.width, y = (ey - rect.top) / rect.height;
        el.style.setProperty("--mx", (x * 100) + "%"); el.style.setProperty("--my", (y * 100) + "%");
        if (raf) return;
        el.classList.add("tilting");
        raf = requestAnimationFrame(function () {
          raf = null;
          var rx = (0.5 - y) * 7, ry = (x - 0.5) * 9;
          el.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-3px)";
        });
      });
      el.addEventListener("pointerleave", function () {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        el.style.transform = ""; el.classList.remove("tilting"); rect = null;
      });
    });
  }

  /* Buttons: ripple (idempotent) + magnetic */
  function initButtons(root) {
    var fine = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    $$(".btn", root || document).forEach(function (btn) {
      if (!btn.dataset.rippleBound) {
        btn.dataset.rippleBound = "1";
        btn.addEventListener("click", function (e) {
          var r = document.createElement("span"), rect = btn.getBoundingClientRect();
          var size = Math.max(rect.width, rect.height);
          r.className = "ripple"; r.style.width = r.style.height = size + "px";
          r.style.left = (e.clientX - rect.left - size / 2) + "px"; r.style.top = (e.clientY - rect.top - size / 2) + "px";
          btn.appendChild(r); setTimeout(function () { r.remove(); }, 620);
        });
      }
      if (fine && !reduced && btn.classList.contains("btn--magnetic") && !btn.dataset.magBound) {
        btn.dataset.magBound = "1";
        var rect = null;
        btn.addEventListener("pointermove", function (e) {
          if (!rect) rect = btn.getBoundingClientRect();
          btn.style.transform = "translate(" + (((e.clientX - rect.left) / rect.width - 0.5) * 10) + "px," + (((e.clientY - rect.top) / rect.height - 0.5) * 7) + "px)";
        });
        btn.addEventListener("pointerleave", function () { btn.style.transform = ""; rect = null; });
      }
    });
  }

  /* Cursor glow */
  function initCursor() {
    var glow = $("#cursorGlow");
    if (!glow) return;
    if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    glow.style.display = "block";
    var x = 0, y = 0, cx = 0, cy = 0, idle = null;
    document.addEventListener("pointermove", function (e) {
      x = e.clientX; y = e.clientY; glow.style.opacity = "1";
      if (idle) clearTimeout(idle);
      idle = setTimeout(function () { glow.style.opacity = "0"; }, 1600);
    });
    document.addEventListener("pointerleave", function () { glow.style.opacity = "0"; });
    (function loop() { cx += (x - cx) * 0.15; cy += (y - cy) * 0.15; glow.style.left = cx + "px"; glow.style.top = cy + "px"; requestAnimationFrame(loop); })();
  }

  /* Hero sparks */
  function initSparks() {
    var canvas = $("#sparks");
    if (!canvas) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var ctx = canvas.getContext("2d"); if (!ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2), w = 0, h = 0, raf = null, running = true, parts = [];
    function resize() {
      var r = canvas.parentElement.getBoundingClientRect(); w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function make() {
      parts = []; var count = Math.min(38, Math.round(w / 26));
      for (var i = 0; i < count; i++) parts.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + 0.6, vx: (Math.random() - 0.5) * 0.22, vy: -(Math.random() * 0.36 + 0.1), a: Math.random() * 0.5 + 0.2, hue: Math.random() > 0.5 ? 32 : 22 });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i]; p.x += p.vx; p.y += p.vy;
        if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
        if (p.x < -6) p.x = w + 6; if (p.x > w + 6) p.x = -6;
        ctx.fillStyle = "hsla(" + p.hue + ",100%,58%," + p.a + ")";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    function start() { if (!running) { running = true; draw(); } }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }
    var rt = null;
    function onResize() { if (rt) cancelAnimationFrame(rt); rt = requestAnimationFrame(function () { resize(); make(); }); }
    resize(); make(); draw();
    window.addEventListener("resize", onResize);
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) start(); else stop(); }); }, { threshold: 0 });
      io.observe(canvas.parentElement);
    }
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
  }

  /* Preloader (short) */
  function initPreloader() {
    var pre = $("#preloader"), done = false;
    function finish() { if (done) return; done = true; if (pre) pre.classList.add("done"); document.body.classList.add("is-loaded"); }
    window.addEventListener("load", finish);
    document.addEventListener("DOMContentLoaded", function () { setTimeout(finish, 350); });
    setTimeout(finish, 500);
  }

  function initYear() { var y = $("#year"); if (y) y.textContent = String(new Date().getFullYear()); }

  function initToggles() {
    var themeBtn = $("#themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", function () { setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light", true); });
    var langBtn = $("#langToggle");
    if (langBtn) langBtn.addEventListener("click", function () { var i = LANGS.indexOf(currentLang); setLang(LANGS[(i + 1) % LANGS.length]); });
  }

  /* Re-render everything that depends on data / language */
  function renderDynamic() {
    initContactLinks();
    renderTicker();
    renderMarquee();
    renderScrapCards();
    renderRatesTable();
    fillRateOptions($("#estType"), true);
    renderAreas();
    renderGallery();
    renderFaq();
    applyTimings();
    refreshEstimatorText();
  }

  /* ========================================================================
     F. BOOT
     ======================================================================== */
  function boot() {
    var savedLang = storageGet("ashraf-lang");
    currentLang = LANGS.indexOf(savedLang) > -1 ? savedLang : "en";

    initTheme();
    initContactLinks();
    initReveal();
    applyStaticI18n();
    renderDynamic();
    initEstimator();
    initCounters();
    initNav();
    initScrollUI();
    initButtons(document);
    initTilt(document);
    initCursor();
    initSparks();
    initPreloader();
    initYear();
    initToggles();

    window.ASHRAF = { CONFIG: CONFIG, RATES: RATES, SCRAP_TYPES: SCRAP_TYPES, FAQ: FAQ };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
