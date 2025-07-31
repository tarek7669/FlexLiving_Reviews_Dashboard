export interface ReviewCategory {
  category: string
  rating: number
}

export interface Review {
  id: number
  type: string
  status: string
  rating: number | null
  publicReview: string
  reviewCategory: ReviewCategory[]
  submittedAt: string
  guestName: string
  listingName: string
  approved?: boolean // For our approval system
}

export interface PropertyPerformance {
  listingName: string
  averageRating: number
  totalReviews: number
  approvedReviews: number
  categoryAverages: Record<string, number>
}

export interface FilterOptions {
  rating?: number
  category?: string
  type?: string
  dateFrom?: string
  dateTo?: string
  listingName?: string
}

export interface TrendAnalysis {
  category: string
  count: number
  averageRating: number
}
