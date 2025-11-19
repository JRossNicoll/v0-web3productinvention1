import { Asset, Order, Trade, UserState, OrderBook, OrderBookLevel, Notification, PriceAlert, OHLCV } from './types'
import { TechnicalAnalysis } from './technical-analysis'
import { RiskManagement } from './risk-management'

const INITIAL_ASSETS: Asset[] = [
  {
    id: "VBUT",
    name: "Vitalik Buterin",
    category: "Crypto",
    price: 1204.50,
    change: 12.4,
    volume: 1250,
    marketCap: 187500, 
    score: 892,
    holders: 14520,
    sectorDominance: 18.5,
    sentimentScore: 85,
    riskRating: 'Medium',
    smartMoneyFlow: 75,
    image: "/vitalik-buterin.png",
    platforms: ["github", "twitter", "globe"],
    socials: {
      twitter: "https://twitter.com/VitalikButerin",
      github: "https://github.com/vbuterin",
      website: "https://vitalik.ca"
    },
    bio: "Co-founder of Ethereum, the world's leading programmable blockchain. Pioneer in decentralized systems, cryptography, and blockchain technology. Advocate for privacy, decentralization, and trustless systems.",
    recentActivity: [
      {
        id: "1",
        date: "Nov 13, 2025",
        title: "Signed Trustless Manifesto",
        description: "Confirmed endorsement of decentralization and trustlessness in blockchain technology",
        type: "statement"
      },
      {
        id: "2",
        date: "Nov 12, 2025",
        title: "Unveiled Kohaku Framework",
        description: "Launched privacy-focused framework for Ethereum with stealth addresses and zero-knowledge proofs",
        type: "project"
      },
      {
        id: "3",
        date: "Nov 11, 2025",
        title: "Privacy Roadmap Discussion",
        description: "Discussed Ethereum's privacy roadmap focusing on minimal Layer 1 changes",
        type: "announcement"
      }
    ],
    insiderTrades: [
      {
        id: "1",
        date: "Nov 10, 2025",
        type: "buy",
        amount: "STRK",
        value: "$1.01M",
        price: "N/A",
        notes: "Received from token unlock"
      }
    ],
    news: [
      {
        id: "1",
        date: "Nov 13, 2025",
        title: "Vitalik Buterin Signs the Trustless Manifesto",
        source: "Blockchain News",
        summary: "Ethereum co-founder confirms commitment to decentralization principles"
      },
      {
        id: "2",
        date: "Nov 12, 2025",
        title: "Kohaku: A Privacy-Focused Framework for Ethereum",
        source: "CoinCentral",
        summary: "New framework introduces stealth addresses and zero-knowledge proofs to enhance Ethereum privacy"
      }
    ],
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "SALT",
    name: "Sam Altman",
    category: "AI Researcher",
    price: 892.00,
    change: 5.1,
    volume: 850,
    marketCap: 127500,
    score: 847,
    holders: 8940,
    sectorDominance: 12.2,
    sentimentScore: 78,
    riskRating: 'High',
    smartMoneyFlow: 82,
    image: "/sam-altman-new.jpg",
    platforms: ["twitter", "linkedin", "globe"],
    socials: {
      twitter: "https://twitter.com/sama",
      linkedin: "https://www.linkedin.com/in/sam-altman",
      website: "https://blog.samaltman.com"
    },
    bio: "CEO of OpenAI, leading the development of advanced AI systems including GPT-4 and ChatGPT. Former president of Y Combinator. Advocate for responsible AI development and universal basic income.",
    recentActivity: [
      {
        id: "1",
        date: "Nov 14, 2025",
        title: "Served Subpoena at Live Event",
        description: "Received subpoena onstage in San Francisco related to Stop AI activist case",
        type: "statement"
      },
      {
        id: "2",
        date: "Nov 10, 2025",
        title: "AI Safety Warnings",
        description: "Publicly warned about AI's potential to destroy jobs, cause fraud crisis, and worsen inequality",
        type: "announcement"
      },
      {
        id: "3",
        date: "Nov 5, 2025",
        title: "OpenAI Leadership Testimony",
        description: "Court filings reveal testimony about 2023 ouster and leadership challenges",
        type: "statement"
      }
    ],
    insiderTrades: [],
    news: [
      {
        id: "1",
        date: "Nov 14, 2025",
        title: "Sam Altman Served Subpoena During Live Event",
        source: "The Daily Beast",
        summary: "OpenAI CEO received legal subpoena onstage at San Francisco event"
      },
      {
        id: "2",
        date: "Nov 5, 2025",
        title: "New Court Docs Put Sam Altman's Honesty in Spotlight",
        source: "The Daily Beast",
        summary: "Testimony reveals allegations of dishonesty during 2023 OpenAI board crisis"
      }
    ],
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "MZUC",
    name: "Mark Zuckerberg",
    category: "Tech Mogul",
    price: 445.20,
    change: -2.3,
    volume: 420,
    marketCap: 63000,
    score: 782,
    holders: 12400,
    sectorDominance: 8.4,
    sentimentScore: 45,
    riskRating: 'Medium',
    smartMoneyFlow: -12,
    image: "/generic-tech-entrepreneur.png",
    platforms: ["twitter", "linkedin", "globe"],
    socials: {
      twitter: "https://twitter.com/finkd",
      linkedin: "https://www.linkedin.com/in/markzuckerberg",
      website: "https://www.facebook.com/zuck"
    },
    bio: "CEO and Chairman of Meta Platforms (formerly Facebook). Pioneer in social networking and virtual reality. Leading Meta's transformation into a metaverse and AI-focused company.",
    recentActivity: [
      {
        id: "1",
        date: "Feb 15, 2025",
        title: "$600B AI Infrastructure Investment",
        description: "Announced massive US investment pledge for AI infrastructure and data centers",
        type: "investment"
      },
      {
        id: "2",
        date: "Feb 12, 2025",
        title: "VR Operating System Announcement",
        description: "Meta to offer virtual reality operating system to hardware companies",
        type: "announcement"
      },
      {
        id: "3",
        date: "Feb 10, 2025",
        title: "Performance-Based Layoffs",
        description: "Meta plans 5% workforce reduction while accelerating ML engineer hiring",
        type: "statement"
      }
    ],
    insiderTrades: [
      {
        id: "1",
        date: "Feb 12, 2025",
        type: "sell",
        amount: "14,134 shares",
        value: "$14.19M",
        price: "$714.15-$726.70",
        notes: "Rule 10b5-1 trading plan"
      },
      {
        id: "2",
        date: "Feb 10, 2025",
        type: "sell",
        amount: "30,800 shares",
        value: "$21.97M",
        price: "$712.20-$720.65",
        notes: "Rule 10b5-1 trading plan"
      }
    ],
    news: [
      {
        id: "1",
        date: "Feb 15, 2025",
        title: "Meta Announces $600 Billion AI Investment",
        source: "Business Insider",
        summary: "Meta pledges massive investment in US AI infrastructure and data centers"
      },
      {
        id: "2",
        date: "Feb 12, 2025",
        title: "Meta CEO Sells $14.19 Million in Stock",
        source: "Investing.com",
        summary: "Zuckerberg executes planned stock sale under Rule 10b5-1"
      }
    ],
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "EMUS",
    name: "Elon Musk",
    category: "Innovator",
    price: 342.80,
    change: 8.7,
    volume: 650,
    marketCap: 97500,
    score: 756,
    holders: 25600,
    sectorDominance: 15.1,
    sentimentScore: 92,
    riskRating: 'Extreme',
    smartMoneyFlow: 45,
    image: "/elon-musk-inspired-visionary.png",
    platforms: ["twitter", "globe"],
    socials: {
      twitter: "https://twitter.com/elonmusk",
      website: "https://www.tesla.com"
    },
    bio: "CEO of Tesla, SpaceX, and X (formerly Twitter). Entrepreneur and innovator in electric vehicles, space exploration, and social media. Advocate for sustainable energy and multi-planetary civilization.",
    recentActivity: [
      {
        id: "1",
        date: "Jan 20, 2025",
        title: "$1 Trillion Pay Package Approved",
        description: "Tesla shareholders approved unprecedented compensation package tied to ambitious milestones",
        type: "investment"
      },
      {
        id: "2",
        date: "Jan 15, 2025",
        title: "xAI Investment Proposal",
        description: "Tesla board considers authorization to invest in xAI, Musk's AI company",
        type: "announcement"
      },
      {
        id: "3",
        date: "Dec 10, 2024",
        title: "F-35 Criticism Impacts Defense Stocks",
        description: "X posts criticizing F-35 fighter jets caused defense contractor stocks to fall",
        type: "statement"
      }
    ],
    insiderTrades: [
      {
        id: "1",
        date: "Jan 20, 2025",
        type: "buy",
        amount: "400M+ shares",
        value: "Up to $1T",
        price: "Performance-based",
        notes: "Contingent on achieving 20M vehicles, 1M robots, $8.5T market cap"
      }
    ],
    news: [
      {
        id: "1",
        date: "Jan 20, 2025",
        title: "Elon Musk's $1 Trillion Pay Package Approved",
        source: "BBC News",
        summary: "Tesla shareholders approve historic compensation tied to ambitious 10-year goals"
      },
      {
        id: "2",
        date: "Dec 10, 2024",
        title: "How Elon Musk's X Posts Influence Stock Market",
        source: "USA Today",
        summary: "Analysis of market impact from Musk's social media activity"
      }
    ],
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "JHUA",
    name: "Jensen Huang",
    category: "Chip Architect",
    price: 288.50,
    change: 3.2,
    volume: 320,
    marketCap: 48000,
    score: 721,
    holders: 5200,
    sectorDominance: 22.8,
    sentimentScore: 88,
    riskRating: 'High',
    smartMoneyFlow: 91,
    image: "/jensen-huang.jpg",
    platforms: ["linkedin", "globe"],
    socials: {
      linkedin: "https://www.linkedin.com/in/jensenh",
      website: "https://www.nvidia.com"
    },
    bio: "Co-founder, President, and CEO of NVIDIA since 1993. Pioneer of accelerated computing and inventor of the GPU in 1999. Leading NVIDIA's dominance in AI chip technology with net worth of $179 billion.",
    recentActivity: [
      {
        id: "1",
        date: "Oct 15, 2024",
        title: "NVIDIA Market Cap Surpasses $5 Trillion",
        description: "Company valuation exceeds $5T driven by AI processor demand",
        type: "announcement"
      },
      {
        id: "2",
        date: "Sep 20, 2024",
        title: "Stock Surge Creates New Billionaires",
        description: "NVIDIA's growth elevates CFO Colette Kress and EVP Jay Puri to billionaire status",
        type: "statement"
      },
      {
        id: "3",
        date: "Aug 10, 2024",
        title: "Net Worth Surpasses Warren Buffett",
        description: "Personal net worth reaches $179B, becoming 8th wealthiest person globally",
        type: "statement"
      }
    ],
    insiderTrades: [
      {
        id: "1",
        date: "Dec 31, 2024",
        type: "sell",
        amount: "6M shares",
        value: "$1B+",
        price: "Market price",
        notes: "Completed pre-arranged stock sale plan established in March"
      },
      {
        id: "2",
        date: "Nov 15, 2024",
        type: "sell",
        amount: "25,000 shares",
        value: "$15M+",
        price: "Market price",
        notes: "Final transaction of 2024 sale plan"
      }
    ],
    news: [
      {
        id: "1",
        date: "Oct 15, 2024",
        title: "NVIDIA Market Cap Surpasses $5 Trillion",
        source: "Longbridge",
        summary: "Stock surge driven by AI processor demand pushes valuation past $5T milestone"
      },
      {
        id: "2",
        date: "Sep 20, 2024",
        title: "Jensen Huang Completes $1 Billion Stock Sale",
        source: "Longbridge",
        summary: "NVIDIA CEO completes pre-arranged sale plan amid company's AI-driven growth"
      }
    ],
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "CWOO",
    name: "Cathie Wood",
    category: "Investor",
    price: 198.90,
    change: -1.5,
    volume: 150,
    marketCap: 22500,
    score: 689,
    holders: 3100,
    sectorDominance: 4.2,
    sentimentScore: 62,
    riskRating: 'Extreme',
    smartMoneyFlow: -25,
    image: "/cathie-wood.jpg",
    platforms: ["twitter", "linkedin", "globe"],
    socials: {
      twitter: "https://twitter.com/CathieDWood",
      linkedin: "https://www.linkedin.com/in/cathie-wood",
      website: "https://ark-invest.com"
    },
    bio: "CEO and CIO of ARK Invest, managing actively-traded ETFs focused on disruptive innovation. Known for bold bets on emerging technologies including AI, genomics, blockchain, and autonomous vehicles.",
    recentActivity: [
      {
        id: "1",
        date: "Nov 14, 2025",
        title: "Bargain Hunting in Tech Stocks",
        description: "Added positions in Circle Internet, Bitmine Immersion, and Tempus AI as shares fell",
        type: "investment"
      },
      {
        id: "2",
        date: "Nov 13, 2025",
        title: "$21.3M Robinhood Purchase",
        description: "ARK Innovation and Next Gen Internet ETFs acquired significant Robinhood stake",
        type: "investment"
      },
      {
        id: "3",
        date: "Nov 4, 2025",
        title: "$12M Bullish Investment",
        description: "Invested in cryptocurrency trading platform Bullish Holdings across three ARK ETFs",
        type: "investment"
      }
    ],
    insiderTrades: [
      {
        id: "1",
        date: "Nov 13, 2025",
        type: "buy",
        amount: "HOOD",
        value: "$21.3M",
        price: "Market price",
        notes: "Via ARKK and ARKW ETFs"
      },
      {
        id: "2",
        date: "Nov 4, 2025",
        type: "buy",
        amount: "BLSH",
        value: "$12M",
        price: "Market price",
        notes: "Via ARKK, ARKW, and ARKF ETFs"
      },
      {
        id: "3",
        date: "Sep 15, 2025",
        type: "sell",
        amount: "ROKU, TEM, TER, DKNG",
        value: "Undisclosed",
        price: "Market price",
        notes: "Portfolio rebalancing"
      }
    ],
    news: [
      {
        id: "1",
        date: "Nov 14, 2025",
        title: "Cathie Wood Goes Bargain Hunting",
        source: "The Motley Fool",
        summary: "ARK Invest adds to positions in Circle, Bitmine, and Tempus AI"
      },
      {
        id: "2",
        date: "Nov 13, 2025",
        title: "ARK Invest Buys $21M Worth of Robinhood",
        source: "Seeking Alpha",
        summary: "Cathie Wood increases crypto-related stock exposure with major Robinhood purchase"
      }
    ],
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "YOLO",
    name: "Heyitsyolo",
    symbol: "YOLO",
    price: 205.85, // Derived from $20,585 PnL
    change: 12.5,
    volume: 452000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/Av3xWHJ5EsoLZag6pr7LKbrGgLRTaykXomDD5kBhL9YQ.png",
    score: 98,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 20585.4,
      winRate: 54, // 75/139 trades approx
      rank: 1
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "DV",
    name: "dv",
    symbol: "DV",
    price: 162.01,
    change: 8.4,
    volume: 380000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/BCagckXeMChUKrHEd6fKFA1uiWDtcmCXMsqaheLiUPJd.png",
    score: 96,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 16201.6,
      winRate: 47, // 113/242
      rank: 2
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "CXLT",
    name: "cxltures",
    symbol: "CXLT",
    price: 122.80,
    change: 15.2,
    volume: 290000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/3ZtwP8peTwTfLUF1rgUQgUxwyeHCxfmoELXghQzKqnAJ.png",
    score: 94,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 12280.7,
      winRate: 35,
      rank: 3
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "POLAR",
    name: "Polar",
    symbol: "POLAR",
    price: 104.16,
    change: 5.7,
    volume: 210000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/4S9U8HckRngscHWrW418cG6Suw62dhEZzmyrT2hxSye5.png",
    score: 92,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 10416.8,
      winRate: 55,
      rank: 4
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "DANNY",
    name: "Danny",
    symbol: "DANNY",
    price: 80.04,
    change: -2.1,
    volume: 180000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/9FNz4MjPUmnJqTf6yEDbL1D4SsHVh7uA8zRHhR5K138r.png",
    score: 90,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 8004.3,
      winRate: 49,
      rank: 5
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "SLOPPY",
    name: "Sloppy",
    symbol: "SLOP",
    price: 75.33,
    change: 4.2,
    volume: 165000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/86AEJExyjeNNgcp7GrAvCXTDicf5aGWgoERbXFiG1EdD.png",
    score: 89,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 7533.8,
      winRate: 34,
      rank: 6
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "BASITA",
    name: "Basita",
    symbol: "BAS",
    price: 68.37,
    change: 1.1,
    volume: 150000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/3kebnKw7cPdSkLRfiMEALyZJGZ4wdiSRvmoN4rD1yPzV.png",
    score: 88,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 6837.4,
      winRate: 54,
      rank: 7
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "OTTA",
    name: "Otta",
    symbol: "OTTA",
    price: 65.76,
    change: 9.8,
    volume: 145000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/As7HjL7dzzvbRbaD3WCun47robib2kmAKRXMvjHkSMB5.png",
    score: 87,
    platforms: ["twitter", "telegram"],
    kolStats: {
      monthlyPnL: 6576.6,
      winRate: 45,
      rank: 8
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "COOKER",
    name: "Cooker",
    symbol: "COOK",
    price: 56.81,
    change: 3.4,
    volume: 130000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/8deJ9xeUvXSJwicYptA9mHsU2rN2pDx37KWzkDkEXhU6.png",
    score: 86,
    platforms: ["twitter", "telegram"],
    kolStats: {
      monthlyPnL: 5681.3,
      winRate: 64,
      rank: 9
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "TIL",
    name: "TIL",
    symbol: "TIL",
    price: 56.68,
    change: -1.5,
    volume: 128000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/EHg5YkU2SZBTvuT87rUsvxArGp3HLeye1fXaSDfuMyaf.png",
    score: 85,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 5668.3,
      winRate: 40,
      rank: 10
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "CLASSIC",
    name: "Classic",
    symbol: "CLAS",
    price: 53.97,
    change: 2.2,
    volume: 120000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/DsqRyTUh1R37asYcVf1KdX4CNnz5DKEFmnXvgT4NfTPE.png",
    score: 84,
    platforms: ["twitter", "telegram"],
    kolStats: {
      monthlyPnL: 5397.3,
      winRate: 49,
      rank: 11
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "YOUNIZ",
    name: "YOUNIZ",
    symbol: "YOU",
    price: 52.58,
    change: 6.7,
    volume: 115000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/EKDDjxzJ39Bjkr47NiARGJDKFVxiiV9WNJ5XbtEhPEXP.png",
    score: 83,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 5258.6,
      winRate: 40,
      rank: 12
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "DAUMEN",
    name: "Daumen",
    symbol: "DAU",
    price: 47.59,
    change: 1.8,
    volume: 110000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/8MaVa9kdt3NW4Q5HyNAm1X5LbR8PQRVDc1W8NMVK88D5.png",
    score: 82,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 4759.5,
      winRate: 66,
      rank: 13
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "MRFROG",
    name: "Mr. Frog",
    symbol: "FROG",
    price: 43.34,
    change: 12.1,
    volume: 105000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/4DdrfiDHpmx55i4SPssxVzS9ZaKLb8qr45NKY9Er9nNh.png",
    score: 81,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 4334.9,
      winRate: 96,
      rank: 14
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "INSYDER",
    name: "Insyder",
    symbol: "INSY",
    price: 42.72,
    change: 4.5,
    volume: 100000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/G3g1CKqKWSVEVURZDNMazDBv7YAhMNTjhJBVRTiKZygk.png",
    score: 80,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 4272.3,
      winRate: 44,
      rank: 15
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "MONEY",
    name: "MoneyMaykah",
    symbol: "MONEY",
    price: 40.23,
    change: 3.2,
    volume: 95000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/3i8akM4xfSX9WKFB5bQ61fmiYkeKQEFqvdMEyu6pSEk9.png",
    score: 79,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 4023.3,
      winRate: 38,
      rank: 16
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "NACH",
    name: "Nach",
    symbol: "NACH",
    price: 28.16,
    change: -0.5,
    volume: 80000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/9jyqFiLnruggwNn4EQwBNFXwpbLM9hrA4hV59ytyAVVz.png",
    score: 78,
    platforms: ["twitter", "telegram"],
    kolStats: {
      monthlyPnL: 2816.5,
      winRate: 83,
      rank: 17
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "ABSOL",
    name: "Absol",
    symbol: "ABS",
    price: 26.29,
    change: 1.4,
    volume: 75000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/BXNiM7pqt9Ld3b2Hc8iT3mA5bSwoe9CRrtkSUs15SLWN.png",
    score: 77,
    platforms: ["twitter", "telegram"],
    kolStats: {
      monthlyPnL: 2629.3,
      winRate: 35,
      rank: 18
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "FERB",
    name: "Ferb",
    symbol: "FERB",
    price: 23.51,
    change: 2.8,
    volume: 70000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/m7Kaas3Kd8FHLnCioSjCoSuVDReZ6FDNBVM6HTNYuF7.png",
    score: 76,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 2351.0,
      winRate: 35,
      rank: 19
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "HAIL",
    name: "Hail",
    symbol: "HAIL",
    price: 22.64,
    change: 5.1,
    volume: 68000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/HA1L7GhQfypSRdfBi3tCkkCVEdEcBVYqBSQCENCrwPuB.png",
    score: 75,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 2264.3,
      winRate: 89,
      rank: 20
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "JB",
    name: "JB",
    symbol: "JB",
    price: 21.56,
    change: 1.9,
    volume: 65000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/7dP8DmRka5rmQti4zEEDjdAyaQyvFsPkcXMjEKJucqCu.png",
    score: 74,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 2156.5,
      winRate: 81,
      rank: 21
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "KADEN",
    name: "Kadenox",
    symbol: "KAD",
    price: 18.18,
    change: -1.2,
    volume: 60000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/3pZ59YENxDAcjaKa3sahZJBcgER4rGYi4v6BpPurmsGj.png",
    score: 73,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 1818.3,
      winRate: 30,
      rank: 22
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "ORANGE",
    name: "Orange",
    symbol: "ORN",
    price: 17.68,
    change: 0.8,
    volume: 58000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/96sErVjEN7LNJ6Uvj63bdRWZxNuBngj56fnT9biHLKBf.png",
    score: 72,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 1768.0,
      winRate: 50,
      rank: 23
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "BAG",
    name: "BagCalls",
    symbol: "BAG",
    price: 14.36,
    change: 3.5,
    volume: 55000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/4AHgEkTsGqY77qtde4UJn9yZCrbGcM7UM3vjT3qM4G5H.png",
    score: 71,
    platforms: ["twitter", "telegram"],
    kolStats: {
      monthlyPnL: 1436.0,
      winRate: 100,
      rank: 24
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "MOG",
    name: "mog",
    symbol: "MOG",
    price: 14.22,
    change: 2.1,
    volume: 54000,
    category: "KOL",
    image: "https://cdn.kolscan.io/profiles/EzLywbxhxsAiNc7C9EY8fa9qZNUrMkayozWfHu7hbPJD.png",
    score: 70,
    platforms: ["twitter"],
    kolStats: {
      monthlyPnL: 1422.4,
      winRate: 40,
      rank: 25
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "JIJO",
    name: "Jijo",
    category: "KOL",
    price: 8.92,
    change: 5.5,
    volume: 55,
    marketCap: 1313,
    score: 65,
    holders: 130,
    image: "https://cdn.kolscan.io/profiles/4BdKaxN8G6ka4GYtQQWk4G4dZRUTX2vQH9GcXdBREFUk.png",
    platforms: ["twitter", "telegram"],
    socials: {
      twitter: "https://twitter.com/jijo_trades",
      website: "https://kolscan.io/account/4BdKaxN8G6ka4GYtQQWk4G4dZRUTX2vQH9GcXdBREFUk"
    },
    kolStats: {
      rank: 26,
      monthlyPnL: "+8.92 SOL",
      winRate: "18/6",
      totalProfit: "$1,313"
    },
    history: [],
    candles: [],
    orderBook: undefined
  },
  {
    id: "AL4N",
    name: "Al4n",
    category: "KOL",
    price: 8.50,
    change: 2.9,
    volume: 50,
    marketCap: 1251,
    score: 64,
    holders: 120,
    image: "https://cdn.kolscan.io/profiles/2YJbcB9G8wePrpVBcT31o8JEed6L3abgyCjt5qkJMymV.png",
    platforms: ["twitter"],
    socials: {
      twitter: "https://twitter.com/al4n_sol",
      website: "https://kolscan.io/account/2YJbcB9G8wePrpVBcT31o8JEed6L3abgyCjt5qkJMymV"
    },
    kolStats: {
      rank: 27,
      monthlyPnL: "+8.50 SOL",
      winRate: "55/49",
      totalProfit: "$1,251"
    },
    history: [],
    candles: [],
    orderBook: undefined
  }
]

type MarketProfile = 'ETH_LIKE' | 'AI_BOOM' | 'RECOVERY' | 'MEME_VOLATILITY' | 'EXPONENTIAL' | 'HIGH_BETA'

const ASSET_PROFILES: Record<string, MarketProfile> = {
  "VBUT": "ETH_LIKE",
  "SALT": "AI_BOOM",
  "MZUC": "RECOVERY",
  "EMUS": "MEME_VOLATILITY",
  "JHUA": "EXPONENTIAL",
  "CWOO": "HIGH_BETA",
  "YOLO": "HIGH_BETA",
  "DV": "HIGH_BETA",
  "CXLT": "MEME_VOLATILITY",
  "POLAR": "HIGH_BETA",
  "DANNY": "HIGH_BETA",
  "SLOPPY": "MEME_VOLATILITY",
  "BASITA": "HIGH_BETA",
  "OTTA": "HIGH_BETA",
  "COOKER": "HIGH_BETA",
  "TIL": "HIGH_BETA",
  "CLASSIC": "HIGH_BETA",
  "YOUNIZ": "HIGH_BETA",
  "DAUMEN": "HIGH_BETA",
  "MRFROG": "MEME_VOLATILITY",
  "INSYDER": "HIGH_BETA",
  "MONEY": "HIGH_BETA",
  "NACH": "HIGH_BETA",
  "ABSOL": "HIGH_BETA",
  "FERB": "HIGH_BETA",
  "HAIL": "HIGH_BETA",
  "JB": "HIGH_BETA",
  "KADEN": "HIGH_BETA",
  "ORANGE": "HIGH_BETA",
  "BAG": "HIGH_BETA",
  "MOG": "MEME_VOLATILITY",
  "JIJO": "HIGH_BETA",
  "AL4N": "HIGH_BETA",
}

export class MarketEngine {
  private assets: Map<string, Asset> = new Map()
  private subscribers: Set<() => void> = new Set()
  private intervalId: NodeJS.Timeout | null = null
  private assetTrends: Map<string, number> = new Map()
  private userSeed: number = 0 // Added user seed for unique per-user values
  
  private userState: UserState = {
    balance: 500,
    portfolio: [],
    trades: [],
    orders: [],
    watchlist: [],
    alerts: [],
    notifications: [],
    settings: {
      riskLevel: 'moderate',
      maxPositionSize: 0.2,
      stopLossPercent: 5,
      takeProfitPercent: 10
    }
  }

  private orderBooks: Map<string, OrderBook> = new Map()

  constructor() {
    if (typeof window !== 'undefined') {
      const savedSeed = localStorage.getItem('vantage_user_seed')
      if (savedSeed) {
        this.userSeed = parseInt(savedSeed)
      } else {
        this.userSeed = Math.floor(Math.random() * 1000000)
        localStorage.setItem('vantage_user_seed', this.userSeed.toString())
      }
    }
    
    this.initializeAssets()
    this.startSimulation()
  }

  private seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  private generateOrderBook(price: number, volume: number): OrderBook {
    const bids: OrderBookLevel[] = []
    const asks: OrderBookLevel[] = []
    const depth = 10
    const spread = 0.001 + (Math.random() * 0.002) // 0.1% - 0.3% spread

    // Generate Asks (Sell orders above price)
    let currentAsk = price * (1 + spread / 2)
    let askTotal = 0
    for (let i = 0; i < depth; i++) {
      const amount = (volume / 10000) * (Math.random() * 0.5 + 0.5)
      askTotal += amount
      asks.push({
        price: currentAsk,
        amount: amount,
        total: askTotal
      })
      currentAsk *= (1 + 0.001 + Math.random() * 0.002)
    }

    // Generate Bids (Buy orders below price)
    let currentBid = price * (1 - spread / 2)
    let bidTotal = 0
    for (let i = 0; i < depth; i++) {
      const amount = (volume / 10000) * (Math.random() * 0.5 + 0.5)
      bidTotal += amount
      bids.push({
        price: currentBid,
        amount: amount,
        total: bidTotal
      })
      currentBid *= (1 - 0.001 - Math.random() * 0.002)
    }

    return { bids, asks }
  }

  private initializeAssets() {
    // Load from local storage or use initial
    const saved = typeof window !== 'undefined' ? localStorage.getItem('vantage_assets') : null
    
    if (saved) {
      const parsed = JSON.parse(saved)
      const savedAssetsMap = new Map(parsed.map((a: Asset) => [a.id, a]))

      INITIAL_ASSETS.forEach(initialAsset => {
        const savedAsset = savedAssetsMap.get(initialAsset.id)

        if (savedAsset) {
            const mergedAsset = {
              ...savedAsset,
              kolStats: initialAsset.kolStats, // Always update KOL stats
              image: initialAsset.image, // Always update image
              socials: initialAsset.socials, // Always update socials
              platforms: initialAsset.platforms, // Always update platforms
              // Keep existing data like history, candles unless explicitly needed to reset
            }

            // Target: $40k / 150 / 6 assets = ~44 per asset
            const baseVolume = 30 + Math.random() * 20 // 30-50 range
            
            let volume = savedAsset.volume
            if (volume === undefined || volume < 1) { // Fallback for potentially missing or zero volume
                volume = baseVolume
            }

            // Ensure marketCap is derived from volume if not present or significantly outdated
            const marketCap = (savedAsset.marketCap && savedAsset.marketCap > 0) ? savedAsset.marketCap : volume * 150;
            
            mergedAsset.volume = volume;
            mergedAsset.marketCap = marketCap;

            if (!mergedAsset.orderBook) {
            mergedAsset.orderBook = this.generateOrderBook(mergedAsset.price, mergedAsset.volume)
            }
            
            // Ensure candles exist
            if (!mergedAsset.candles || mergedAsset.candles.length === 0) {
                mergedAsset.candles = this.generateInitialCandles(mergedAsset.price, mergedAsset.volume, mergedAsset.id)
            }
            
            this.assets.set(mergedAsset.id, mergedAsset)
            this.assetTrends.set(mergedAsset.id, (Math.random() - 0.5) * 0.002) 
        } else {
            const trend = (Math.random() - 0.5) * 0.002
            this.assetTrends.set(initialAsset.id, trend)

            const startVolume = 30 + Math.random() * 20

            const candles = this.generateInitialCandles(initialAsset.price, startVolume, initialAsset.id)
            
            const history = candles.slice(-50).map(c => ({ time: c.time, price: c.close }))

            this.assets.set(initialAsset.id, { 
            ...initialAsset, 
            volume: startVolume,
            marketCap: startVolume * 150,
            history,
            candles,
            orderBook: this.generateOrderBook(initialAsset.price, startVolume)
            })
        }
      })
    } else {
      INITIAL_ASSETS.forEach(a => {
        const trend = (Math.random() - 0.5) * 0.002
        this.assetTrends.set(a.id, trend)

        const startVolume = 30 + Math.random() * 20

        const candles = this.generateInitialCandles(a.price, startVolume, a.id)
        
        const history = candles.slice(-50).map(c => ({ time: c.time, price: c.close }))

        this.assets.set(a.id, { 
          ...a, 
          volume: startVolume,
          marketCap: startVolume * 150,
          history,
          candles,
          orderBook: this.generateOrderBook(a.price, startVolume)
        })
      })
    }

    // Load user state
    const savedUser = typeof window !== 'undefined' ? localStorage.getItem('vantage_user') : null
    if (savedUser) {
      this.userState = JSON.parse(savedUser)
    }
  }

  private generateInitialCandles(currentPrice: number, volume: number, seedStr: string): OHLCV[] {
    const candles: OHLCV[] = []
    const now = Date.now()
    const hourlyMs = 3600000
    const days = 30
    const totalHours = days * 24
    
    const randomOffset = Math.floor(Math.random() * 10000)
    
    let price = currentPrice
    
    for (let i = 0; i < totalHours; i++) {
      const time = now - (i * hourlyMs)
      const candleTime = Math.floor(time / hourlyMs) * hourlyMs
      
      const randomVal = Math.random()
      const randomVol = Math.random()
      
      let change = 0
      let volatility = 0.008 

      change = (randomVal - 0.5) * volatility
      
      const assetBias = (seedStr.charCodeAt(0) % 10 - 5) * 0.0001
      change += assetBias

      const prevPrice = price / (1 + change)
      
      const open = prevPrice
      const close = price
      const high = Math.max(open, close) * (1 + Math.random() * (volatility * 0.5))
      const low = Math.min(open, close) * (1 - Math.random() * (volatility * 0.5))
      
      candles.unshift({ 
        time: candleTime,
        open,
        high,
        low,
        close,
        volume: (volume / 24) * (0.5 + randomVol)
      })
      
      price = prevPrice
    }
    
    return candles
  }

  private startSimulation() {
    if (typeof window === 'undefined') return
    if (this.intervalId) return
    
    this.intervalId = setInterval(() => {
      this.updateMarket()
    }, 2000) // Update every 2 seconds
  }

  private updateMarket() {
    const now = Date.now()
    const hourlyMs = 3600000
    
    this.assets.forEach((asset, id) => {
      let currentTrend = this.assetTrends.get(id) || 0
      if (Math.random() < 0.05) {
        const targetTrend = (Math.random() - 0.5) * 0.002
        currentTrend = currentTrend * 0.8 + targetTrend * 0.2
      }
      this.assetTrends.set(id, currentTrend)

      const volatility = 0.002
      const noise = (Math.random() - 0.5) * volatility
      const percentChange = currentTrend + noise
      
      const change = asset.price * percentChange
      const newPrice = Math.max(0.01, asset.price + change)
      
      const currentCandles = [...asset.candles]
      const lastCandle = currentCandles[currentCandles.length - 1]
      const currentHour = Math.floor(now / hourlyMs) * hourlyMs
      
      const volatilityMultiplier = 1 + (Math.abs(percentChange) * 100)
      const randomVariance = 0.5 + Math.random()
      
      // Previous: ~900 volume every 2 mins. New: ~270 volume every 2 mins.
      const baseIncrement = (1 + Math.random() * 3) * 0.3
      
      const volumeIncrement = baseIncrement * randomVariance * volatilityMultiplier
      
      if (lastCandle && lastCandle.time === currentHour) {
        lastCandle.close = newPrice
        lastCandle.high = Math.max(lastCandle.high, newPrice)
        lastCandle.low = Math.min(lastCandle.low, newPrice)
        lastCandle.volume += volumeIncrement 
      } else {
        currentCandles.push({
          time: currentHour,
          open: newPrice,
          high: newPrice,
          low: newPrice,
          close: newPrice,
          volume: 0
        })
        if (currentCandles.length > 1000) currentCandles.shift()
      }

      const newHistory = [...asset.history, { time: now, price: newPrice }]
      if (newHistory.length > 200) newHistory.shift() 

      const startPrice = newHistory[0].price
      const priceChange = ((newPrice - startPrice) / startPrice) * 100

      const newVolume = asset.volume + volumeIncrement

      this.assets.set(id, {
        ...asset,
        price: newPrice,
        change: priceChange,
        history: newHistory,
        candles: currentCandles,
        volume: newVolume, 
        marketCap: newVolume * 150, 
        orderBook: this.generateOrderBook(newPrice, asset.volume)
      })
    })

    this.processLimitOrders()

    this.notify()
    this.persist()
  }

  private processLimitOrders() {
    let stateChanged = false
    
    this.userState.orders.forEach(order => {
      if (order.status !== 'open') return

      const asset = this.assets.get(order.assetId)
      if (!asset) return

      let filled = false
      
      if (order.side === 'buy' && asset.price <= order.price) {
        this.executeLimitFill(order, asset.price)
        filled = true
      } else if (order.side === 'sell' && asset.price >= order.price) {
        this.executeLimitFill(order, asset.price)
        filled = true
      }

      if (filled) stateChanged = true
    })

    if (stateChanged) {
      this.persist()
    }
  }

  private executeLimitFill(order: Order, fillPrice: number) {
    order.status = 'filled'
    
    if (order.side === 'buy') {
      const reservedCost = order.amount * order.price
      const actualCost = order.amount * fillPrice
      const refund = reservedCost - actualCost
      
      if (refund > 0) {
        this.userState.balance += refund
      }

      const existing = this.userState.portfolio.find(p => p.assetId === order.assetId)
      if (existing) {
        const totalValue = (existing.amount * existing.averageBuyPrice) + actualCost
        existing.amount += order.amount
        existing.averageBuyPrice = totalValue / existing.amount
      } else {
        this.userState.portfolio.push({
          assetId: order.assetId,
          amount: order.amount,
          averageBuyPrice: fillPrice
        })
      }
    } else {
      const proceeds = order.amount * fillPrice
      this.userState.balance += proceeds
    }

    this.userState.trades.unshift({
      id: Math.random().toString(36).substr(2, 9),
      assetId: order.assetId,
      side: order.side,
      price: fillPrice,
      amount: order.amount,
      timestamp: Date.now(),
      total: order.amount * fillPrice
    })
  }

  public subscribe(callback: () => void) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  private notify() {
    this.subscribers.forEach(cb => cb())
  }

  private persist() {
    if (typeof window === 'undefined') return
    
    try {
      const assetsToSave = Array.from(this.assets.values()).map(a => ({
        ...a,
        orderBook: undefined 
      }))
      localStorage.setItem('vantage_assets', JSON.stringify(assetsToSave))
      
      localStorage.setItem('vantage_user', JSON.stringify(this.userState))
    } catch (e) {
      console.error("Failed to persist market state", e)
    }
  }

  public getAssets(): Asset[] {
    return Array.from(this.assets.values())
  }

  public getAsset(id: string): Asset | undefined {
    return this.assets.get(id)
  }

  public getUserState(): UserState {
    return this.userState
  }

  public executeTrade(assetId: string, side: 'buy' | 'sell', amount: number, limitPrice?: number) {
    const asset = this.assets.get(assetId)
    if (!asset) throw new Error("Asset not found")

    const slippage = 1 + (Math.random() * 0.004 + 0.001) * (side === 'buy' ? 1 : -1)
    const executionPrice = limitPrice || (asset.price * slippage)
    const totalCost = executionPrice * amount

    if (side === 'buy') {
      if (this.userState.balance < totalCost) throw new Error("Insufficient funds")
      
      this.userState.balance -= totalCost
      
      const existing = this.userState.portfolio.find(p => p.assetId === assetId)
      if (existing) {
        const totalValue = (existing.amount * existing.averageBuyPrice) + totalCost
        existing.amount += amount
        existing.averageBuyPrice = totalValue / existing.amount
      } else {
        this.userState.portfolio.push({
          assetId,
          amount,
          averageBuyPrice: executionPrice
        })
      }
    } else {
      const existing = this.userState.portfolio.find(p => p.assetId === assetId)
      if (!existing || existing.amount < amount) throw new Error("Insufficient assets")
      
      this.userState.balance += totalCost
      existing.amount -= amount
      
      if (existing.amount <= 0) {
        this.userState.portfolio = this.userState.portfolio.filter(p => p.assetId !== assetId)
      }
    }

    const trade: Trade = {
      id: Math.random().toString(36).substr(2, 9),
      assetId,
      side,
      price: executionPrice,
      amount,
      timestamp: Date.now(),
      total: totalCost
    }
    this.userState.trades.unshift(trade)

    this.addNotification({
      type: 'trade',
      title: 'Trade Executed',
      message: `${side === 'buy' ? 'Bought' : 'Sold'} ${amount.toFixed(4)} ${assetId} at $${executionPrice.toFixed(2)}`
    })

    this.notify()
    this.persist()
  }

  public placeOrder(
    assetId: string,
    side: 'buy' | 'sell',
    type: 'market' | 'limit' | 'stop-loss' | 'take-profit',
    amount: number,
    price?: number,
    triggerPrice?: number
  ) {
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      assetId,
      side,
      type,
      price: price || this.assets.get(assetId)!.price,
      amount,
      timestamp: Date.now(),
      status: type === 'market' ? 'filled' : 'open',
      filled: 0,
      triggerPrice
    }

    if (type === 'market') {
      this.executeTrade(assetId, side, amount)
      order.filled = amount
    } else {
      this.userState.orders.push(order)
      this.addNotification({
        type: 'order',
        title: 'Order Placed',
        message: `${type} ${side} order for ${amount.toFixed(4)} ${assetId} placed`
      })
    }

    this.notify()
    this.persist()
  }

  public addToWatchlist(assetId: string) {
    if (!this.userState.watchlist.includes(assetId)) {
      this.userState.watchlist.push(assetId)
      this.persist()
      this.notify()
    }
  }

  public removeFromWatchlist(assetId: string) {
    this.userState.watchlist = this.userState.watchlist.filter(id => id !== assetId)
    this.persist()
    this.notify()
  }

  public createPriceAlert(assetId: string, condition: 'above' | 'below', price: number) {
    const alert: PriceAlert = {
      id: Math.random().toString(36).substr(2, 9),
      assetId,
      condition,
      price,
      triggered: false,
      createdAt: Date.now()
    }
    this.userState.alerts.push(alert)
    this.persist()
    this.notify()
  }

  public deleteAlert(alertId: string) {
    this.userState.alerts = this.userState.alerts.filter(a => a.id !== alertId)
    this.persist()
    this.notify()
  }

  private addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    this.userState.notifications.unshift({
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      read: false
    })

    if (this.userState.notifications.length > 50) {
      this.userState.notifications = this.userState.notifications.slice(0, 50)
    }
  }

  public markNotificationRead(notificationId: string) {
    const notification = this.userState.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      this.persist()
      this.notify()
    }
  }

  public markAllNotificationsRead() {
    this.userState.notifications.forEach(n => n.read = true)
    this.persist()
    this.notify()
  }

  public getOrderBook(assetId: string): OrderBook | undefined {
    return this.orderBooks.get(assetId)
  }

  public getTechnicalIndicators(assetId: string) {
    const asset = this.assets.get(assetId)
    if (!asset) return null
    return TechnicalAnalysis.getIndicators(asset)
  }

  public cancelOrder(orderId: string) {
    const order = this.userState.orders.find(o => o.id === orderId)
    if (order && order.status === 'open') {
      order.status = 'cancelled'
      this.addNotification({
        type: 'order',
        title: 'Order Cancelled',
        message: `${order.type} ${order.side} order for ${order.amount.toFixed(4)} ${order.assetId} cancelled`
      })
      this.persist()
      this.notify()
    }
  }

  public getOHLCV(assetId: string, timeframe: '1H' | '1D' | '1W' = '1D'): OHLCV[] {
    const asset = this.assets.get(assetId)
    if (!asset || !asset.candles) return []

    if (timeframe === '1H') {
      return asset.candles.slice(-168)
    }
    
    return this.aggregateCandles(asset.candles, timeframe)
  }

  public getMarketIndexOHLCV(timeframe: '1H' | '1D' | '1W' = '1D'): OHLCV[] {
    const assets = Array.from(this.assets.values())
    if (assets.length === 0) return []

    const baseAsset = assets[0]
    if (!baseAsset.candles) return []
    
    const indexCandles: OHLCV[] = []
    
    for (let i = 0; i < baseAsset.candles.length; i++) {
      let totalMarketCapOpen = 0
      let totalMarketCapClose = 0
      let totalMarketCapHigh = 0
      let totalMarketCapLow = 0
      let totalVolume = 0
      
      const time = baseAsset.candles[i].time
      
      for (const asset of assets) {
        const candle = asset.candles ? asset.candles[i] : null
        if (candle) {
          const supply = asset.marketCap / asset.price
          totalMarketCapOpen += candle.open * supply
          totalMarketCapClose += candle.close * supply
          totalMarketCapHigh += candle.high * supply
          totalMarketCapLow += candle.low * supply
          totalVolume += candle.volume
        }
      }
      
      indexCandles.push({
        time,
        open: totalMarketCapOpen / 1000,
        close: totalMarketCapClose / 1000,
        high: totalMarketCapHigh / 1000,
        low: totalMarketCapLow / 1000,
        volume: totalVolume
      })
    }

    if (timeframe === '1H') {
      return indexCandles.slice(-168)
    }
    
    return this.aggregateCandles(indexCandles, timeframe)
  }

  private aggregateCandles(candles: OHLCV[], timeframe: '1D' | '1W'): OHLCV[] {
    const aggregated: OHLCV[] = []
    const periodMs = timeframe === '1D' ? 86400000 : 604800000
    
    let currentBucket: OHLCV | null = null
    
    for (const candle of candles) {
      const bucketTime = Math.floor(candle.time / periodMs) * periodMs
      
      if (!currentBucket || currentBucket.time !== bucketTime) {
        if (currentBucket) aggregated.push(currentBucket)
        currentBucket = {
          time: bucketTime,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
          volume: candle.volume
        }
      } else {
        currentBucket.high = Math.max(currentBucket.high, candle.high)
        currentBucket.low = Math.min(currentBucket.low, candle.low)
        currentBucket.close = candle.close
        currentBucket.volume += candle.volume
      }
    }
    
    if (currentBucket) aggregated.push(currentBucket)
    
    return aggregated
  }

  private generateCandlesFromHistory(history: { time: number, price: number }[], baseVolume: number): OHLCV[] {
    const candles: OHLCV[] = []
    
    for (let i = 0; i < history.length; i += 1) {
      const point = history[i]
      const prevPoint = history[i - 1] || point
      
      const open = prevPoint.price
      const close = point.price
      
      const volatility = 0.005 
      const rand1 = Math.random() * volatility
      const rand2 = Math.random() * volatility
      
      const maxBody = Math.max(open, close)
      const minBody = Math.min(open, close)
      
      const high = maxBody * (1 + rand1)
      const low = minBody * (1 - rand2)
      
      const volume = baseVolume / history.length * (Math.random() * 2)

      candles.push({
        time: point.time,
        open,
        high,
        low,
        close,
        volume
      })
    }

    return candles
  }

  public processTrade(assetId: string, amount: number, side: 'buy' | 'sell') {
    const asset = this.assets.get(assetId)
    if (!asset) return

    // Calculate impact: Logarithmic scale ensures visibility for small trades but prevents explosion for large ones
    // 100k trade -> ~2.5% jump
    const magnitude = Math.log10(amount + 1) * 0.005 
    const direction = side === 'buy' ? 1 : -1
    const percentChange = magnitude * direction
    
    const newPrice = asset.price * (1 + percentChange)
    const newVolume = asset.volume + amount
    
    // Update candles
    const currentCandles = [...asset.candles]
    const lastCandle = currentCandles[currentCandles.length - 1]
    
    if (lastCandle) {
        lastCandle.close = newPrice
        lastCandle.high = Math.max(lastCandle.high, newPrice)
        lastCandle.low = Math.min(lastCandle.low, newPrice)
        lastCandle.volume += amount
    }
    
    // Update history
    const newHistory = [...asset.history, { time: Date.now(), price: newPrice }]
    if (newHistory.length > 200) newHistory.shift()

    this.assets.set(assetId, {
        ...asset,
        price: newPrice,
        change: asset.change + (percentChange * 100),
        volume: newVolume,
        marketCap: newVolume * 150,
        history: newHistory,
        candles: currentCandles,
        orderBook: this.generateOrderBook(newPrice, newVolume)
    })
    
    // Add momentum to the trend so the price action continues slightly in that direction
    const currentTrend = this.assetTrends.get(assetId) || 0
    this.assetTrends.set(assetId, currentTrend + (percentChange * 0.5))

    this.notify()
    this.persist()
  }
}

export const marketEngine = new MarketEngine()
