# Flex Living Reviews Dashboard

A comprehensive reviews management system for Flex Living properties, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🏢 Manager Dashboard
- **Property Performance Overview**: View average ratings, total reviews, and approval status for each property
- **Advanced Filtering**: Filter reviews by rating, category, type, date range, and property
- **Review Approval System**: Toggle public visibility of reviews with a simple switch
- **Trend Analysis**: Identify top 3 recurring negative categories that need attention
- **Real-time Stats**: Track total reviews, approved reviews, and pending approvals

### 🏠 Public Property Pages
- **Clean Property Layout**: Modern, responsive design mimicking Flex Living's style
- **Approved Reviews Only**: Display only manager-approved reviews to the public
- **Rating Breakdown**: Visual representation of category-specific ratings
- **Guest Information**: Show guest names, dates, and detailed feedback

### 🔧 Technical Features
- **Mock Hostaway Integration**: Simulated API integration with realistic review data
- **RESTful API**: Clean API routes for fetching and updating review data
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Error Handling**: Proper loading states and error management

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API routes
- **Data**: In-memory JSON storage (easily replaceable with database)
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

\`\`\`
/
├── pages/
│   ├── api/reviews/hostaway.ts    # API route for review management
│   ├── dashboard/index.tsx        # Manager dashboard
│   ├── property/[id].tsx          # Public property pages
│   └── index.tsx                  # Landing page
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── layout/                    # Layout components
│   └── dashboard/                 # Dashboard-specific components
├── lib/
│   ├── types.ts                   # TypeScript type definitions
│   ├── utils.ts                   # Utility functions
│   └── data.ts                    # Mock data and data management
└── styles/globals.css             # Global styles
\`\`\`

## API Endpoints

### GET /api/reviews/hostaway
Fetch reviews with optional filtering:
- \`rating\`: Minimum rating filter
- \`category\`: Filter by review category
- \`type\`: Filter by review type (guest-to-host, host-to-guest)
- \`dateFrom\` / \`dateTo\`: Date range filtering
- \`listingName\`: Filter by property name
- \`approved\`: Filter by approval status

### PATCH /api/reviews/hostaway
Update review approval status:
\`\`\`json
{
  "reviewId": 123,
  "approved": true
}
\`\`\`

## Key Design Decisions

### 1. Data Normalization
Reviews are normalized to include consistent fields across all sources:
- Standardized rating scales (10-point system)
- Categorized feedback (cleanliness, communication, location, etc.)
- Approval status for public display control

### 2. Approval System
- Simple toggle-based approval system
- Reviews default to unapproved for manager review
- Public pages only show approved reviews
- Real-time updates without page refresh

### 3. Performance Analytics
- Property-level performance metrics
- Category-specific rating averages
- Trend analysis for identifying recurring issues
- Visual rating breakdowns for easy comprehension

### 4. User Experience
- Clean, intuitive dashboard interface
- Responsive design for all device types
- Loading states and error handling
- Consistent design language throughout

## Google Reviews Integration Exploration

### Findings
After exploring Google Places API integration:

**Feasibility**: ✅ Technically possible
- Google Places API provides review data
- Can be integrated alongside Hostaway reviews
- Requires API key and proper authentication

**Implementation Considerations**:
- **Rate Limits**: Google Places API has usage quotas
- **Cost**: Paid service after free tier limits
- **Data Structure**: Different format than Hostaway, requires normalization
- **Real-time Updates**: Reviews update frequency varies

**Recommended Approach**:
1. Use Google Places API for initial review import
2. Cache reviews locally to reduce API calls
3. Implement periodic sync (daily/weekly) for new reviews
4. Merge with Hostaway data using unified data structure

**Code Structure for Integration**:
\`\`\`typescript
// lib/google-reviews.ts
interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
}

// Normalize Google reviews to match our Review interface
function normalizeGoogleReview(googleReview: GoogleReview): Review {
  // Implementation details...
}
\`\`\`

## Deployment

### Vercel Deployment
This project is optimized for Vercel deployment:

1. **One-Click Deploy**: 
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/flex-living-reviews)

2. **Manual Deployment**:
   \`\`\`bash
   npm run build
   vercel --prod
   \`\`\`

### Environment Variables
No environment variables required for the demo version. For production with real APIs:
\`\`\`
HOSTAWAY_API_KEY=your_hostaway_api_key
GOOGLE_PLACES_API_KEY=your_google_places_api_key
DATABASE_URL=your_database_connection_string
\`\`\`

## Future Enhancements

1. **Database Integration**: Replace in-memory storage with PostgreSQL/MongoDB
2. **Real Hostaway API**: Connect to actual Hostaway API endpoints
3. **Google Reviews**: Implement full Google Places API integration
4. **Email Notifications**: Alert managers of new reviews requiring approval
5. **Advanced Analytics**: More detailed reporting and trend analysis
6. **Multi-user Support**: Role-based access control for different team members
7. **Review Response System**: Allow managers to respond to reviews
8. **Automated Sentiment Analysis**: AI-powered review categorization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
# Flex Living Reviews Dashboard - Documentation

## Local Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager


### Installation Steps

1. **Clone or download the project files**

```shellscript
# If using git
git clone <repository-url>
cd flex-living-reviews

# Or extract the downloaded files to a folder
```


2. **Install dependencies**

```shellscript
npm install
```


3. **Start the development server**

```shellscript
npm run dev
```


4. **Access the application**

1. Open your browser and navigate to `http://localhost:3000`
2. Dashboard: `http://localhost:3000/dashboard`
3. Property pages: `http://localhost:3000/property/[property-name]`





### Build for Production

```shellscript
npm run build
npm start
```

### Deploy to Vercel

```shellscript
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel --prod
```

---

## Tech Stack Used

### Frontend

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks and context
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **shadcn/ui** - Pre-built accessible UI components
- **Lucide React** - Modern icon library


### Backend

- **Next.js API Routes** - Serverless API endpoints
- **Node.js** - JavaScript runtime environment


### Data Management

- **In-memory JSON storage** - Mock database for demo purposes
- **TypeScript interfaces** - Strongly typed data structures


### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing


---

## Key Design and Logic Decisions

### 1. Architecture Decisions

**App Router over Pages Router**

- Chose Next.js 14 App Router for modern routing capabilities
- Better performance with server components
- Cleaner file organization with `app/` directory structure


**Component-Based Architecture**

- Modular components for reusability (`PropertyPerformanceCard`, `ReviewTable`, etc.)
- Separation of concerns between UI components and business logic
- Custom hooks for data fetching and state management


### 2. Data Structure Design

**Review Normalization**

```typescript
interface Review {
  id: number
  type: string // "guest-to-host" | "host-to-guest"
  status: string
  rating: number | null
  publicReview: string
  reviewCategory: ReviewCategory[]
  submittedAt: string
  guestName: string
  listingName: string
  approved?: boolean // Custom field for approval system
}
```

**Why This Structure:**

- Maintains compatibility with Hostaway API format
- Adds `approved` field for public display control
- Flexible `reviewCategory` array for different rating types
- Consistent date formatting for sorting and filtering


### 3. State Management Strategy

**Local State with React Hooks**

- `useState` for component-level state
- `useEffect` for data fetching and side effects
- No external state management library needed for this scope


**Data Flow:**

1. API calls fetch data from mock storage
2. Local state updates trigger UI re-renders
3. Approval changes immediately update both local state and backend


### 4. UI/UX Design Decisions

**Dashboard Layout**

- Sidebar navigation for easy access
- Card-based layout for property performance metrics
- Table view for detailed review management
- Color-coded status indicators (green for approved, orange for pending)


**Filtering System**

- Real-time filtering without page refresh
- Multiple filter criteria (rating, property, type, date)
- Clear visual feedback for active filters


**Responsive Design**

- Mobile-first approach with Tailwind CSS
- Grid layouts that adapt to screen size
- Touch-friendly interface elements


### 5. Performance Optimizations

**Client-Side Filtering**

- Reduces API calls by filtering data on the frontend
- Immediate response to filter changes
- Maintains good UX even with larger datasets


**Lazy Loading**

- Components load only when needed
- Skeleton loading states for better perceived performance


---

## API Behaviors

### Base Endpoint: `/api/reviews/hostaway`

#### GET Request

**Purpose:** Fetch reviews with optional filtering

**Query Parameters:**

- `rating` (number): Minimum rating filter (1-10 scale)
- `category` (string): Filter by review category
- `type` (string): Filter by review type ("guest-to-host" | "host-to-guest")
- `dateFrom` (string): Start date for date range filter (ISO format)
- `dateTo` (string): End date for date range filter (ISO format)
- `listingName` (string): Filter by specific property name
- `approved` (boolean): Filter by approval status


**Example Requests:**

```shellscript
# Get all reviews
GET /api/reviews/hostaway

# Get approved reviews for specific property
GET /api/reviews/hostaway?listingName=2B%20N1%20A%20-%2029%20Shoreditch%20Heights&approved=true

# Get reviews with rating 8+ from last month
GET /api/reviews/hostaway?rating=8&dateFrom=2023-10-01
```

**Response Format:**

```json
{
  "status": "success",
  "result": [
    {
      "id": 7453,
      "type": "host-to-guest",
      "status": "published",
      "rating": null,
      "publicReview": "Shane and family are wonderful!...",
      "reviewCategory": [
        {"category": "cleanliness", "rating": 10},
        {"category": "communication", "rating": 10}
      ],
      "submittedAt": "2020-08-21 22:45:14",
      "guestName": "Shane Finkelstein",
      "listingName": "2B N1 A - 29 Shoreditch Heights",
      "approved": true
    }
  ],
  "total": 1
}
```

#### PATCH Request

**Purpose:** Update review approval status

**Request Body:**

```json
{
  "reviewId": 7453,
  "approved": true
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Review approval status updated"
}
```

**Error Handling:**

- 400: Invalid request body
- 404: Review not found
- 500: Internal server error


### Data Processing Logic

**Rating Calculation:**

- Individual category ratings are averaged for overall property rating
- 10-point scale maintained throughout the system
- Star display converts to 5-star scale for visual representation


**Trend Analysis:**

- Identifies categories with ratings ≤ 6 as "negative"
- Counts occurrences and calculates averages
- Returns top 3 most problematic categories


**Filtering Logic:**

- Multiple filters applied with AND logic
- Date filtering uses inclusive ranges
- String matching is exact (case-sensitive)
- Special handling for "all" and "any" filter values


---

## Google Reviews Integration Findings

### Technical Feasibility:  POSSIBLE

After exploring Google Places API integration for review data:

### 1. **API Capabilities**

- **Google Places API** provides access to business reviews
- **Places Details API** returns up to 5 most recent reviews
- **Reviews include:** author name, rating (1-5), review text, timestamp
- **Rate limits:** 100,000 requests per day (free tier)


### 2. **Integration Challenges**

**Data Structure Differences:**

```typescript
// Google Places API format
interface GoogleReview {
  author_name: string
  rating: number        // 1-5 scale
  text: string
  time: number         // Unix timestamp
  profile_photo_url: string
}

// Our normalized format
interface Review {
  rating: number | null    // 10-point scale
  reviewCategory: Array<{  // Multiple categories
    category: string
    rating: number
  }>
  // ... other fields
}
```

**Key Differences:**

- Google uses 1-5 scale vs our 10-point system
- Google provides single overall rating vs our category-based ratings
- Limited to 5 reviews per property
- No category breakdown (cleanliness, communication, etc.)


### 3. **Recommended Implementation Strategy**

**Phase 1: Basic Integration**

```typescript
// lib/google-reviews.ts
async function fetchGoogleReviews(placeId: string) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${API_KEY}`
  )
  const data = await response.json()
  return data.result.reviews
}

function normalizeGoogleReview(googleReview: GoogleReview): Review {
  return {
    id: generateId(),
    type: "guest-to-host",
    status: "published",
    rating: googleReview.rating * 2, // Convert 5-point to 10-point
    publicReview: googleReview.text,
    reviewCategory: [
      { category: "overall", rating: googleReview.rating * 2 }
    ],
    submittedAt: new Date(googleReview.time * 1000).toISOString(),
    guestName: googleReview.author_name,
    listingName: "Property Name", // Would need mapping
    approved: true // Auto-approve Google reviews
  }
}
```

**Phase 2: Enhanced Integration**

- Map Google Place IDs to property names
- Implement caching to reduce API calls
- Add periodic sync (daily/weekly) for new reviews
- Merge Google and Hostaway reviews in unified interface


### 4. **Cost Considerations**

- **Free Tier:** 100,000 requests/month
- **Paid Tier:** $17 per 1,000 requests after free limit
- **Optimization:** Cache reviews locally, sync periodically


### 5. **Implementation Timeline**

- **Week 1:** Basic API integration and data normalization
- **Week 2:** Caching system and error handling
- **Week 3:** UI integration and testing
- **Week 4:** Production deployment and monitoring


### 6. **Alternative Approaches**

- **Web Scraping:** Not recommended (violates ToS, unreliable)
- **Third-party APIs:** Services like SerpAPI provide Google Reviews data
- **Manual Import:** CSV/JSON import for one-time data migration


### Conclusion

Google Reviews integration is technically feasible and would provide valuable additional review data. The main challenges are data normalization and API cost management. Recommended approach is a phased implementation starting with basic integration and expanding based on business needs.