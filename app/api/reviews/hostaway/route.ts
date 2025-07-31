import { type NextRequest, NextResponse } from "next/server"
import { getReviews, updateReviewApproval } from "../../../../lib/data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const rating = searchParams.get("rating")
    const category = searchParams.get("category")
    const type = searchParams.get("type")
    const dateFrom = searchParams.get("dateFrom")
    const dateTo = searchParams.get("dateTo")
    const listingName = searchParams.get("listingName")
    const approved = searchParams.get("approved")

    let reviews = getReviews()

    // Apply filters
    if (rating) {
      const minRating = Number.parseInt(rating)
      reviews = reviews.filter((review) => {
        const avgRating = review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / review.reviewCategory.length
        return avgRating >= minRating
      })
    }

    if (category) {
      reviews = reviews.filter((review) => review.reviewCategory.some((cat) => cat.category === category))
    }

    if (type && type !== "all") {
      reviews = reviews.filter((review) => review.type === type)
    }

    if (dateFrom) {
      const fromDate = new Date(dateFrom)
      reviews = reviews.filter((review) => new Date(review.submittedAt) >= fromDate)
    }

    if (dateTo) {
      const toDate = new Date(dateTo)
      reviews = reviews.filter((review) => new Date(review.submittedAt) <= toDate)
    }

    if (listingName && listingName !== "all") {
      reviews = reviews.filter((review) => review.listingName === listingName)
    }

    if (approved !== null) {
      const isApproved = approved === "true"
      reviews = reviews.filter((review) => review.approved === isApproved)
    }

    // Sort by submission date (newest first)
    reviews.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())

    return NextResponse.json({
      status: "success",
      result: reviews,
      total: reviews.length,
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { reviewId, approved } = body

    if (typeof reviewId !== "number" || typeof approved !== "boolean") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const success = updateReviewApproval(reviewId, approved)

    if (success) {
      return NextResponse.json({
        status: "success",
        message: "Review approval status updated",
      })
    } else {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error updating review approval:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
