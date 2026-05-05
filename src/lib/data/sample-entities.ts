import type { Entity } from '@/types/entity'

export const SAMPLE_ENTITIES: Entity[] = [
  // ─── CBRIN / Canberra Innovation Network ─────────────────────────────────
  {
    id: '1',
    slug: 'cbrin',
    name: 'Canberra Innovation Network (CBRIN)',
    shortDescription: 'The peak body for innovation in Canberra, connecting entrepreneurs, researchers, investors, and government.',
    description: `CBRIN is the central hub for Canberra's innovation ecosystem. We connect entrepreneurs, startups, researchers, investors, government and corporates to foster collaboration and economic growth in the ACT.

CBRIN operates a range of programs and initiatives including:
- **ON Accelerator** – a world-class startup accelerator
- **Landing Pad** – an innovation space in the Canberra CBD
- **GRIFFIN Accelerator** – focused on defence and national security innovation
- **Tech Jumpstart** – helping researchers commercialise IP

We also run the ACT Innovation Festival and a broad events calendar to keep the ecosystem connected.`,
    entityType: 'organisation',
    organisationType: 'not-for-profit',
    deliveryMode: 'hybrid',
    geographicCoverage: 'act-region',
    costType: 'mixed',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: true,
    website: 'https://cbrin.com.au',
    sectors: ['generalist', 'deep-tech', 'ai-data', 'defence'],
    audiences: ['founder', 'startup', 'researcher', 'investor'],
    stages: ['idea', 'early', 'growth'],
    tags: ['accelerator', 'co-working', 'events', 'networking', 'peak body'],
    location: {
      addressLine1: '1 Moore St',
      suburb: 'City',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2784,
      longitude: 149.1313,
      precinct: 'City / Civic',
    },
    contacts: [{ name: 'CBRIN Team', email: 'hello@cbrin.com.au', isPrimary: true }],
    viewCount: 4821,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z',
  },

  // ─── ON Accelerator ───────────────────────────────────────────────────────
  {
    id: '2',
    slug: 'on-accelerator',
    name: 'ON Accelerator',
    shortDescription: 'Australia\'s leading deep-tech and research-based startup accelerator, supporting commercialisation of university IP.',
    description: `The ON Accelerator is a world-class program run by CBRIN that takes teams from idea to investor-ready in 12 weeks. It specifically targets startups emerging from university research, helping founders understand the commercialisation pathway and build viable businesses.

**Program highlights:**
- 12-week intensive cohort program
- $10,000–$20,000 in grant funding per team
- Access to mentors, investors, and corporates
- Demo Day at the end of the program
- Alumni network of 150+ ventures

Applications open twice per year. Previous cohorts have included companies from ANU, UNSW Canberra, and UC.`,
    entityType: 'program',
    deliveryMode: 'in-person',
    geographicCoverage: 'national',
    costType: 'free',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: true,
    website: 'https://cbrin.com.au/on',
    sectors: ['deep-tech', 'ai-data', 'health', 'climate', 'defence'],
    audiences: ['researcher', 'startup', 'founder'],
    stages: ['idea', 'early'],
    tags: ['accelerator', 'research commercialisation', 'cohort', 'funding', 'demo day'],
    applicationDeadline: '2025-02-28T00:00:00Z',
    location: {
      suburb: 'City',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2784,
      longitude: 149.1313,
      precinct: 'City / Civic',
    },
    contacts: [{ name: 'ON Program Team', email: 'on@cbrin.com.au', isPrimary: true }],
    viewCount: 3210,
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2024-10-15T00:00:00Z',
  },

  // ─── ANU Connect Ventures ─────────────────────────────────────────────────
  {
    id: '3',
    slug: 'anu-connect-ventures',
    name: 'ANU Connect Ventures',
    shortDescription: 'The commercialisation and venture arm of the Australian National University.',
    description: `ANU Connect Ventures helps ANU researchers, staff, and students turn their discoveries into commercial ventures. We provide access to seed funding, IP licensing, business development support, and a network of mentors and investors.

**What we offer:**
- Seed funding (up to $50,000 for proof-of-concept)
- IP licensing and patent support
- Business development mentoring
- Access to ANU facilities and labs
- Connections to the broader innovation ecosystem`,
    entityType: 'university',
    organisationType: 'university',
    deliveryMode: 'in-person',
    geographicCoverage: 'national',
    costType: 'free',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: true,
    website: 'https://connect.anu.edu.au',
    sectors: ['generalist', 'deep-tech', 'health', 'climate', 'quantum'],
    audiences: ['researcher', 'student', 'founder'],
    stages: ['idea', 'early'],
    tags: ['university', 'commercialisation', 'IP', 'seed funding', 'ANU'],
    location: {
      addressLine1: 'Innovation Precinct',
      suburb: 'Acton',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2778,
      longitude: 149.1185,
      precinct: 'Acton / ANU',
    },
    contacts: [{ name: 'ANU Connect', email: 'connect@anu.edu.au', isPrimary: true }],
    viewCount: 2893,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-09-20T00:00:00Z',
  },

  // ─── Entry29 ──────────────────────────────────────────────────────────────
  {
    id: '4',
    slug: 'entry29',
    name: 'Entry29',
    shortDescription: 'Canberra\'s premier co-working and innovation space in the heart of the CBD.',
    description: `Entry29 is a vibrant co-working and innovation space located in the Canberra CBD. It provides hot desks, dedicated desks, private offices, and event spaces to startups, freelancers, and growing companies.

**Facilities:**
- Hot desks and dedicated workstations
- Private offices (1–10 people)
- Podcast/media studio
- Event space (up to 150 people)
- High-speed fibre internet
- Meeting rooms (bookable by the hour)
- Café on-site

Entry29 also hosts regular community events, workshops, and networking evenings.`,
    entityType: 'space',
    deliveryMode: 'in-person',
    geographicCoverage: 'act-only',
    costType: 'paid',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: true,
    website: 'https://entry29.com.au',
    sectors: ['generalist', 'ai-data', 'fintech', 'creative'],
    audiences: ['founder', 'startup', 'sme'],
    stages: ['idea', 'early', 'growth'],
    tags: ['co-working', 'hot desk', 'event space', 'CBD', 'community'],
    location: {
      addressLine1: 'Level 1, 1 Moore St',
      suburb: 'City',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2781,
      longitude: 149.1308,
      precinct: 'City / Civic',
    },
    contacts: [{ name: 'Entry29 Team', email: 'hello@entry29.com.au', isPrimary: true }],
    viewCount: 1987,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-11-05T00:00:00Z',
  },

  // ─── ACT Government - Innovation Hub ──────────────────────────────────────
  {
    id: '5',
    slug: 'act-government-invest-canberra',
    name: 'Invest Canberra',
    shortDescription: 'The ACT Government\'s economic development agency, attracting investment and supporting business growth.',
    description: `Invest Canberra is the ACT Government's dedicated economic development agency. We work to attract investment, facilitate business establishment, and help local businesses grow and export.

**Services include:**
- Business concierge services
- Investment attraction and facilitation
- Trade and export support
- Workforce and skills information
- Connections to government grants and programs
- Site selection assistance

We work closely with CBRIN, universities, and industry bodies to grow the ACT economy.`,
    entityType: 'government',
    organisationType: 'government',
    deliveryMode: 'hybrid',
    geographicCoverage: 'act-region',
    costType: 'free',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: false,
    website: 'https://www.act.gov.au/investcanberra',
    sectors: ['generalist', 'govtech', 'defence', 'health'],
    audiences: ['founder', 'sme', 'corporate', 'investor'],
    stages: ['growth', 'scale', 'export'],
    tags: ['government', 'investment', 'trade', 'ACT economy', 'business support'],
    location: {
      suburb: 'City',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2830,
      longitude: 149.1290,
      precinct: 'City / Civic',
    },
    contacts: [{ name: 'Invest Canberra', email: 'investcanberra@act.gov.au', isPrimary: true }],
    viewCount: 1456,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-08-20T00:00:00Z',
  },

  // ─── R&D Tax Incentive ─────────────────────────────────────────────────────
  {
    id: '6',
    slug: 'rd-tax-incentive',
    name: 'R&D Tax Incentive',
    shortDescription: 'Federal government program offering tax offsets to companies that conduct eligible R&D activities in Australia.',
    description: `The Research and Development (R&D) Tax Incentive is a key Australian Government program that helps companies innovate and grow by offsetting some of the costs of eligible R&D activities.

**Key benefits:**
- 43.5% refundable tax offset for companies with turnover < $20M
- 38.5% non-refundable tax offset for larger companies
- Applies to core and supporting R&D activities
- Registered through AusIndustry

ACT-based companies across all sectors can benefit, especially those in deep tech, health, clean energy, and advanced manufacturing.`,
    entityType: 'grant',
    deliveryMode: 'online',
    geographicCoverage: 'national',
    costType: 'grant-funded',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: false,
    website: 'https://business.gov.au/grants-and-programs/research-and-development-tax-incentive',
    sectors: ['generalist', 'deep-tech', 'health', 'clean-energy', 'advanced-manufacturing'],
    audiences: ['startup', 'sme', 'corporate', 'researcher'],
    stages: ['early', 'growth', 'scale'],
    tags: ['R&D', 'tax offset', 'federal', 'AusIndustry', 'innovation funding'],
    contacts: [],
    viewCount: 3102,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-07-01T00:00:00Z',
  },

  // ─── GRIFFIN Accelerator ──────────────────────────────────────────────────
  {
    id: '7',
    slug: 'griffin-accelerator',
    name: 'GRIFFIN Accelerator',
    shortDescription: 'Australia\'s first defence and national security startup accelerator, based in Canberra.',
    description: `The GRIFFIN Accelerator is a specialised program for startups working in defence, national security, and strategic technology. Run by CBRIN in partnership with Defence Science and Technology (DST), it provides access to:

- $25,000 in non-dilutive funding
- 12-week intensive program
- Direct access to Defence and intelligence agencies
- Security-cleared mentors and advisors
- Potential for follow-on government contracts

GRIFFIN is uniquely positioned in Canberra's national security ecosystem, with direct links to ASIO, ASIS, ASD, and the Department of Defence.`,
    entityType: 'program',
    deliveryMode: 'in-person',
    geographicCoverage: 'national',
    costType: 'free',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: true,
    website: 'https://cbrin.com.au/griffin',
    sectors: ['defence', 'cyber', 'ai-data', 'space', 'deep-tech'],
    audiences: ['founder', 'startup', 'sme'],
    stages: ['early', 'growth'],
    tags: ['defence', 'national security', 'accelerator', 'government contracts', 'DST'],
    applicationDeadline: '2025-03-15T00:00:00Z',
    location: {
      suburb: 'Barton',
      state: 'ACT',
      postcode: '2600',
      latitude: -35.2967,
      longitude: 149.1371,
      precinct: 'Barton / Parkes',
    },
    contacts: [{ name: 'GRIFFIN Team', email: 'griffin@cbrin.com.au', isPrimary: true }],
    viewCount: 2654,
    createdAt: '2023-04-01T00:00:00Z',
    updatedAt: '2024-10-01T00:00:00Z',
  },

  // ─── Stone & Chalk ────────────────────────────────────────────────────────
  {
    id: '8',
    slug: 'stone-chalk-canberra',
    name: 'Stone & Chalk Canberra',
    shortDescription: 'A leading fintech, deep tech, and govtech hub providing workspace, community, and programs.',
    description: `Stone & Chalk's Canberra hub is an innovation precinct focused on fintech, govtech, and deep tech ventures. Located near key government precincts, it provides:

- Premium co-working space
- Access to government agencies and procurement pipelines
- Community events and networking
- Mentoring and advisory connections
- Links to the national Stone & Chalk network (Sydney, Melbourne, Adelaide)`,
    entityType: 'space',
    deliveryMode: 'in-person',
    geographicCoverage: 'act-region',
    costType: 'paid',
    status: 'published',
    verificationStatus: 'self-reported',
    isFeatured: false,
    website: 'https://stoneandchalk.com.au',
    sectors: ['fintech', 'govtech', 'deep-tech', 'ai-data'],
    audiences: ['founder', 'startup', 'sme'],
    stages: ['early', 'growth', 'scale'],
    tags: ['co-working', 'fintech', 'govtech', 'hub', 'innovation precinct'],
    location: {
      suburb: 'Barton',
      state: 'ACT',
      postcode: '2600',
      latitude: -35.2958,
      longitude: 149.1350,
      precinct: 'Barton / Parkes',
    },
    contacts: [{ name: 'Stone & Chalk Canberra', email: 'canberra@stoneandchalk.com.au', isPrimary: true }],
    viewCount: 1123,
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2024-09-10T00:00:00Z',
  },

  // ─── Airtree Ventures ─────────────────────────────────────────────────────
  {
    id: '9',
    slug: 'airtree-ventures',
    name: 'AirTree Ventures',
    shortDescription: 'One of Australia\'s most active VC funds, backing bold founders building transformative technology companies.',
    description: `AirTree is one of Australia's leading venture capital firms, with over $1.5B under management. While headquartered in Sydney, AirTree actively invests in ACT-based companies, particularly those in deep tech, govtech, and defence.

**Investment focus:**
- Seed to Series B
- Typically $500K–$10M initial investment
- Sectors: SaaS, marketplace, deep tech, fintech, health
- Geographic focus: Australia & New Zealand, with some Southeast Asia

AirTree founders benefit from the firm's extensive network, operational support, and community programs including the AirTree Founder Community.`,
    entityType: 'investor',
    deliveryMode: 'hybrid',
    geographicCoverage: 'national',
    costType: 'equity-based',
    status: 'published',
    verificationStatus: 'self-reported',
    isFeatured: false,
    website: 'https://airtree.vc',
    sectors: ['generalist', 'ai-data', 'fintech', 'health', 'govtech', 'deep-tech'],
    audiences: ['founder', 'startup'],
    stages: ['early', 'growth', 'scale'],
    tags: ['VC', 'venture capital', 'seed', 'Series A', 'Series B'],
    location: {
      isVirtual: true,
      locationNotes: 'Headquartered in Sydney, invests nationally',
    },
    contacts: [{ name: 'AirTree Team', email: 'info@airtree.vc', isPrimary: true }],
    viewCount: 1876,
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2024-10-20T00:00:00Z',
  },

  // ─── ACT Chief Minister's Export Awards ───────────────────────────────────
  {
    id: '10',
    slug: 'act-export-finance',
    name: 'Export Finance Australia',
    shortDescription: 'Government-backed finance for Australian exporters and infrastructure investors in developing markets.',
    description: `Export Finance Australia provides finance solutions that help Australian businesses export and grow internationally. For ACT-based businesses, EFA offers:

- Working capital for export contracts
- Buyer credit facilities
- Project finance for overseas infrastructure
- SME export contract loans (from $250K)
- No-cost advisory services

EFA is particularly useful for ACT companies in govtech, defence, and services sectors looking to expand internationally.`,
    entityType: 'grant',
    deliveryMode: 'hybrid',
    geographicCoverage: 'national',
    costType: 'upon-application',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: false,
    website: 'https://efic.gov.au',
    sectors: ['generalist', 'defence', 'govtech', 'advanced-manufacturing'],
    audiences: ['sme', 'corporate'],
    stages: ['scale', 'export'],
    tags: ['export finance', 'government', 'international', 'trade', 'loans'],
    contacts: [{ name: 'EFA Enquiries', phone: '1800 093 724', isPrimary: true }],
    viewCount: 876,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
  },

  // ─── Startmate ────────────────────────────────────────────────────────────
  {
    id: '11',
    slug: 'startmate',
    name: 'Startmate',
    shortDescription: 'Australia\'s most founder-centric community offering fellowship, accelerator, and hiring programs.',
    description: `Startmate is the most beloved startup community in Australia. Their programs include:

- **Startmate Fellowship** – 8-week part-time fellowship for aspiring founders
- **Startmate Accelerator** – $75K for 7.5% equity, intensive 13-week program
- **Startmate Hiring** – dedicated hiring platform for startup talent
- **Women's Fellowship** – specifically for women exploring tech entrepreneurship

Canberra founders regularly participate in Startmate cohorts, and the community has a growing ACT presence.`,
    entityType: 'program',
    deliveryMode: 'hybrid',
    geographicCoverage: 'national',
    costType: 'equity-based',
    status: 'published',
    verificationStatus: 'self-reported',
    isFeatured: false,
    website: 'https://startmate.com',
    sectors: ['generalist', 'ai-data', 'fintech', 'health'],
    audiences: ['founder', 'startup'],
    stages: ['idea', 'early'],
    tags: ['accelerator', 'fellowship', 'community', 'equity', 'nationwide'],
    contacts: [{ name: 'Startmate Team', email: 'hello@startmate.com', isPrimary: true }],
    viewCount: 1543,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z',
  },

  // ─── Founder Institute Canberra ───────────────────────────────────────────
  {
    id: '12',
    slug: 'founder-institute-canberra',
    name: 'Founder Institute Canberra',
    shortDescription: 'Global pre-seed startup accelerator helping aspiring founders build enduring technology companies.',
    description: `The Founder Institute is the world's largest pre-seed accelerator, with a dedicated Canberra chapter. The 14-week part-time program is designed for aspiring or early founders who are still working full-time.

**Key features:**
- Part-time, so founders keep their day job
- Experienced mentors from the ACT ecosystem
- Access to the global FI network (30,000+ mentors and founders)
- Equity-based model (4% equity)
- Focus on building the foundations of a sustainable company`,
    entityType: 'program',
    deliveryMode: 'hybrid',
    geographicCoverage: 'act-region',
    costType: 'equity-based',
    status: 'published',
    verificationStatus: 'self-reported',
    isFeatured: false,
    website: 'https://fi.co/canberra',
    sectors: ['generalist', 'ai-data', 'govtech'],
    audiences: ['founder'],
    stages: ['idea', 'early'],
    tags: ['pre-seed', 'accelerator', 'part-time', 'global', 'equity'],
    location: {
      suburb: 'City',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2803,
      longitude: 149.1310,
      precinct: 'City / Civic',
    },
    contacts: [{ name: 'FI Canberra', email: 'canberra@fi.co', isPrimary: true }],
    viewCount: 743,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-08-01T00:00:00Z',
  },

  // ─── Australian Institute of Entrepreneurship ─────────────────────────────
  {
    id: '13',
    slug: 'innov8-edu-uc',
    name: 'Innov8 – University of Canberra',
    shortDescription: 'UC\'s entrepreneurship and innovation centre, supporting students and researchers to build startups.',
    description: `Innov8 is the University of Canberra's innovation and entrepreneurship hub. It provides UC students, researchers, and recent graduates with the skills, resources, and network to launch technology ventures.

**Programs and services:**
- Innovation Challenge (semester-long competition)
- Startup studio workspace
- Entrepreneurship electives
- Mentoring from industry experts
- Access to UC's research capabilities
- Connections to CBRIN and the broader ACT ecosystem`,
    entityType: 'university',
    organisationType: 'university',
    deliveryMode: 'in-person',
    geographicCoverage: 'act-region',
    costType: 'free',
    status: 'published',
    verificationStatus: 'self-reported',
    isFeatured: false,
    website: 'https://www.canberra.edu.au/innov8',
    sectors: ['generalist', 'health', 'education', 'ai-data'],
    audiences: ['student', 'researcher', 'founder'],
    stages: ['idea', 'early'],
    tags: ['university', 'UC', 'students', 'entrepreneurship', 'innovation'],
    location: {
      addressLine1: 'University Drive',
      suburb: 'Bruce',
      state: 'ACT',
      postcode: '2617',
      latitude: -35.2455,
      longitude: 149.0920,
      precinct: 'Bruce / Belconnen',
    },
    contacts: [{ name: 'Innov8 Team', email: 'innov8@canberra.edu.au', isPrimary: true }],
    viewCount: 654,
    createdAt: '2023-04-01T00:00:00Z',
    updatedAt: '2024-07-01T00:00:00Z',
  },

  // ─── SheStarts ────────────────────────────────────────────────────────────
  {
    id: '14',
    slug: 'she-starts',
    name: 'SheStarts',
    shortDescription: 'Australia\'s leading accelerator for female founders, offering funding, mentoring, and global networks.',
    description: `SheStarts is a unique accelerator and investment program for female founders. Run by BlueChilli, it provides:

- $100,000 in funding per team
- 6-month intensive acceleration
- Technical co-founder matching
- Media profile and exposure
- Access to networks in ANZ and globally

SheStarts actively recruits founders from Canberra, with a focus on mission-driven startups addressing significant problems.`,
    entityType: 'program',
    deliveryMode: 'hybrid',
    geographicCoverage: 'national',
    costType: 'equity-based',
    status: 'published',
    verificationStatus: 'self-reported',
    isFeatured: false,
    website: 'https://shestarts.com.au',
    sectors: ['generalist', 'health', 'social-impact', 'education'],
    audiences: ['founder'],
    stages: ['idea', 'early'],
    tags: ['female founders', 'accelerator', 'funding', 'diversity', 'inclusion'],
    contacts: [{ name: 'SheStarts Team', email: 'hello@shestarts.com.au', isPrimary: true }],
    viewCount: 892,
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z',
  },

  // ─── CSIRO Innovation Fund ─────────────────────────────────────────────────
  {
    id: '15',
    slug: 'csiro-innovation-fund',
    name: 'CSIRO Innovation Fund',
    shortDescription: 'A $200M deep tech venture capital fund investing in CSIRO spin-outs and other Australian deep tech companies.',
    description: `The CSIRO Innovation Fund is managed by Main Sequence Ventures and backed by CSIRO and the federal government. The fund invests in deep tech companies, particularly those emerging from CSIRO and other publicly-funded research organisations.

**Investment criteria:**
- Deep tech focus (AI, robotics, biotech, agtech, energy, materials)
- Preference for CSIRO spin-outs but not exclusive
- Stage: seed to Series A
- Typical investment: $500K–$3M

CSIRO's Canberra facilities (in Black Mountain) are a key source of deal flow for the fund.`,
    entityType: 'investor',
    deliveryMode: 'hybrid',
    geographicCoverage: 'national',
    costType: 'equity-based',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: true,
    website: 'https://www.mainsequence.vc',
    sectors: ['deep-tech', 'ai-data', 'climate', 'health', 'agrifood', 'advanced-manufacturing'],
    audiences: ['researcher', 'founder', 'startup'],
    stages: ['idea', 'early', 'growth'],
    tags: ['CSIRO', 'deep tech', 'VC', 'research commercialisation', 'federal fund'],
    location: {
      addressLine1: 'Clunies Ross Street',
      suburb: 'Acton',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2747,
      longitude: 149.1103,
      precinct: 'Acton / ANU',
    },
    contacts: [{ name: 'Main Sequence', email: 'info@mainsequence.vc', isPrimary: true }],
    viewCount: 2187,
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2024-10-01T00:00:00Z',
  },

  // ─── ACT Entrepreneurs Fund ────────────────────────────────────────────────
  {
    id: '16',
    slug: 'act-entrepreneurs-fund',
    name: 'ACT Entrepreneurs\' Fund',
    shortDescription: 'ACT Government grant program providing up to $50,000 to support new and growing local businesses.',
    description: `The ACT Government's Entrepreneurs' Fund provides grants to help Canberrans start and grow businesses. The fund offers:

- **Business Fundamentals Grant**: up to $10,000 for new businesses
- **Business Growth Grant**: up to $50,000 for established businesses (2+ years)

Eligible expenses include marketing, technology adoption, staff training, product development, and business planning services.

Applications are assessed quarterly. Businesses must be ACT-based and have an ABN.`,
    entityType: 'grant',
    deliveryMode: 'online',
    geographicCoverage: 'act-only',
    costType: 'grant-funded',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: false,
    website: 'https://www.act.gov.au/entrepreneurs-fund',
    sectors: ['generalist'],
    audiences: ['founder', 'startup', 'sme'],
    stages: ['idea', 'early', 'growth'],
    tags: ['ACT grant', 'government', 'small business', 'local', 'startup grant'],
    fundingAmount: 50000,
    contacts: [{ name: 'Business Hub', phone: '13 22 81', isPrimary: true }],
    viewCount: 2891,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z',
  },

  // ─── Perivoli Innovations ─────────────────────────────────────────────────
  {
    id: '17',
    slug: 'perivoli-innovations',
    name: 'Perivoli Innovations',
    shortDescription: 'Canberra-based angel investor and advisor focused on deep tech and defence innovation.',
    description: `Perivoli Innovations is a Canberra-based investment and advisory firm with deep connections to the defence, intelligence, and research sectors. They invest in early-stage companies with a clear path to defence or national security applications.

**Investment focus:**
- Defence and national security applications
- AI, cyber, and autonomous systems
- Early stage (pre-seed to seed)
- ACT-based companies preferred but not required
- Strategic introductions to government customers`,
    entityType: 'investor',
    deliveryMode: 'in-person',
    geographicCoverage: 'national',
    costType: 'equity-based',
    status: 'published',
    verificationStatus: 'self-reported',
    isFeatured: false,
    website: 'https://perivoli.com.au',
    sectors: ['defence', 'cyber', 'ai-data', 'space'],
    audiences: ['founder', 'startup'],
    stages: ['idea', 'early'],
    tags: ['angel', 'defence', 'cyber', 'Canberra', 'national security'],
    location: {
      suburb: 'Braddon',
      state: 'ACT',
      postcode: '2612',
      latitude: -35.2704,
      longitude: 149.1350,
      precinct: 'Braddon / Inner North',
    },
    contacts: [{ name: 'Perivoli Team', email: 'hello@perivoli.com.au', isPrimary: true }],
    viewCount: 654,
    createdAt: '2023-07-01T00:00:00Z',
    updatedAt: '2024-08-01T00:00:00Z',
  },

  // ─── ACT Technology Industry Association (ATIA) ────────────────────────────
  {
    id: '18',
    slug: 'atia',
    name: 'ACT Technology Industry Association (ATIA)',
    shortDescription: 'The peak body for the tech industry in the ACT, advocating for members and fostering collaboration.',
    description: `ATIA is the leading industry association for technology companies in the Australian Capital Territory. Membership provides:

- Advocacy and representation to government
- Access to government procurement pipelines
- Networking events and industry briefings
- Industry reports and research
- Member discounts on products and services
- Media and PR opportunities

ATIA plays an important role in shaping ACT government technology policy and procurement.`,
    entityType: 'network',
    organisationType: 'association',
    deliveryMode: 'hybrid',
    geographicCoverage: 'act-region',
    costType: 'paid',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: false,
    website: 'https://atia.org.au',
    sectors: ['generalist', 'govtech', 'ai-data', 'cyber'],
    audiences: ['sme', 'corporate', 'government'],
    stages: ['growth', 'scale'],
    tags: ['industry association', 'government procurement', 'networking', 'advocacy', 'tech policy'],
    location: {
      suburb: 'City',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2802,
      longitude: 149.1295,
      precinct: 'City / Civic',
    },
    contacts: [{ name: 'ATIA', email: 'info@atia.org.au', isPrimary: true }],
    viewCount: 987,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-09-15T00:00:00Z',
  },

  // ─── Pollenizer ────────────────────────────────────────────────────────────
  {
    id: '19',
    slug: 'actsmart-business-grants',
    name: 'ACTSmart Business Sustainability Grant',
    shortDescription: 'Grants for ACT businesses to improve sustainability and reduce their environmental footprint.',
    description: `The ACTSmart Business Sustainability Grant helps ACT businesses become more sustainable by providing funding for:

- Energy efficiency upgrades
- Renewable energy installations
- Waste reduction initiatives
- Water conservation measures
- Sustainable procurement practices

**Grant tiers:**
- Micro grants: up to $2,500 for businesses with <5 staff
- Small business grants: up to $10,000
- Large business grants: up to $30,000 (competitive)

Applications are assessed on environmental impact and value for money.`,
    entityType: 'grant',
    deliveryMode: 'online',
    geographicCoverage: 'act-only',
    costType: 'grant-funded',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: false,
    website: 'https://www.actsmart.act.gov.au',
    sectors: ['climate', 'sustainability', 'clean-energy'],
    audiences: ['sme', 'startup', 'founder'],
    stages: ['early', 'growth', 'scale'],
    tags: ['sustainability', 'environment', 'energy', 'ACT', 'green'],
    fundingAmount: 30000,
    contacts: [{ name: 'ACTSmart', phone: '13 22 81', isPrimary: true }],
    viewCount: 1102,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-10-01T00:00:00Z',
  },

  // ─── ACT Cyber Hub ─────────────────────────────────────────────────────────
  {
    id: '20',
    slug: 'act-cyber-hub',
    name: 'CyberACT',
    shortDescription: 'Canberra\'s dedicated cyber security innovation cluster connecting government, industry, and academia.',
    description: `CyberACT is the ACT's dedicated cyber security cluster, designed to grow Canberra's position as Australia's cyber capital. As home to key national cyber agencies including ASD and ACSC, Canberra is uniquely positioned to lead Australia's cyber ecosystem.

**Services:**
- Cluster membership and networking
- Access to government cyber talent and agencies
- Co-location in a secure, government-adjacent facility
- Research collaboration with ANU and UNSW Canberra
- Business development support for cyber SMEs
- Connections to international cyber hubs`,
    entityType: 'network',
    organisationType: 'not-for-profit',
    deliveryMode: 'in-person',
    geographicCoverage: 'act-region',
    costType: 'mixed',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: true,
    website: 'https://cyberact.com.au',
    sectors: ['cyber', 'defence', 'govtech'],
    audiences: ['startup', 'sme', 'corporate', 'government'],
    stages: ['early', 'growth', 'scale'],
    tags: ['cyber security', 'cluster', 'ASD', 'ACSC', 'national security'],
    location: {
      suburb: 'City',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2810,
      longitude: 149.1300,
      precinct: 'City / Civic',
    },
    contacts: [{ name: 'CyberACT', email: 'info@cyberact.com.au', isPrimary: true }],
    viewCount: 1876,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z',
  },

  // ─── IgniteX ──────────────────────────────────────────────────────────────
  {
    id: '21',
    slug: 'ignitex-act',
    name: 'IgniteX ACT',
    shortDescription: 'Pre-accelerator program for first-time founders in the ACT, delivered by experienced local entrepreneurs.',
    description: `IgniteX ACT is a 6-week pre-accelerator designed for aspiring founders who have an idea but don't know where to start. The program covers:

- Customer discovery and validation
- Business model fundamentals
- Pitch preparation
- Legal and financial basics
- Founder mindset and resilience

IgniteX is free to participants and is delivered by experienced local entrepreneurs, with support from CBRIN and the ACT Government.`,
    entityType: 'program',
    deliveryMode: 'in-person',
    geographicCoverage: 'act-only',
    costType: 'free',
    status: 'published',
    verificationStatus: 'self-reported',
    isFeatured: false,
    website: 'https://ignitex.com.au',
    sectors: ['generalist'],
    audiences: ['founder', 'student'],
    stages: ['idea'],
    tags: ['pre-accelerator', 'first-time founders', 'free', 'Canberra', 'idea stage'],
    location: {
      suburb: 'City',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2790,
      longitude: 149.1320,
      precinct: 'City / Civic',
    },
    contacts: [{ name: 'IgniteX Team', email: 'hello@ignitex.com.au', isPrimary: true }],
    viewCount: 543,
    createdAt: '2023-08-01T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z',
  },

  // ─── Manteio ──────────────────────────────────────────────────────────────
  {
    id: '22',
    slug: 'manteio',
    name: 'Manteio',
    shortDescription: 'Canberra-based IP law firm specialising in patents, trademarks, and commercialisation for deep tech and life sciences.',
    description: `Manteio is a specialist intellectual property (IP) firm with deep expertise in deep tech, life sciences, and defence IP. Based in Canberra, they work closely with universities, research organisations, and startups to protect and commercialise innovations.

**Services:**
- Patent drafting and prosecution
- Trademark registration
- IP strategy and portfolio management
- Freedom to operate opinions
- Technology licensing
- IP commercialisation advisory`,
    entityType: 'service-provider',
    organisationType: 'for-profit',
    deliveryMode: 'hybrid',
    geographicCoverage: 'national',
    costType: 'paid',
    status: 'published',
    verificationStatus: 'self-reported',
    isFeatured: false,
    website: 'https://manteio.com.au',
    sectors: ['deep-tech', 'health', 'defence', 'advanced-manufacturing'],
    audiences: ['researcher', 'startup', 'sme'],
    stages: ['idea', 'early', 'growth'],
    tags: ['IP', 'patents', 'trademarks', 'legal', 'commercialisation'],
    location: {
      suburb: 'Kingston',
      state: 'ACT',
      postcode: '2604',
      latitude: -35.3110,
      longitude: 149.1420,
      precinct: 'Kingston / Manuka',
    },
    contacts: [{ name: 'Manteio', email: 'info@manteio.com.au', isPrimary: true }],
    viewCount: 432,
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-08-01T00:00:00Z',
  },

  // ─── ACT Innovation Festival ──────────────────────────────────────────────
  {
    id: '23',
    slug: 'act-innovation-festival',
    name: 'ACT Innovation Festival',
    shortDescription: 'An annual celebration of innovation and entrepreneurship in the ACT, featuring 100+ events over 2 weeks.',
    description: `The ACT Innovation Festival is the flagship annual celebration of Canberra's innovation ecosystem. Running for two weeks each October, the Festival features:

- 100+ events across Canberra
- Industry showcases and exhibitions
- Startup competitions and pitch nights
- International keynote speakers
- Workshops and masterclasses
- School and university engagement events
- The ACT Innovation Awards ceremony

The Festival is a joint initiative of CBRIN and the ACT Government and is free to attend.`,
    entityType: 'event-series',
    deliveryMode: 'in-person',
    geographicCoverage: 'act-region',
    costType: 'free',
    status: 'published',
    verificationStatus: 'verified',
    isFeatured: true,
    website: 'https://innovationfestival.com.au',
    sectors: ['generalist'],
    audiences: ['founder', 'startup', 'student', 'corporate', 'community'],
    stages: ['idea', 'early', 'growth', 'scale'],
    tags: ['festival', 'events', 'annual', 'awards', 'community'],
    programStartDate: '2025-10-01T00:00:00Z',
    programEndDate: '2025-10-14T00:00:00Z',
    location: {
      suburb: 'City',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2784,
      longitude: 149.1313,
      precinct: 'City / Civic',
    },
    contacts: [{ name: 'Festival Coordinator', email: 'festival@cbrin.com.au', isPrimary: true }],
    viewCount: 3421,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-10-20T00:00:00Z',
  },

  // ─── MakerSpace CBR ────────────────────────────────────────────────────────
  {
    id: '24',
    slug: 'makerspace-cbr',
    name: 'MakerSpace CBR',
    shortDescription: 'Canberra\'s community makerspace with 3D printers, laser cutters, electronics benches and more.',
    description: `MakerSpace CBR is Canberra's community workshop and maker hub, giving innovators access to physical fabrication equipment. Members can use:

- 3D printers (FDM and SLA)
- Laser cutter and engraver
- CNC router
- Electronics benches and soldering
- Woodworking tools
- Sewing machines and fabrics
- Meeting and collaboration space

Monthly and weekly membership tiers are available. Great for hardware startups, artists, and inventors at the prototyping stage.`,
    entityType: 'space',
    deliveryMode: 'in-person',
    geographicCoverage: 'act-only',
    costType: 'paid',
    status: 'published',
    verificationStatus: 'self-reported',
    isFeatured: false,
    website: 'https://makerspacecbr.com.au',
    sectors: ['advanced-manufacturing', 'deep-tech', 'creative', 'education'],
    audiences: ['founder', 'student', 'community'],
    stages: ['idea', 'early'],
    tags: ['makerspace', '3D printing', 'hardware', 'prototyping', 'community'],
    location: {
      suburb: 'Mitchell',
      state: 'ACT',
      postcode: '2911',
      latitude: -35.2070,
      longitude: 149.1420,
      precinct: 'Mitchell',
    },
    contacts: [{ name: 'MakerSpace CBR', email: 'hello@makerspacecbr.com.au', isPrimary: true }],
    viewCount: 876,
    createdAt: '2023-07-01T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z',
  },

  // ─── Canberra Angels ──────────────────────────────────────────────────────
  {
    id: '25',
    slug: 'canberra-angels',
    name: 'Canberra Angels',
    shortDescription: 'A network of high-net-worth individuals investing in early-stage Canberra startups.',
    description: `Canberra Angels is a community of angel investors based in the ACT who invest in local early-stage companies. The network provides:

- Angel investment ($50K–$500K per deal, syndicated)
- Mentoring and advisory from investors with operational experience
- Introductions to co-investors and later-stage VCs
- Connections to government and corporate procurement

The network meets monthly to hear pitches from vetted startups. Sectors of interest include defence, govtech, health, and deep tech.`,
    entityType: 'investor',
    deliveryMode: 'in-person',
    geographicCoverage: 'act-region',
    costType: 'equity-based',
    status: 'published',
    verificationStatus: 'self-reported',
    isFeatured: false,
    website: 'https://canberraangels.com.au',
    sectors: ['generalist', 'defence', 'govtech', 'health', 'deep-tech'],
    audiences: ['founder', 'startup'],
    stages: ['early', 'growth'],
    tags: ['angel', 'investor', 'Canberra', 'seed', 'syndicate'],
    location: {
      suburb: 'City',
      state: 'ACT',
      postcode: '2601',
      latitude: -35.2795,
      longitude: 149.1330,
      precinct: 'City / Civic',
    },
    contacts: [{ name: 'Canberra Angels', email: 'invest@canberraangels.com.au', isPrimary: true }],
    viewCount: 1234,
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2024-10-01T00:00:00Z',
  },
]
