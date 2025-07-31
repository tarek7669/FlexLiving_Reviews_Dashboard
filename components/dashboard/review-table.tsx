"use client"

import { useState } from "react"
import type { Review } from "@/lib/types"
import { formatDate, getStarRating } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

interface ReviewTableProps {
  reviews: Review[]
  onApprovalChange: (reviewId: number, approved: boolean) => void
}

export function ReviewTable({ reviews, onApprovalChange }: ReviewTableProps) {
  const [expandedReview, setExpandedReview] = useState<number | null>(null)

  const getAverageRating = (reviewCategories: Review["reviewCategory"]) => {
    const total = reviewCategories.reduce((sum, cat) => sum + cat.rating, 0)
    return total / reviewCategories.length
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews ({reviews.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold">{review.guestName}</h3>
                    <Badge variant={review.type === "guest-to-host" ? "default" : "secondary"}>{review.type}</Badge>
                    <span className="text-sm text-gray-500">{formatDate(review.submittedAt)}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{getAverageRating(review.reviewCategory).toFixed(1)}</span>
                      <span className="text-yellow-500 text-sm">
                        {getStarRating(getAverageRating(review.reviewCategory))}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{review.listingName}</p>

                  <p className="text-sm mb-3">
                    {expandedReview === review.id
                      ? review.publicReview
                      : `${review.publicReview.substring(0, 150)}${review.publicReview.length > 150 ? "..." : ""}`}
                  </p>

                  {review.publicReview.length > 150 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                    >
                      {expandedReview === review.id ? "Show Less" : "Show More"}
                    </Button>
                  )}

                  <div className="flex flex-wrap gap-2 mt-2">
                    {review.reviewCategory.map((cat, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cat.category.replace("_", " ")}: {cat.rating}/10
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <div className="flex items-center gap-2">
                    {review.approved ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                    <Switch
                      checked={review.approved}
                      onCheckedChange={(checked) => onApprovalChange(review.id, checked)}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{review.approved ? "Public" : "Hidden"}</span>
                </div>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-center py-8 text-gray-500">No reviews found matching your filters.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
