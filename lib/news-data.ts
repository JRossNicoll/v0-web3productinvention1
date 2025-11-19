export interface NewsItem {
  id: string
  title: string
  source: string
  date: string
  url: string
  sentiment: 'positive' | 'negative' | 'neutral'
  relatedAssets: string[]
}

export const REAL_NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "Nvidia CEO Jensen Huang Announces $500B in Orders for Blackwell GPUs",
    source: "The Motley Fool",
    date: "2025-11-17",
    url: "https://www.fool.com/investing/2025/11/17/jensen-huang-just-delivered-incredible-news-for-nv/",
    sentiment: "positive",
    relatedAssets: ["JHUA"]
  },
  {
    id: "n2",
    title: "Meta Wins Antitrust Trial, Not Forced to Spin Off WhatsApp/Instagram",
    source: "NPR",
    date: "2025-11-18",
    url: "https://www.npr.org/2025/11/18/nx-s1-5495626/meta-ftc-instagram-whatsapp-antitrust-ruling",
    sentiment: "positive",
    relatedAssets: ["MZUC"]
  },
  {
    id: "n3",
    title: "OpenAI Revenue Run Rate Hits $20B, Microsoft Payments Leaked",
    source: "TechCrunch",
    date: "2025-11-14",
    url: "https://techcrunch.com/2025/11/14/leaked-documents-shed-light-into-how-much-openai-pays-microsoft/",
    sentiment: "positive",
    relatedAssets: ["SALT"]
  },
  {
    id: "n4",
    title: "Elon Musk's Trillionaire Pay Package Approved by Shareholders",
    source: "BBC News",
    date: "2025-11-18",
    url: "https://www.bbc.com/news/topics/c302m85q53mt",
    sentiment: "positive",
    relatedAssets: ["EMUS"]
  },
  {
    id: "n5",
    title: "Vitalik Buterin Backs 0xbow Privacy Protocol in $3.5M Round",
    source: "Financial Post",
    date: "2025-11-15",
    url: "https://financialpost.com/globe-newswire/0xbow-closes-3-5m-round-for-compliant-crypto-privacy-technology-following-ethereum-foundation-integration",
    sentiment: "positive",
    relatedAssets: ["VBUT"]
  },
  {
    id: "n6",
    title: "Sam Altman 'Waiting to be Replaced' as OpenAI CEO",
    source: "Times of India",
    date: "2025-11-12",
    url: "https://timesofindia.indiatimes.com/technology/tech-news/sam-altman-says-he-is-just-waiting-to-be-replaced-as-openai-ceo-only-matter-of-/articleshow/125124144.cms",
    sentiment: "neutral",
    relatedAssets: ["SALT"]
  },
  {
    id: "n7",
    title: "SpaceX Starship Progress: New Heat Shield Tiles Tested",
    source: "Reuters",
    date: "2025-08-15",
    url: "https://www.reuters.com/business/elon-musk/",
    sentiment: "positive",
    relatedAssets: ["EMUS"]
  },
  {
    id: "n8",
    title: "Cathie Wood's ARK Invest Buys More Tesla Shares",
    source: "Bloomberg",
    date: "2025-10-22",
    url: "#",
    sentiment: "positive",
    relatedAssets: ["CWOO", "EMUS"]
  }
]
