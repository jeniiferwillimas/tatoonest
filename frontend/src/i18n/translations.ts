export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

type TranslationStrings = {
  // Nav
  "nav.findArtists": string;
  "nav.byLocation": string;
  "nav.byStyle": string;
  "nav.browseStudios": string;
  "nav.forArtists": string;
  "nav.joinAsArtist": string;
  "nav.pricing": string;
  "nav.designTools": string;
  "nav.aiGenerator": string;
  "nav.customDesign": string;
  "nav.blog": string;
  "nav.signIn": string;
  "nav.artistResources": string;
  "nav.freeProfile": string;

  // Hero
  "hero.badge": string;
  "hero.title1": string;
  "hero.titleItalic": string;
  "hero.title2": string;
  "hero.desc": string;
  "hero.where": string;
  "hero.city": string;
  "hero.style": string;
  "hero.findArtists": string;
  "hero.mostListed": string;
  "hero.citiesWorldwide": string;

  // This Week
  "week.title1": string;
  "week.title2": string;
  "week.newArtists": string;
  "week.newArtistsCount": string;
  "week.thisWeek": string;
  "week.seeAll": string;
  "week.alsoNew": string;
  "week.newBadge": string;
  "week.journal": string;

  // How it works
  "how.know": string;
  "how.knowDesc": string;
  "how.knowLink": string;
  "how.ideas": string;
  "how.ideasDesc": string;
  "how.ideasLink": string;
  "how.cost": string;
  "how.costDesc": string;
  "how.costLink": string;

  // Browse by Style
  "styles.badge": string;
  "styles.title1": string;
  "styles.titleItalic": string;
  "styles.title2": string;
  "styles.all": string;
  "styles.artists": string;

  // Popular Cities
  "cities.badge": string;
  "cities.title1": string;
  "cities.titleItalic": string;
  "cities.all": string;

  // Price Estimator
  "price.badge": string;
  "price.title1": string;
  "price.titleItalic": string;
  "price.title2": string;
  "price.desc": string;
  "price.city": string;
  "price.yourCity": string;
  "price.size": string;
  "price.ink": string;
  "price.blackGrey": string;
  "price.colour": string;
  "price.detail": string;
  "price.simple": string;
  "price.detailed": string;
  "price.veryDetailed": string;
  "price.artist": string;
  "price.rising": string;
  "price.established": string;
  "price.inDemand": string;
  "price.localPrices": string;
  "price.priceGuide": string;
  "price.getDesign": string;

  // Size options
  "size.tiny": string;
  "size.tinyDesc": string;
  "size.small": string;
  "size.smallDesc": string;
  "size.medium": string;
  "size.mediumDesc": string;
  "size.large": string;
  "size.largeDesc": string;
  "size.halfSleeve": string;
  "size.halfSleeveDesc": string;
  "size.backPiece": string;
  "size.backPieceDesc": string;

  // For Artists
  "artists.badge": string;
  "artists.title1": string;
  "artists.titleItalic": string;
  "artists.desc": string;
  "artists.cta": string;
  "artists.step1": string;
  "artists.step1Desc": string;
  "artists.step2": string;
  "artists.step2Desc": string;
  "artists.step3": string;
  "artists.step3Desc": string;

  // Newsletter
  "newsletter.title": string;
  "newsletter.desc": string;
  "newsletter.placeholder": string;
  "newsletter.subscribe": string;

  // Footer
  "footer.desc": string;
  "footer.explore": string;
  "footer.popularCities": string;
  "footer.tattooStyles": string;
  "footer.resources": string;
  "footer.topCities": string;
  "footer.topStyles": string;
  "footer.featuredArtists": string;
  "footer.copyright": string;
  "footer.findArtist": string;
  "footer.findArtistDesc": string;
  "footer.browseStyle": string;
  "footer.browseStyleDesc": string;
  "footer.browseCity": string;
  "footer.browseCityDesc": string;
  "footer.browseStudios": string;
  "footer.browseStudiosDesc": string;
  "footer.estimateCost": string;
  "footer.estimateCostDesc": string;
  "footer.artistPricing": string;
  "footer.artistPricingDesc": string;
  "footer.artistDashboard": string;
  "footer.savedArtists": string;
  "footer.joinAsArtist": string;
  "footer.terms": string;
  "footer.privacy": string;
  "footer.cookies": string;

  // Auth Modal
  "auth.welcomeBack": string;
  "auth.createAccount": string;
  "auth.loginDesc": string;
  "auth.registerDesc": string;
  "auth.name": string;
  "auth.email": string;
  "auth.password": string;
  "auth.forgotPassword": string;
  "auth.minChars": string;
  "auth.login": string;
  "auth.register": string;
  "auth.loading": string;
  "auth.notMember": string;
  "auth.signUp": string;
  "auth.alreadyMember": string;
  "auth.termsAgree": string;
  "auth.termsLink": string;
  "auth.privacyLink": string;

  // Artists Browse Page
  "browse.badge": string;
  "browse.title1": string;
  "browse.titleItalic": string;
  "browse.search": string;
  "browse.searchPlaceholder": string;
  "browse.allStyles": string;
  "browse.sort": string;
  "browse.newest": string;
  "browse.popular": string;
  "browse.noResults": string;
  "browse.noResultsDesc": string;
  "browse.viewProfile": string;
  "browse.reviews": string;

  // Saved Page
  "saved.badge": string;
  "saved.title1": string;
  "saved.titleItalic": string;
  "saved.desc": string;
  "saved.emptyTitle": string;
  "saved.emptyDesc": string;

  // Join Page
  "join.badge": string;
  "join.title1": string;
  "join.title2": string;
  "join.desc": string;
  "join.free": string;
  "join.upload": string;
  "join.reviewed": string;
  "join.createAccount": string;
  "join.haveAccount": string;
  "join.accountNote": string;
  "join.stepsTitle": string;
  "join.whatYouDo": string;
  "join.step1": string;
  "join.step1Desc": string;
  "join.step2": string;
  "join.step2Desc": string;
  "join.step3": string;
  "join.step3Desc": string;
  "join.step4": string;
  "join.step4Desc": string;
  "join.step5": string;
  "join.step5Desc": string;
  "join.step6": string;
  "join.step6Desc": string;

  // Pricing
  "pricing.badge": string;
  "pricing.title1": string;
  "pricing.titleItalic": string;
  "pricing.desc": string;
  "pricing.monthly": string;
  "pricing.yearly": string;
  "pricing.popular": string;
  "pricing.getStarted": string;
  "pricing.currentPlan": string;

  // Blog
  "blog.badge": string;
  "blog.title1": string;
  "blog.titleItalic": string;
  "blog.readMore": string;

  // Design Tools
  "design.badge": string;
  "design.title1": string;
  "design.titleItalic": string;
  "design.desc": string;

  // Onboarding
  "onboard.artistOnboarding": string;
  "onboard.startProfile": string;
  "onboard.startProfileDesc": string;
  "onboard.verify": string;
  "onboard.verifyDesc": string;
  "onboard.addPhotos": string;
  "onboard.addPhotosDesc": string;
  "onboard.addDetails": string;
  "onboard.addDetailsDesc": string;
  "onboard.submit": string;
  "onboard.submitDesc": string;

  // Common
  "common.worldwide": string;
  "common.artists": string;
  "common.new": string;
  "common.continue": string;
};

const en: TranslationStrings = {
  "nav.findArtists": "Find Artists",
  "nav.byLocation": "By Location",
  "nav.byStyle": "By Style",
  "nav.browseStudios": "Browse Studios",
  "nav.forArtists": "For Artists",
  "nav.joinAsArtist": "Join as Artist",
  "nav.pricing": "Pricing",
  "nav.designTools": "Design Tools",
  "nav.aiGenerator": "AI Tattoo Generator",
  "nav.customDesign": "Custom Design",
  "nav.blog": "Blog",
  "nav.signIn": "Sign In",
  "nav.artistResources": "Artist Resources",
  "nav.freeProfile": "Free Artist Profile",

  "hero.badge": "Find a Tattoo Artist",
  "hero.title1": "The right artist for ",
  "hero.titleItalic": "your idea",
  "hero.title2": ", near you.",
  "hero.desc": "Real portfolios from {artists} artists across {styles} styles. Filter by style and city, save what you love, and book directly.",
  "hero.where": "Where",
  "hero.city": "City",
  "hero.style": "Style",
  "hero.findArtists": "Find artists",
  "hero.mostListed": "Most listed worldwide",
  "hero.citiesWorldwide": "cities worldwide",

  "week.title1": "This week on ",
  "week.title2": "TattooNest",
  "week.newArtists": "New Artists",
  "week.newArtistsCount": "30 new artists",
  "week.thisWeek": " this week",
  "week.seeAll": "See all new artists",
  "week.alsoNew": "Also new:",
  "week.newBadge": "New",
  "week.journal": "New on the journal",

  "how.know": "I know what I want",
  "how.knowDesc": "Pick a city and a style and compare portfolios side by side.",
  "how.knowLink": "Browse artists →",
  "how.ideas": "I need ideas",
  "how.ideasDesc": "Save tattoos to boards, then send your board to up to three artists.",
  "how.ideasLink": "Start a board →",
  "how.cost": "What will it cost?",
  "how.costDesc": "Get an estimate for your size, style and city before you message anyone.",
  "how.costLink": "Estimate your price →",

  "styles.badge": "Browse by Style",
  "styles.title1": "Find ",
  "styles.titleItalic": "your",
  "styles.title2": " style",
  "styles.all": "All styles",
  "styles.artists": "artists",

  "cities.badge": "Popular Cities",
  "cities.title1": "Or start ",
  "cities.titleItalic": "with a place",
  "cities.all": "All cities",

  "price.badge": "Before You Message Anyone",
  "price.title1": "What will ",
  "price.titleItalic": "your",
  "price.title2": " tattoo cost?",
  "price.desc": "Four things set the price: size, colour, detail and the artist. Pick yours to see a typical range.",
  "price.city": "City",
  "price.yourCity": "Your city",
  "price.size": "Size",
  "price.ink": "Ink",
  "price.blackGrey": "Black & grey",
  "price.colour": "Colour",
  "price.detail": "Detail",
  "price.simple": "Simple",
  "price.detailed": "Detailed",
  "price.veryDetailed": "Very detailed",
  "price.artist": "Artist",
  "price.rising": "Rising",
  "price.established": "Established",
  "price.inDemand": "In demand",
  "price.localPrices": "Add your city to see local prices.",
  "price.priceGuide": "Read the full price guide",
  "price.getDesign": "Get a Custom Design",

  "size.tiny": "Tiny",
  "size.tinyDesc": "Wrist or finger",
  "size.small": "Small",
  "size.smallDesc": "Palm-sized",
  "size.medium": "Medium",
  "size.mediumDesc": "Hand-sized",
  "size.large": "Large",
  "size.largeDesc": "Whole forearm",
  "size.halfSleeve": "Half sleeve",
  "size.halfSleeveDesc": "Upper arm",
  "size.backPiece": "Back piece",
  "size.backPieceDesc": "Full back",

  "artists.badge": "For Tattoo Artists and Studios",
  "artists.title1": "Clients who already ",
  "artists.titleItalic": "like your style.",
  "artists.desc": "Create your free artist profile, upload your best work, and start receiving booking requests from clients worldwide.",
  "artists.cta": "Create free profile",
  "artists.step1": "Create your profile",
  "artists.step1Desc": "Sign up and build your artist page in minutes.",
  "artists.step2": "Upload your portfolio",
  "artists.step2Desc": "Our team reviews every profile before it goes live.",
  "artists.step3": "Get booked & paid",
  "artists.step3Desc": "Clients book directly. You get paid via crypto or card.",

  "newsletter.title": "Get tattoo inspiration delivered weekly",
  "newsletter.desc": "One short email a week with new artists and guides. No spam, unsubscribe anytime.",
  "newsletter.placeholder": "Enter your email",
  "newsletter.subscribe": "Subscribe",

  "footer.desc": "Discover talented tattoo artists and get inspired for your next piece of body art.",
  "footer.explore": "Explore",
  "footer.popularCities": "Popular Cities",
  "footer.tattooStyles": "Tattoo Styles",
  "footer.resources": "Resources",
  "footer.topCities": "Top Cities",
  "footer.topStyles": "Top Styles",
  "footer.featuredArtists": "Featured Artists",
  "footer.copyright": "© 2026 TattooNest. All rights reserved.",
  "footer.findArtist": "Find an Artist",
  "footer.findArtistDesc": "Connect with verified professionals",
  "footer.browseStyle": "Browse by Style",
  "footer.browseStyleDesc": "Traditional, realism, fine line & more",
  "footer.browseCity": "Browse by City",
  "footer.browseCityDesc": "Find artists near you",
  "footer.browseStudios": "Browse Studios",
  "footer.browseStudiosDesc": "Discover tattoo studios worldwide",
  "footer.estimateCost": "Estimate Your Cost",
  "footer.estimateCostDesc": "Plan your budget confidently",
  "footer.artistPricing": "Artist Pricing",
  "footer.artistPricingDesc": "Subscription plans for artists",
  "footer.artistDashboard": "Artist Dashboard",
  "footer.savedArtists": "Saved Artists",
  "footer.joinAsArtist": "Join as an artist",
  "footer.terms": "Terms of Service",
  "footer.privacy": "Privacy Policy",
  "footer.cookies": "Cookie Policy",

  "auth.welcomeBack": "Welcome back",
  "auth.createAccount": "Create your account",
  "auth.loginDesc": "Log in to your TattooNest account.",
  "auth.registerDesc": "It's free and takes less than a minute.",
  "auth.name": "Name",
  "auth.email": "Email address",
  "auth.password": "Password",
  "auth.forgotPassword": "Forgot password?",
  "auth.minChars": "At least 6 characters",
  "auth.login": "Log in",
  "auth.register": "Create account",
  "auth.loading": "Please wait...",
  "auth.notMember": "Not a member?",
  "auth.signUp": "Sign up",
  "auth.alreadyMember": "Already a member?",
  "auth.termsAgree": "By creating an account you agree to our",
  "auth.termsLink": "Terms of Service",
  "auth.privacyLink": "Privacy Policy",

  "browse.badge": "Discover",
  "browse.title1": "Find your ",
  "browse.titleItalic": "perfect artist",
  "browse.search": "Search",
  "browse.searchPlaceholder": "Search artists, cities, styles...",
  "browse.allStyles": "All Styles",
  "browse.sort": "Sort",
  "browse.newest": "Newest",
  "browse.popular": "Popular",
  "browse.noResults": "No artists found",
  "browse.noResultsDesc": "Try adjusting your search or filters.",
  "browse.viewProfile": "View Profile",
  "browse.reviews": "reviews",

  "saved.badge": "Your Saved",
  "saved.title1": "Your tattoo ",
  "saved.titleItalic": "moodboard",
  "saved.desc": "Collect tattoos you love, sort them into boards, and send a board to the artists you want.",
  "saved.emptyTitle": "Your saves live here",
  "saved.emptyDesc": "Sign in to see your boards and the ideas you sent.",

  "join.badge": "For Tattoo Artists",
  "join.title1": "Get listed on ",
  "join.title2": "TattooNest",
  "join.desc": "A free profile where people looking for their next tattoo can find you. Set it up in a few minutes. Our team checks every profile before it goes live.",
  "join.free": "Free, no subscription",
  "join.upload": "Upload your portfolio in minutes",
  "join.reviewed": "Reviewed by a real person",
  "join.createAccount": "Create a free account",
  "join.haveAccount": "I already have an account",
  "join.accountNote": "You need an account so only you can edit your profile.",
  "join.stepsTitle": "Studio",
  "join.whatYouDo": "What you will do",
  "join.step1": "Create your account",
  "join.step1Desc": "Email and password, takes a minute",
  "join.step2": "Start your profile",
  "join.step2Desc": "Your name and studio info",
  "join.step3": "Verify your identity",
  "join.step3Desc": "Quick verification to confirm it's you",
  "join.step4": "Add your photos",
  "join.step4Desc": "0 of 6 minimum",
  "join.step5": "Add your details",
  "join.step5Desc": "Name, bio, location, styles",
  "join.step6": "Submit for review",
  "join.step6Desc": "Finish the steps above first",

  "pricing.badge": "Pricing",
  "pricing.title1": "Simple, transparent ",
  "pricing.titleItalic": "pricing",
  "pricing.desc": "Choose the plan that's right for you.",
  "pricing.monthly": "Monthly",
  "pricing.yearly": "Yearly",
  "pricing.popular": "Most Popular",
  "pricing.getStarted": "Get Started",
  "pricing.currentPlan": "Current Plan",

  "blog.badge": "Journal",
  "blog.title1": "Tattoo ",
  "blog.titleItalic": "journal",
  "blog.readMore": "Read more",

  "design.badge": "Design Tools",
  "design.title1": "Design ",
  "design.titleItalic": "tools",
  "design.desc": "Explore tools to help you design your next tattoo.",

  "onboard.artistOnboarding": "Artist Onboarding",
  "onboard.startProfile": "Start your profile",
  "onboard.startProfileDesc": "Your name and studio info",
  "onboard.verify": "Verify your identity",
  "onboard.verifyDesc": "Quick verification to confirm it's you",
  "onboard.addPhotos": "Add your photos",
  "onboard.addPhotosDesc": "6 photos minimum",
  "onboard.addDetails": "Add your details",
  "onboard.addDetailsDesc": "Name, bio, location, styles",
  "onboard.submit": "Submit for review",
  "onboard.submitDesc": "Finish the steps above first",

  "common.worldwide": "worldwide",
  "common.artists": "artists",
  "common.new": "New",
  "common.continue": "Continue",
};

const zh: TranslationStrings = {
  "nav.findArtists": "寻找纹身师",
  "nav.byLocation": "按地区",
  "nav.byStyle": "按风格",
  "nav.browseStudios": "浏览工作室",
  "nav.forArtists": "纹身师入口",
  "nav.joinAsArtist": "加入成为纹身师",
  "nav.pricing": "价格",
  "nav.designTools": "设计工具",
  "nav.aiGenerator": "AI纹身生成器",
  "nav.customDesign": "定制设计",
  "nav.blog": "博客",
  "nav.signIn": "登录",
  "nav.artistResources": "纹身师资源",
  "nav.freeProfile": "免费纹身师档案",

  "hero.badge": "寻找纹身师",
  "hero.title1": "为",
  "hero.titleItalic": "您的想法",
  "hero.title2": "找到合适的纹身师。",
  "hero.desc": "来自{artists}位纹身师的真实作品集，涵盖{styles}种风格。按风格和城市筛选，收藏喜欢的作品，直接预约。",
  "hero.where": "地点",
  "hero.city": "城市",
  "hero.style": "风格",
  "hero.findArtists": "搜索纹身师",
  "hero.mostListed": "全球最多上榜",
  "hero.citiesWorldwide": "全球城市",

  "week.title1": "本周",
  "week.title2": "TattooNest",
  "week.newArtists": "新纹身师",
  "week.newArtistsCount": "30位新纹身师",
  "week.thisWeek": "本周加入",
  "week.seeAll": "查看所有新纹身师",
  "week.alsoNew": "同样是新加入：",
  "week.newBadge": "新",
  "week.journal": "最新日志",

  "how.know": "我知道我想要什么",
  "how.knowDesc": "选择城市和风格，对比作品集。",
  "how.knowLink": "浏览纹身师 →",
  "how.ideas": "我需要灵感",
  "how.ideasDesc": "将纹身保存到收藏板，然后发送给最多三位纹身师。",
  "how.ideasLink": "创建收藏板 →",
  "how.cost": "需要多少钱？",
  "how.costDesc": "在联系任何人之前，先估算您的尺寸、风格和城市的价格。",
  "how.costLink": "估算价格 →",

  "styles.badge": "按风格浏览",
  "styles.title1": "找到",
  "styles.titleItalic": "您的",
  "styles.title2": "风格",
  "styles.all": "所有风格",
  "styles.artists": "位纹身师",

  "cities.badge": "热门城市",
  "cities.title1": "或从",
  "cities.titleItalic": "一个地方开始",
  "cities.all": "所有城市",

  "price.badge": "在联系之前",
  "price.title1": "",
  "price.titleItalic": "您的",
  "price.title2": "纹身要多少钱？",
  "price.desc": "四个因素决定价格：大小、颜色、细节和纹身师。选择您的参数查看价格范围。",
  "price.city": "城市",
  "price.yourCity": "您的城市",
  "price.size": "大小",
  "price.ink": "墨水",
  "price.blackGrey": "黑灰",
  "price.colour": "彩色",
  "price.detail": "细节",
  "price.simple": "简单",
  "price.detailed": "精细",
  "price.veryDetailed": "非常精细",
  "price.artist": "纹身师",
  "price.rising": "新锐",
  "price.established": "资深",
  "price.inDemand": "热门",
  "price.localPrices": "添加您的城市查看当地价格。",
  "price.priceGuide": "阅读完整价格指南",
  "price.getDesign": "获取定制设计",

  "size.tiny": "迷你",
  "size.tinyDesc": "手腕或手指",
  "size.small": "小型",
  "size.smallDesc": "掌心大小",
  "size.medium": "中型",
  "size.mediumDesc": "手掌大小",
  "size.large": "大型",
  "size.largeDesc": "整个前臂",
  "size.halfSleeve": "半袖",
  "size.halfSleeveDesc": "上臂",
  "size.backPiece": "满背",
  "size.backPieceDesc": "整个背部",

  "artists.badge": "纹身师和工作室专区",
  "artists.title1": "已经",
  "artists.titleItalic": "喜欢你风格的客户。",
  "artists.desc": "创建免费的纹身师档案，上传您最好的作品，开始接收来自全球客户的预约请求。",
  "artists.cta": "创建免费档案",
  "artists.step1": "创建您的档案",
  "artists.step1Desc": "几分钟内注册并建立您的纹身师页面。",
  "artists.step2": "上传您的作品集",
  "artists.step2Desc": "我们的团队会在上线前审核每个档案。",
  "artists.step3": "获得预约和收入",
  "artists.step3Desc": "客户直接预约。您通过加密货币或银行卡收款。",

  "newsletter.title": "每周获取纹身灵感",
  "newsletter.desc": "每周一封简短邮件，包含新纹身师和指南。无垃圾邮件，随时退订。",
  "newsletter.placeholder": "输入您的邮箱",
  "newsletter.subscribe": "订阅",

  "footer.desc": "发现才华横溢的纹身师，为您的下一件身体艺术获取灵感。",
  "footer.explore": "探索",
  "footer.popularCities": "热门城市",
  "footer.tattooStyles": "纹身风格",
  "footer.resources": "资源",
  "footer.topCities": "热门城市",
  "footer.topStyles": "热门风格",
  "footer.featuredArtists": "精选纹身师",
  "footer.copyright": "© 2026 TattooNest. 保留所有权利。",
  "footer.findArtist": "寻找纹身师",
  "footer.findArtistDesc": "与认证专业人士连接",
  "footer.browseStyle": "按风格浏览",
  "footer.browseStyleDesc": "传统、写实、细线等更多风格",
  "footer.browseCity": "按城市浏览",
  "footer.browseCityDesc": "找到您附近的纹身师",
  "footer.browseStudios": "浏览工作室",
  "footer.browseStudiosDesc": "发现全球纹身工作室",
  "footer.estimateCost": "估算费用",
  "footer.estimateCostDesc": "自信地规划您的预算",
  "footer.artistPricing": "纹身师定价",
  "footer.artistPricingDesc": "纹身师订阅计划",
  "footer.artistDashboard": "纹身师控制台",
  "footer.savedArtists": "已保存的纹身师",
  "footer.joinAsArtist": "加入成为纹身师",
  "footer.terms": "服务条款",
  "footer.privacy": "隐私政策",
  "footer.cookies": "Cookie政策",

  "auth.welcomeBack": "欢迎回来",
  "auth.createAccount": "创建您的账户",
  "auth.loginDesc": "登录您的TattooNest账户。",
  "auth.registerDesc": "免费注册，不到一分钟。",
  "auth.name": "姓名",
  "auth.email": "邮箱地址",
  "auth.password": "密码",
  "auth.forgotPassword": "忘记密码？",
  "auth.minChars": "至少6个字符",
  "auth.login": "登录",
  "auth.register": "创建账户",
  "auth.loading": "请稍候...",
  "auth.notMember": "还不是会员？",
  "auth.signUp": "注册",
  "auth.alreadyMember": "已经是会员？",
  "auth.termsAgree": "创建账户即表示您同意我们的",
  "auth.termsLink": "服务条款",
  "auth.privacyLink": "隐私政策",

  "browse.badge": "发现",
  "browse.title1": "找到您的",
  "browse.titleItalic": "完美纹身师",
  "browse.search": "搜索",
  "browse.searchPlaceholder": "搜索纹身师、城市、风格...",
  "browse.allStyles": "所有风格",
  "browse.sort": "排序",
  "browse.newest": "最新",
  "browse.popular": "热门",
  "browse.noResults": "未找到纹身师",
  "browse.noResultsDesc": "请尝试调整搜索或筛选条件。",
  "browse.viewProfile": "查看档案",
  "browse.reviews": "条评价",

  "saved.badge": "您的收藏",
  "saved.title1": "您的纹身",
  "saved.titleItalic": "灵感板",
  "saved.desc": "收藏您喜欢的纹身，分类到看板中，并将看板发送给您想联系的纹身师。",
  "saved.emptyTitle": "您的收藏在这里",
  "saved.emptyDesc": "登录查看您的看板和发送的想法。",

  "join.badge": "纹身师专区",
  "join.title1": "在",
  "join.title2": "TattooNest上列出",
  "join.desc": "免费档案，让寻找下一个纹身的人找到你。几分钟即可完成设置。我们的团队会在上线前审核每个档案。",
  "join.free": "免费，无需订阅",
  "join.upload": "几分钟上传你的作品集",
  "join.reviewed": "真人审核",
  "join.createAccount": "创建免费账户",
  "join.haveAccount": "我已有账户",
  "join.accountNote": "您需要一个账户才能编辑您的档案。",
  "join.stepsTitle": "工作室",
  "join.whatYouDo": "您需要做的",
  "join.step1": "创建您的账户",
  "join.step1Desc": "邮箱和密码，只需一分钟",
  "join.step2": "开始您的档案",
  "join.step2Desc": "您的姓名和工作室信息",
  "join.step3": "验证您的身份",
  "join.step3Desc": "快速验证确认是您本人",
  "join.step4": "添加您的照片",
  "join.step4Desc": "至少6张",
  "join.step5": "添加您的详情",
  "join.step5Desc": "姓名、简介、位置、风格",
  "join.step6": "提交审核",
  "join.step6Desc": "请先完成以上步骤",

  "pricing.badge": "价格",
  "pricing.title1": "简单透明的",
  "pricing.titleItalic": "定价",
  "pricing.desc": "选择适合您的方案。",
  "pricing.monthly": "月付",
  "pricing.yearly": "年付",
  "pricing.popular": "最受欢迎",
  "pricing.getStarted": "开始使用",
  "pricing.currentPlan": "当前方案",

  "blog.badge": "日志",
  "blog.title1": "纹身",
  "blog.titleItalic": "日志",
  "blog.readMore": "阅读更多",

  "design.badge": "设计工具",
  "design.title1": "设计",
  "design.titleItalic": "工具",
  "design.desc": "探索帮助您设计下一个纹身的工具。",

  "onboard.artistOnboarding": "纹身师入驻",
  "onboard.startProfile": "开始您的档案",
  "onboard.startProfileDesc": "您的姓名和工作室信息",
  "onboard.verify": "验证您的身份",
  "onboard.verifyDesc": "快速验证确认是您本人",
  "onboard.addPhotos": "添加您的照片",
  "onboard.addPhotosDesc": "至少6张照片",
  "onboard.addDetails": "添加您的详情",
  "onboard.addDetailsDesc": "姓名、简介、位置、风格",
  "onboard.submit": "提交审核",
  "onboard.submitDesc": "请先完成以上步骤",

  "common.worldwide": "全球",
  "common.artists": "位纹身师",
  "common.new": "新",
  "common.continue": "继续",
};

const fr: TranslationStrings = {
  "nav.findArtists": "Trouver un artiste",
  "nav.byLocation": "Par lieu",
  "nav.byStyle": "Par style",
  "nav.browseStudios": "Parcourir les studios",
  "nav.forArtists": "Pour les artistes",
  "nav.joinAsArtist": "Rejoindre en tant qu'artiste",
  "nav.pricing": "Tarifs",
  "nav.designTools": "Outils de design",
  "nav.aiGenerator": "Générateur de tatouage IA",
  "nav.customDesign": "Design personnalisé",
  "nav.blog": "Blog",
  "nav.signIn": "Se connecter",
  "nav.artistResources": "Ressources artiste",
  "nav.freeProfile": "Profil artiste gratuit",

  "hero.badge": "Trouver un tatoueur",
  "hero.title1": "Le bon artiste pour ",
  "hero.titleItalic": "votre idée",
  "hero.title2": ", près de chez vous.",
  "hero.desc": "De vrais portfolios de {artists} artistes dans {styles} styles. Filtrez par style et ville, sauvegardez vos favoris et réservez directement.",
  "hero.where": "Où",
  "hero.city": "Ville",
  "hero.style": "Style",
  "hero.findArtists": "Trouver des artistes",
  "hero.mostListed": "Les plus référencés",
  "hero.citiesWorldwide": "villes dans le monde",

  "week.title1": "Cette semaine sur ",
  "week.title2": "TattooNest",
  "week.newArtists": "Nouveaux artistes",
  "week.newArtistsCount": "30 nouveaux artistes",
  "week.thisWeek": " cette semaine",
  "week.seeAll": "Voir tous les nouveaux artistes",
  "week.alsoNew": "Aussi nouveaux :",
  "week.newBadge": "Nouveau",
  "week.journal": "Nouveau sur le journal",

  "how.know": "Je sais ce que je veux",
  "how.knowDesc": "Choisissez une ville et un style et comparez les portfolios côte à côte.",
  "how.knowLink": "Parcourir les artistes →",
  "how.ideas": "J'ai besoin d'idées",
  "how.ideasDesc": "Sauvegardez des tatouages dans des tableaux, puis envoyez un tableau à trois artistes maximum.",
  "how.ideasLink": "Créer un tableau →",
  "how.cost": "Combien ça coûte ?",
  "how.costDesc": "Obtenez une estimation selon la taille, le style et la ville avant de contacter qui que ce soit.",
  "how.costLink": "Estimer votre prix →",

  "styles.badge": "Parcourir par style",
  "styles.title1": "Trouvez ",
  "styles.titleItalic": "votre",
  "styles.title2": " style",
  "styles.all": "Tous les styles",
  "styles.artists": "artistes",

  "cities.badge": "Villes populaires",
  "cities.title1": "Ou commencez ",
  "cities.titleItalic": "par un lieu",
  "cities.all": "Toutes les villes",

  "price.badge": "Avant de contacter qui que ce soit",
  "price.title1": "Combien coûtera ",
  "price.titleItalic": "votre",
  "price.title2": " tatouage ?",
  "price.desc": "Quatre éléments définissent le prix : taille, couleur, détail et artiste. Choisissez les vôtres pour voir une fourchette typique.",
  "price.city": "Ville",
  "price.yourCity": "Votre ville",
  "price.size": "Taille",
  "price.ink": "Encre",
  "price.blackGrey": "Noir & gris",
  "price.colour": "Couleur",
  "price.detail": "Détail",
  "price.simple": "Simple",
  "price.detailed": "Détaillé",
  "price.veryDetailed": "Très détaillé",
  "price.artist": "Artiste",
  "price.rising": "Émergent",
  "price.established": "Établi",
  "price.inDemand": "Très demandé",
  "price.localPrices": "Ajoutez votre ville pour voir les prix locaux.",
  "price.priceGuide": "Lire le guide complet des prix",
  "price.getDesign": "Obtenir un design personnalisé",

  "size.tiny": "Minuscule",
  "size.tinyDesc": "Poignet ou doigt",
  "size.small": "Petit",
  "size.smallDesc": "Taille d'une paume",
  "size.medium": "Moyen",
  "size.mediumDesc": "Taille d'une main",
  "size.large": "Grand",
  "size.largeDesc": "Avant-bras entier",
  "size.halfSleeve": "Demi-manche",
  "size.halfSleeveDesc": "Haut du bras",
  "size.backPiece": "Dos complet",
  "size.backPieceDesc": "Dos entier",

  "artists.badge": "Pour les tatoueurs et studios",
  "artists.title1": "Des clients qui aiment déjà ",
  "artists.titleItalic": "votre style.",
  "artists.desc": "Créez votre profil d'artiste gratuit, téléchargez vos meilleures œuvres et commencez à recevoir des demandes de réservation du monde entier.",
  "artists.cta": "Créer un profil gratuit",
  "artists.step1": "Créez votre profil",
  "artists.step1Desc": "Inscrivez-vous et créez votre page d'artiste en quelques minutes.",
  "artists.step2": "Téléchargez votre portfolio",
  "artists.step2Desc": "Notre équipe vérifie chaque profil avant sa mise en ligne.",
  "artists.step3": "Soyez réservé et payé",
  "artists.step3Desc": "Les clients réservent directement. Paiement par crypto ou carte.",

  "newsletter.title": "Recevez l'inspiration tatouage chaque semaine",
  "newsletter.desc": "Un email court par semaine avec de nouveaux artistes et guides. Pas de spam, désinscription à tout moment.",
  "newsletter.placeholder": "Entrez votre email",
  "newsletter.subscribe": "S'abonner",

  "footer.desc": "Découvrez des tatoueurs talentueux et trouvez l'inspiration pour votre prochaine œuvre.",
  "footer.explore": "Explorer",
  "footer.popularCities": "Villes populaires",
  "footer.tattooStyles": "Styles de tatouage",
  "footer.resources": "Ressources",
  "footer.topCities": "Villes principales",
  "footer.topStyles": "Styles principaux",
  "footer.featuredArtists": "Artistes en vedette",
  "footer.copyright": "© 2026 TattooNest. Tous droits réservés.",
  "footer.findArtist": "Trouver un artiste",
  "footer.findArtistDesc": "Connectez-vous avec des professionnels vérifiés",
  "footer.browseStyle": "Parcourir par style",
  "footer.browseStyleDesc": "Traditionnel, réalisme, trait fin et plus",
  "footer.browseCity": "Parcourir par ville",
  "footer.browseCityDesc": "Trouvez des artistes près de chez vous",
  "footer.browseStudios": "Parcourir les studios",
  "footer.browseStudiosDesc": "Découvrez des studios de tatouage dans le monde",
  "footer.estimateCost": "Estimez votre coût",
  "footer.estimateCostDesc": "Planifiez votre budget en confiance",
  "footer.artistPricing": "Tarifs artiste",
  "footer.artistPricingDesc": "Plans d'abonnement pour artistes",
  "footer.artistDashboard": "Tableau de bord artiste",
  "footer.savedArtists": "Artistes sauvegardés",
  "footer.joinAsArtist": "Rejoindre en tant qu'artiste",
  "footer.terms": "Conditions d'utilisation",
  "footer.privacy": "Politique de confidentialité",
  "footer.cookies": "Politique de cookies",

  "auth.welcomeBack": "Bon retour",
  "auth.createAccount": "Créez votre compte",
  "auth.loginDesc": "Connectez-vous à votre compte TattooNest.",
  "auth.registerDesc": "C'est gratuit et ça prend moins d'une minute.",
  "auth.name": "Nom",
  "auth.email": "Adresse email",
  "auth.password": "Mot de passe",
  "auth.forgotPassword": "Mot de passe oublié ?",
  "auth.minChars": "Au moins 6 caractères",
  "auth.login": "Se connecter",
  "auth.register": "Créer un compte",
  "auth.loading": "Veuillez patienter...",
  "auth.notMember": "Pas encore membre ?",
  "auth.signUp": "S'inscrire",
  "auth.alreadyMember": "Déjà membre ?",
  "auth.termsAgree": "En créant un compte, vous acceptez nos",
  "auth.termsLink": "Conditions d'utilisation",
  "auth.privacyLink": "Politique de confidentialité",

  "browse.badge": "Découvrir",
  "browse.title1": "Trouvez votre ",
  "browse.titleItalic": "artiste idéal",
  "browse.search": "Rechercher",
  "browse.searchPlaceholder": "Rechercher artistes, villes, styles...",
  "browse.allStyles": "Tous les styles",
  "browse.sort": "Trier",
  "browse.newest": "Plus récent",
  "browse.popular": "Populaire",
  "browse.noResults": "Aucun artiste trouvé",
  "browse.noResultsDesc": "Essayez d'ajuster votre recherche ou vos filtres.",
  "browse.viewProfile": "Voir le profil",
  "browse.reviews": "avis",

  "saved.badge": "Vos favoris",
  "saved.title1": "Votre ",
  "saved.titleItalic": "moodboard tatouage",
  "saved.desc": "Collectionnez les tatouages que vous aimez, classez-les en tableaux et envoyez un tableau aux artistes qui vous intéressent.",
  "saved.emptyTitle": "Vos favoris sont ici",
  "saved.emptyDesc": "Connectez-vous pour voir vos tableaux et les idées que vous avez envoyées.",

  "join.badge": "Pour les tatoueurs",
  "join.title1": "Soyez listé sur ",
  "join.title2": "TattooNest",
  "join.desc": "Un profil gratuit où les personnes cherchant leur prochain tatouage peuvent vous trouver. Configuration en quelques minutes. Notre équipe vérifie chaque profil.",
  "join.free": "Gratuit, sans abonnement",
  "join.upload": "Téléchargez votre portfolio en minutes",
  "join.reviewed": "Vérifié par une vraie personne",
  "join.createAccount": "Créer un compte gratuit",
  "join.haveAccount": "J'ai déjà un compte",
  "join.accountNote": "Vous avez besoin d'un compte pour pouvoir modifier votre profil.",
  "join.stepsTitle": "Studio",
  "join.whatYouDo": "Ce que vous ferez",
  "join.step1": "Créez votre compte",
  "join.step1Desc": "Email et mot de passe, ça prend une minute",
  "join.step2": "Commencez votre profil",
  "join.step2Desc": "Votre nom et infos du studio",
  "join.step3": "Vérifiez votre identité",
  "join.step3Desc": "Vérification rapide pour confirmer votre identité",
  "join.step4": "Ajoutez vos photos",
  "join.step4Desc": "6 photos minimum",
  "join.step5": "Ajoutez vos détails",
  "join.step5Desc": "Nom, bio, localisation, styles",
  "join.step6": "Soumettez pour examen",
  "join.step6Desc": "Complétez d'abord les étapes ci-dessus",

  "pricing.badge": "Tarifs",
  "pricing.title1": "Tarification simple et ",
  "pricing.titleItalic": "transparente",
  "pricing.desc": "Choisissez le plan qui vous convient.",
  "pricing.monthly": "Mensuel",
  "pricing.yearly": "Annuel",
  "pricing.popular": "Le plus populaire",
  "pricing.getStarted": "Commencer",
  "pricing.currentPlan": "Plan actuel",

  "blog.badge": "Journal",
  "blog.title1": "Journal ",
  "blog.titleItalic": "tatouage",
  "blog.readMore": "Lire la suite",

  "design.badge": "Outils de design",
  "design.title1": "Outils de ",
  "design.titleItalic": "design",
  "design.desc": "Explorez les outils pour concevoir votre prochain tatouage.",

  "onboard.artistOnboarding": "Inscription artiste",
  "onboard.startProfile": "Commencez votre profil",
  "onboard.startProfileDesc": "Votre nom et infos du studio",
  "onboard.verify": "Vérifiez votre identité",
  "onboard.verifyDesc": "Vérification rapide",
  "onboard.addPhotos": "Ajoutez vos photos",
  "onboard.addPhotosDesc": "6 photos minimum",
  "onboard.addDetails": "Ajoutez vos détails",
  "onboard.addDetailsDesc": "Nom, bio, localisation, styles",
  "onboard.submit": "Soumettez pour examen",
  "onboard.submitDesc": "Complétez d'abord les étapes ci-dessus",

  "common.worldwide": "dans le monde",
  "common.artists": "artistes",
  "common.new": "Nouveau",
  "common.continue": "Continuer",
};

const de: TranslationStrings = {
  "nav.findArtists": "Künstler finden",
  "nav.byLocation": "Nach Ort",
  "nav.byStyle": "Nach Stil",
  "nav.browseStudios": "Studios durchsuchen",
  "nav.forArtists": "Für Künstler",
  "nav.joinAsArtist": "Als Künstler beitreten",
  "nav.pricing": "Preise",
  "nav.designTools": "Design-Tools",
  "nav.aiGenerator": "KI-Tattoo-Generator",
  "nav.customDesign": "Individuelles Design",
  "nav.blog": "Blog",
  "nav.signIn": "Anmelden",
  "nav.artistResources": "Künstler-Ressourcen",
  "nav.freeProfile": "Kostenloses Künstlerprofil",

  "hero.badge": "Tätowierer finden",
  "hero.title1": "Der richtige Künstler für ",
  "hero.titleItalic": "Ihre Idee",
  "hero.title2": ", in Ihrer Nähe.",
  "hero.desc": "Echte Portfolios von {artists} Künstlern in {styles} Stilen. Nach Stil und Stadt filtern, Favoriten speichern und direkt buchen.",
  "hero.where": "Wo",
  "hero.city": "Stadt",
  "hero.style": "Stil",
  "hero.findArtists": "Künstler finden",
  "hero.mostListed": "Am meisten gelistet weltweit",
  "hero.citiesWorldwide": "Städte weltweit",

  "week.title1": "Diese Woche auf ",
  "week.title2": "TattooNest",
  "week.newArtists": "Neue Künstler",
  "week.newArtistsCount": "30 neue Künstler",
  "week.thisWeek": " diese Woche",
  "week.seeAll": "Alle neuen Künstler sehen",
  "week.alsoNew": "Auch neu:",
  "week.newBadge": "Neu",
  "week.journal": "Neu im Journal",

  "how.know": "Ich weiß, was ich will",
  "how.knowDesc": "Wählen Sie Stadt und Stil und vergleichen Sie Portfolios nebeneinander.",
  "how.knowLink": "Künstler durchsuchen →",
  "how.ideas": "Ich brauche Ideen",
  "how.ideasDesc": "Speichern Sie Tattoos auf Boards und senden Sie ein Board an bis zu drei Künstler.",
  "how.ideasLink": "Board erstellen →",
  "how.cost": "Was wird es kosten?",
  "how.costDesc": "Erhalten Sie eine Schätzung für Größe, Stil und Stadt, bevor Sie jemanden kontaktieren.",
  "how.costLink": "Preis schätzen →",

  "styles.badge": "Nach Stil durchsuchen",
  "styles.title1": "Finden Sie ",
  "styles.titleItalic": "Ihren",
  "styles.title2": " Stil",
  "styles.all": "Alle Stile",
  "styles.artists": "Künstler",

  "cities.badge": "Beliebte Städte",
  "cities.title1": "Oder beginnen Sie ",
  "cities.titleItalic": "mit einem Ort",
  "cities.all": "Alle Städte",

  "price.badge": "Bevor Sie jemanden kontaktieren",
  "price.title1": "Was wird ",
  "price.titleItalic": "Ihr",
  "price.title2": " Tattoo kosten?",
  "price.desc": "Vier Dinge bestimmen den Preis: Größe, Farbe, Detail und Künstler. Wählen Sie Ihre Optionen für eine typische Preisspanne.",
  "price.city": "Stadt",
  "price.yourCity": "Ihre Stadt",
  "price.size": "Größe",
  "price.ink": "Tinte",
  "price.blackGrey": "Schwarz & Grau",
  "price.colour": "Farbe",
  "price.detail": "Detail",
  "price.simple": "Einfach",
  "price.detailed": "Detailliert",
  "price.veryDetailed": "Sehr detailliert",
  "price.artist": "Künstler",
  "price.rising": "Aufsteigend",
  "price.established": "Etabliert",
  "price.inDemand": "Gefragt",
  "price.localPrices": "Fügen Sie Ihre Stadt hinzu, um lokale Preise zu sehen.",
  "price.priceGuide": "Vollständigen Preisführer lesen",
  "price.getDesign": "Individuelles Design erhalten",

  "size.tiny": "Winzig",
  "size.tinyDesc": "Handgelenk oder Finger",
  "size.small": "Klein",
  "size.smallDesc": "Handflächengroß",
  "size.medium": "Mittel",
  "size.mediumDesc": "Handgroß",
  "size.large": "Groß",
  "size.largeDesc": "Ganzer Unterarm",
  "size.halfSleeve": "Halber Ärmel",
  "size.halfSleeveDesc": "Oberarm",
  "size.backPiece": "Rückenteil",
  "size.backPieceDesc": "Ganzer Rücken",

  "artists.badge": "Für Tätowierer und Studios",
  "artists.title1": "Kunden, die bereits ",
  "artists.titleItalic": "Ihren Stil mögen.",
  "artists.desc": "Erstellen Sie Ihr kostenloses Künstlerprofil, laden Sie Ihre besten Arbeiten hoch und erhalten Sie Buchungsanfragen von Kunden weltweit.",
  "artists.cta": "Kostenloses Profil erstellen",
  "artists.step1": "Profil erstellen",
  "artists.step1Desc": "Registrieren Sie sich und erstellen Sie Ihre Künstlerseite in wenigen Minuten.",
  "artists.step2": "Portfolio hochladen",
  "artists.step2Desc": "Unser Team überprüft jedes Profil vor der Veröffentlichung.",
  "artists.step3": "Gebucht & bezahlt werden",
  "artists.step3Desc": "Kunden buchen direkt. Bezahlung per Krypto oder Karte.",

  "newsletter.title": "Wöchentliche Tattoo-Inspiration erhalten",
  "newsletter.desc": "Eine kurze E-Mail pro Woche mit neuen Künstlern und Guides. Kein Spam, jederzeit abbestellbar.",
  "newsletter.placeholder": "E-Mail eingeben",
  "newsletter.subscribe": "Abonnieren",

  "footer.desc": "Entdecken Sie talentierte Tätowierer und lassen Sie sich für Ihr nächstes Tattoo inspirieren.",
  "footer.explore": "Entdecken",
  "footer.popularCities": "Beliebte Städte",
  "footer.tattooStyles": "Tattoo-Stile",
  "footer.resources": "Ressourcen",
  "footer.topCities": "Top-Städte",
  "footer.topStyles": "Top-Stile",
  "footer.featuredArtists": "Ausgewählte Künstler",
  "footer.copyright": "© 2026 TattooNest. Alle Rechte vorbehalten.",
  "footer.findArtist": "Künstler finden",
  "footer.findArtistDesc": "Verbinden Sie sich mit verifizierten Profis",
  "footer.browseStyle": "Nach Stil durchsuchen",
  "footer.browseStyleDesc": "Traditionell, Realismus, Fineline und mehr",
  "footer.browseCity": "Nach Stadt durchsuchen",
  "footer.browseCityDesc": "Künstler in Ihrer Nähe finden",
  "footer.browseStudios": "Studios durchsuchen",
  "footer.browseStudiosDesc": "Entdecken Sie Tattoo-Studios weltweit",
  "footer.estimateCost": "Kosten schätzen",
  "footer.estimateCostDesc": "Budget sicher planen",
  "footer.artistPricing": "Künstler-Preise",
  "footer.artistPricingDesc": "Abonnementpläne für Künstler",
  "footer.artistDashboard": "Künstler-Dashboard",
  "footer.savedArtists": "Gespeicherte Künstler",
  "footer.joinAsArtist": "Als Künstler beitreten",
  "footer.terms": "Nutzungsbedingungen",
  "footer.privacy": "Datenschutzrichtlinie",
  "footer.cookies": "Cookie-Richtlinie",

  "auth.welcomeBack": "Willkommen zurück",
  "auth.createAccount": "Konto erstellen",
  "auth.loginDesc": "Melden Sie sich bei Ihrem TattooNest-Konto an.",
  "auth.registerDesc": "Kostenlos und dauert weniger als eine Minute.",
  "auth.name": "Name",
  "auth.email": "E-Mail-Adresse",
  "auth.password": "Passwort",
  "auth.forgotPassword": "Passwort vergessen?",
  "auth.minChars": "Mindestens 6 Zeichen",
  "auth.login": "Anmelden",
  "auth.register": "Konto erstellen",
  "auth.loading": "Bitte warten...",
  "auth.notMember": "Noch kein Mitglied?",
  "auth.signUp": "Registrieren",
  "auth.alreadyMember": "Bereits Mitglied?",
  "auth.termsAgree": "Mit der Kontoerstellung stimmen Sie unseren",
  "auth.termsLink": "Nutzungsbedingungen",
  "auth.privacyLink": "Datenschutzrichtlinie",

  "browse.badge": "Entdecken",
  "browse.title1": "Finden Sie Ihren ",
  "browse.titleItalic": "perfekten Künstler",
  "browse.search": "Suchen",
  "browse.searchPlaceholder": "Künstler, Städte, Stile suchen...",
  "browse.allStyles": "Alle Stile",
  "browse.sort": "Sortieren",
  "browse.newest": "Neueste",
  "browse.popular": "Beliebt",
  "browse.noResults": "Keine Künstler gefunden",
  "browse.noResultsDesc": "Versuchen Sie, Ihre Suche oder Filter anzupassen.",
  "browse.viewProfile": "Profil ansehen",
  "browse.reviews": "Bewertungen",

  "saved.badge": "Ihre Favoriten",
  "saved.title1": "Ihr Tattoo-",
  "saved.titleItalic": "Moodboard",
  "saved.desc": "Sammeln Sie Tattoos, die Ihnen gefallen, ordnen Sie sie in Boards und senden Sie ein Board an die gewünschten Künstler.",
  "saved.emptyTitle": "Ihre Favoriten sind hier",
  "saved.emptyDesc": "Melden Sie sich an, um Ihre Boards und gesendeten Ideen zu sehen.",

  "join.badge": "Für Tätowierer",
  "join.title1": "Werden Sie gelistet auf ",
  "join.title2": "TattooNest",
  "join.desc": "Ein kostenloses Profil, auf dem Tattoo-Interessierte Sie finden können. In wenigen Minuten eingerichtet. Unser Team prüft jedes Profil.",
  "join.free": "Kostenlos, kein Abo",
  "join.upload": "Portfolio in Minuten hochladen",
  "join.reviewed": "Von einer echten Person geprüft",
  "join.createAccount": "Kostenloses Konto erstellen",
  "join.haveAccount": "Ich habe bereits ein Konto",
  "join.accountNote": "Sie brauchen ein Konto, damit nur Sie Ihr Profil bearbeiten können.",
  "join.stepsTitle": "Studio",
  "join.whatYouDo": "Was Sie tun werden",
  "join.step1": "Konto erstellen",
  "join.step1Desc": "E-Mail und Passwort, dauert eine Minute",
  "join.step2": "Profil starten",
  "join.step2Desc": "Ihr Name und Studio-Info",
  "join.step3": "Identität bestätigen",
  "join.step3Desc": "Schnelle Verifizierung",
  "join.step4": "Fotos hinzufügen",
  "join.step4Desc": "Mindestens 6",
  "join.step5": "Details hinzufügen",
  "join.step5Desc": "Name, Bio, Ort, Stile",
  "join.step6": "Zur Prüfung einreichen",
  "join.step6Desc": "Erst die obigen Schritte abschließen",

  "pricing.badge": "Preise",
  "pricing.title1": "Einfache, transparente ",
  "pricing.titleItalic": "Preise",
  "pricing.desc": "Wählen Sie den passenden Plan.",
  "pricing.monthly": "Monatlich",
  "pricing.yearly": "Jährlich",
  "pricing.popular": "Am beliebtesten",
  "pricing.getStarted": "Loslegen",
  "pricing.currentPlan": "Aktueller Plan",

  "blog.badge": "Journal",
  "blog.title1": "Tattoo-",
  "blog.titleItalic": "Journal",
  "blog.readMore": "Weiterlesen",

  "design.badge": "Design-Tools",
  "design.title1": "Design-",
  "design.titleItalic": "Tools",
  "design.desc": "Entdecken Sie Tools für Ihr nächstes Tattoo-Design.",

  "onboard.artistOnboarding": "Künstler-Onboarding",
  "onboard.startProfile": "Profil starten",
  "onboard.startProfileDesc": "Ihr Name und Studio-Info",
  "onboard.verify": "Identität bestätigen",
  "onboard.verifyDesc": "Schnelle Verifizierung",
  "onboard.addPhotos": "Fotos hinzufügen",
  "onboard.addPhotosDesc": "Mindestens 6 Fotos",
  "onboard.addDetails": "Details hinzufügen",
  "onboard.addDetailsDesc": "Name, Bio, Ort, Stile",
  "onboard.submit": "Zur Prüfung einreichen",
  "onboard.submitDesc": "Erst die obigen Schritte abschließen",

  "common.worldwide": "weltweit",
  "common.artists": "Künstler",
  "common.new": "Neu",
  "common.continue": "Weiter",
};

const es: TranslationStrings = { ...en,
  "nav.findArtists": "Buscar artistas", "nav.byLocation": "Por ubicación", "nav.byStyle": "Por estilo", "nav.browseStudios": "Explorar estudios", "nav.forArtists": "Para artistas", "nav.joinAsArtist": "Unirse como artista", "nav.pricing": "Precios", "nav.designTools": "Herramientas de diseño", "nav.aiGenerator": "Generador de tatuajes IA", "nav.customDesign": "Diseño personalizado", "nav.blog": "Blog", "nav.signIn": "Iniciar sesión", "nav.artistResources": "Recursos para artistas", "nav.freeProfile": "Perfil de artista gratuito",
  "hero.badge": "Encuentra un tatuador", "hero.title1": "El artista adecuado para ", "hero.titleItalic": "tu idea", "hero.title2": ", cerca de ti.", "hero.desc": "Portfolios reales de {artists} artistas en {styles} estilos. Filtra por estilo y ciudad, guarda tus favoritos y reserva directamente.", "hero.where": "Dónde", "hero.city": "Ciudad", "hero.style": "Estilo", "hero.findArtists": "Buscar artistas", "hero.mostListed": "Más listados a nivel mundial", "hero.citiesWorldwide": "ciudades en el mundo",
  "week.title1": "Esta semana en ", "week.newArtists": "Nuevos artistas", "week.newArtistsCount": "30 nuevos artistas", "week.thisWeek": " esta semana", "week.seeAll": "Ver todos los nuevos artistas", "week.alsoNew": "También nuevos:", "week.newBadge": "Nuevo", "week.journal": "Nuevo en el diario",
  "how.know": "Sé lo que quiero", "how.knowDesc": "Elige una ciudad y un estilo y compara portfolios lado a lado.", "how.knowLink": "Explorar artistas →", "how.ideas": "Necesito ideas", "how.ideasDesc": "Guarda tatuajes en tableros y envía un tablero a hasta tres artistas.", "how.ideasLink": "Crear un tablero →", "how.cost": "¿Cuánto costará?", "how.costDesc": "Obtén una estimación por tamaño, estilo y ciudad antes de contactar a alguien.", "how.costLink": "Estimar tu precio →",
  "styles.badge": "Explorar por estilo", "styles.title1": "Encuentra ", "styles.titleItalic": "tu", "styles.title2": " estilo", "styles.all": "Todos los estilos", "styles.artists": "artistas",
  "cities.badge": "Ciudades populares", "cities.title1": "O empieza ", "cities.titleItalic": "por un lugar", "cities.all": "Todas las ciudades",
  "newsletter.title": "Recibe inspiración de tatuajes semanalmente", "newsletter.desc": "Un email corto por semana con nuevos artistas y guías. Sin spam, cancela cuando quieras.", "newsletter.placeholder": "Ingresa tu email", "newsletter.subscribe": "Suscribirse",
  "footer.copyright": "© 2026 TattooNest. Todos los derechos reservados.", "footer.terms": "Términos de servicio", "footer.privacy": "Política de privacidad", "footer.cookies": "Política de cookies",
  "auth.welcomeBack": "Bienvenido de nuevo", "auth.createAccount": "Crea tu cuenta", "auth.loginDesc": "Inicia sesión en tu cuenta TattooNest.", "auth.registerDesc": "Es gratis y toma menos de un minuto.", "auth.name": "Nombre", "auth.email": "Correo electrónico", "auth.password": "Contraseña", "auth.forgotPassword": "¿Olvidaste tu contraseña?", "auth.minChars": "Al menos 6 caracteres", "auth.login": "Iniciar sesión", "auth.register": "Crear cuenta", "auth.loading": "Espera por favor...", "auth.notMember": "¿No eres miembro?", "auth.signUp": "Regístrate", "auth.alreadyMember": "¿Ya eres miembro?",
  "common.worldwide": "en el mundo", "common.artists": "artistas", "common.new": "Nuevo", "common.continue": "Continuar",
};

const ja: TranslationStrings = { ...en,
  "nav.findArtists": "アーティストを探す", "nav.byLocation": "地域別", "nav.byStyle": "スタイル別", "nav.browseStudios": "スタジオを探す", "nav.forArtists": "アーティスト向け", "nav.joinAsArtist": "アーティストとして参加", "nav.pricing": "料金", "nav.designTools": "デザインツール", "nav.aiGenerator": "AIタトゥージェネレーター", "nav.customDesign": "カスタムデザイン", "nav.blog": "ブログ", "nav.signIn": "ログイン", "nav.artistResources": "アーティストリソース", "nav.freeProfile": "無料アーティストプロフィール",
  "hero.badge": "タトゥーアーティストを探す", "hero.title1": "", "hero.titleItalic": "あなたのアイデア", "hero.title2": "にぴったりのアーティストを。", "hero.desc": "{artists}人のアーティスト、{styles}のスタイルから本物のポートフォリオ。スタイルと都市でフィルター、お気に入りを保存、直接予約。", "hero.where": "場所", "hero.city": "都市", "hero.style": "スタイル", "hero.findArtists": "アーティストを探す", "hero.mostListed": "世界で最も登録が多い", "hero.citiesWorldwide": "都市",
  "week.title1": "今週の", "week.newArtists": "新しいアーティスト", "week.newArtistsCount": "30人の新アーティスト", "week.thisWeek": "今週", "week.seeAll": "すべての新アーティストを見る", "week.alsoNew": "他にも新規：", "week.newBadge": "新規", "week.journal": "ジャーナル新着",
  "how.know": "欲しいものがわかっている", "how.knowDesc": "都市とスタイルを選んで、ポートフォリオを比較。", "how.knowLink": "アーティストを見る →", "how.ideas": "アイデアが欲しい", "how.ideasDesc": "タトゥーをボードに保存して、最大3人のアーティストに送信。", "how.ideasLink": "ボードを作る →", "how.cost": "いくらかかる？", "how.costDesc": "サイズ、スタイル、都市の見積もりを事前に確認。", "how.costLink": "価格を見積もる →",
  "styles.badge": "スタイル別に探す", "styles.title1": "", "styles.titleItalic": "あなたの", "styles.title2": "スタイルを見つける", "styles.all": "すべてのスタイル", "styles.artists": "アーティスト",
  "cities.badge": "人気の都市", "cities.title1": "または", "cities.titleItalic": "場所から始める", "cities.all": "すべての都市",
  "newsletter.title": "毎週タトゥーのインスピレーションをお届け", "newsletter.desc": "毎週1通の短いメール。スパムなし、いつでも解除可能。", "newsletter.placeholder": "メールアドレスを入力", "newsletter.subscribe": "購読する",
  "footer.copyright": "© 2026 TattooNest. All rights reserved.", "footer.terms": "利用規約", "footer.privacy": "プライバシーポリシー", "footer.cookies": "Cookieポリシー",
  "auth.welcomeBack": "おかえりなさい", "auth.createAccount": "アカウントを作成", "auth.loginDesc": "TattooNestアカウントにログイン。", "auth.registerDesc": "無料で1分以内に完了します。", "auth.name": "名前", "auth.email": "メールアドレス", "auth.password": "パスワード", "auth.forgotPassword": "パスワードを忘れた？", "auth.minChars": "6文字以上", "auth.login": "ログイン", "auth.register": "アカウント作成", "auth.loading": "お待ちください...", "auth.notMember": "メンバーではないですか？", "auth.signUp": "登録", "auth.alreadyMember": "すでにメンバーですか？",
  "common.worldwide": "世界中", "common.artists": "アーティスト", "common.new": "新規", "common.continue": "続ける",
};

const pt: TranslationStrings = { ...en,
  "nav.findArtists": "Encontrar artistas", "nav.byLocation": "Por local", "nav.byStyle": "Por estilo", "nav.browseStudios": "Explorar estúdios", "nav.forArtists": "Para artistas", "nav.joinAsArtist": "Participar como artista", "nav.pricing": "Preços", "nav.designTools": "Ferramentas de design", "nav.blog": "Blog", "nav.signIn": "Entrar",
  "hero.badge": "Encontre um tatuador", "hero.title1": "O artista certo para ", "hero.titleItalic": "sua ideia", "hero.title2": ", perto de você.", "hero.findArtists": "Encontrar artistas", "hero.where": "Onde", "hero.city": "Cidade", "hero.style": "Estilo",
  "newsletter.title": "Receba inspiração de tatuagem semanalmente", "newsletter.placeholder": "Digite seu email", "newsletter.subscribe": "Inscrever-se",
  "auth.welcomeBack": "Bem-vindo de volta", "auth.createAccount": "Crie sua conta", "auth.login": "Entrar", "auth.register": "Criar conta", "auth.loading": "Aguarde...",
  "footer.copyright": "© 2026 TattooNest. Todos os direitos reservados.", "footer.terms": "Termos de serviço", "footer.privacy": "Política de privacidade",
  "common.worldwide": "no mundo", "common.artists": "artistas", "common.new": "Novo", "common.continue": "Continuar",
};

const ar: TranslationStrings = { ...en,
  "nav.findArtists": "ابحث عن فنان", "nav.byLocation": "حسب الموقع", "nav.byStyle": "حسب الأسلوب", "nav.browseStudios": "تصفح الاستوديوهات", "nav.forArtists": "للفنانين", "nav.joinAsArtist": "انضم كفنان", "nav.pricing": "الأسعار", "nav.designTools": "أدوات التصميم", "nav.blog": "المدونة", "nav.signIn": "تسجيل الدخول",
  "hero.badge": "ابحث عن فنان وشم", "hero.title1": "الفنان المناسب ", "hero.titleItalic": "لفكرتك", "hero.title2": "، بالقرب منك.", "hero.findArtists": "ابحث عن فنانين", "hero.where": "أين", "hero.city": "المدينة", "hero.style": "الأسلوب",
  "newsletter.title": "احصل على إلهام الوشم أسبوعياً", "newsletter.placeholder": "أدخل بريدك الإلكتروني", "newsletter.subscribe": "اشترك",
  "auth.welcomeBack": "مرحباً بعودتك", "auth.createAccount": "أنشئ حسابك", "auth.login": "تسجيل الدخول", "auth.register": "إنشاء حساب", "auth.loading": "يرجى الانتظار...",
  "footer.copyright": "© 2026 TattooNest. جميع الحقوق محفوظة.", "footer.terms": "شروط الخدمة", "footer.privacy": "سياسة الخصوصية",
  "common.worldwide": "حول العالم", "common.artists": "فنانين", "common.new": "جديد", "common.continue": "متابعة",
};

const ko: TranslationStrings = { ...en,
  "nav.findArtists": "아티스트 찾기", "nav.byLocation": "지역별", "nav.byStyle": "스타일별", "nav.browseStudios": "스튜디오 둘러보기", "nav.forArtists": "아티스트 전용", "nav.joinAsArtist": "아티스트로 가입", "nav.pricing": "가격", "nav.designTools": "디자인 도구", "nav.blog": "블로그", "nav.signIn": "로그인",
  "hero.badge": "타투 아티스트 찾기", "hero.title1": "", "hero.titleItalic": "당신의 아이디어", "hero.title2": "에 맞는 아티스트를 찾으세요.", "hero.findArtists": "아티스트 찾기", "hero.where": "어디", "hero.city": "도시", "hero.style": "스타일",
  "newsletter.title": "매주 타투 영감을 받아보세요", "newsletter.placeholder": "이메일을 입력하세요", "newsletter.subscribe": "구독",
  "auth.welcomeBack": "다시 오신 것을 환영합니다", "auth.createAccount": "계정 만들기", "auth.login": "로그인", "auth.register": "계정 만들기", "auth.loading": "잠시만 기다려주세요...",
  "footer.copyright": "© 2026 TattooNest. 모든 권리 보유.", "footer.terms": "이용약관", "footer.privacy": "개인정보처리방침",
  "common.worldwide": "전 세계", "common.artists": "아티스트", "common.new": "새로운", "common.continue": "계속",
};

const ru: TranslationStrings = { ...en,
  "nav.findArtists": "Найти мастера", "nav.byLocation": "По месту", "nav.byStyle": "По стилю", "nav.browseStudios": "Студии", "nav.forArtists": "Для мастеров", "nav.joinAsArtist": "Стать мастером", "nav.pricing": "Цены", "nav.designTools": "Инструменты дизайна", "nav.blog": "Блог", "nav.signIn": "Войти",
  "hero.badge": "Найдите тату-мастера", "hero.title1": "Подходящий мастер для ", "hero.titleItalic": "вашей идеи", "hero.title2": ", рядом с вами.", "hero.findArtists": "Найти мастеров", "hero.where": "Где", "hero.city": "Город", "hero.style": "Стиль",
  "newsletter.title": "Еженедельное вдохновение для тату", "newsletter.placeholder": "Введите ваш email", "newsletter.subscribe": "Подписаться",
  "auth.welcomeBack": "С возвращением", "auth.createAccount": "Создайте аккаунт", "auth.login": "Войти", "auth.register": "Создать аккаунт", "auth.loading": "Подождите...",
  "footer.copyright": "© 2026 TattooNest. Все права защищены.", "footer.terms": "Условия использования", "footer.privacy": "Политика конфиденциальности",
  "common.worldwide": "по всему миру", "common.artists": "мастеров", "common.new": "Новый", "common.continue": "Продолжить",
};

export const translations: Record<LangCode, TranslationStrings> = {
  en, zh, fr, de, es, ja, pt, ar, ko, ru,
};
