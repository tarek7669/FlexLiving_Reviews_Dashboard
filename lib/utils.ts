import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Review, PropertyPerformance, TrendAnalysis } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculatePropertyPerformance(reviews: Review[]): PropertyPerformance[] {
  const propertyMap = new Map<string, Review[]>()

  // Group reviews by property
  reviews.forEach((review) => {
    if (!propertyMap.has(review.listingName)) {
      propertyMap.set(review.listingName, [])
    }
    propertyMap.get(review.listingName)!.push(review)
  })

  return Array.from(propertyMap.entries()).map(([listingName, propertyReviews]) => {
    const totalReviews = propertyReviews.length
    const approvedReviews = propertyReviews.filter((r) => r.approved).length

    // Calculate average rating from category ratings
    const allCategoryRatings: number[] = []
    const categoryTotals: Record<string, { sum: number; count: number }> = {}

    propertyReviews.forEach((review) => {
      review.reviewCategory.forEach((cat) => {
        allCategoryRatings.push(cat.rating)
        if (!categoryTotals[cat.category]) {
          categoryTotals[cat.category] = { sum: 0, count: 0 }
        }
        categoryTotals[cat.category].sum += cat.rating
        categoryTotals[cat.category].count += 1
      })
    })

    const averageRating =
      allCategoryRatings.length > 0 ? allCategoryRatings.reduce((a, b) => a + b, 0) / allCategoryRatings.length : 0

    const categoryAverages: Record<string, number> = {}
    Object.entries(categoryTotals).forEach(([category, { sum, count }]) => {
      categoryAverages[category] = sum / count
    })

    return {
      listingName,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      approvedReviews,
      categoryAverages,
    }
  })
}

export function analyzeNegativeTrends(reviews: Review[]): TrendAnalysis[] {
  const categoryIssues: Record<string, { ratings: number[]; count: number }> = {}

  reviews.forEach((review) => {
    review.reviewCategory.forEach((cat) => {
      if (cat.rating <= 6) {
        // Consider ratings 6 and below as negative
        if (!categoryIssues[cat.category]) {
          categoryIssues[cat.category] = { ratings: [], count: 0 }
        }
        categoryIssues[cat.category].ratings.push(cat.rating)
        categoryIssues[cat.category].count += 1
      }
    })
  })

  return Object.entries(categoryIssues)
    .map(([category, { ratings, count }]) => ({
      category,
      count,
      averageRating: ratings.reduce((a, b) => a + b, 0) / ratings.length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function getStarRating(rating: number): string {
  const stars = Math.round(rating / 2) // Convert 10-point scale to 5-star
  return "★".repeat(stars) + "☆".repeat(5 - stars)
}
