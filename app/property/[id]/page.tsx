"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import type { Review } from "@/lib/types"
import { formatDate, getStarRating } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Wifi, Car, Coffee, Tv, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PropertyPage() {
  const params = useParams()
  const id = params?.id as string
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [propertyName, setPropertyName] = useState<string>("")

  useEffect(() => {
    if (id) {
      fetchPropertyReviews(id)
    }
  }, [id])

  const fetchPropertyReviews = async (propertyId: string) => {
    try {
      // Decode the property ID to get the actual property name
      const decodedPropertyName = decodeURIComponent(propertyId)
      setPropertyName(decodedPropertyName)

      const response = await fetch(
        `/api/reviews/hostaway?listingName=${encodeURIComponent(decodedPropertyName)}&approved=true`,
      )
      const data = await response.json()

      if (data.status === "success") {
        setReviews(data.result)
      }
    } catch (err) {
      console.error("Error fetching property reviews:", err)
    } finally {
      setLoading(false)
    }
  }

  const getOverallRating = () => {
    if (reviews.length === 0) return 0
    const totalRating = reviews.reduce((sum, review) => {
      const avgRating =
        review.reviewCategory.reduce((catSum, cat) => catSum + cat.rating, 0) / review.reviewCategory.length
      return sum + avgRating
    }, 0)
    return totalRating / reviews.length
  }

  const getCategoryAverages = () => {
    const categoryTotals: Record<string, { sum: number; count: number }> = {}

    reviews.forEach((review) => {
      review.reviewCategory.forEach((cat) => {
        if (!categoryTotals[cat.category]) {
          categoryTotals[cat.category] = { sum: 0, count: 0 }
        }
        categoryTotals[cat.category].sum += cat.rating
        categoryTotals[cat.category].count += 1
      })
    })

    return Object.entries(categoryTotals).map(([category, { sum, count }]) => ({
      category,
      average: sum / count,
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const overallRating = getOverallRating()
  const categoryAverages = getCategoryAverages()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{propertyName}</h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">London, UK</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold">{overallRating.toFixed(1)}</span>
                <span className="text-gray-600">({reviews.length} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Images Placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <h2 className="text-2xl font-bold mb-2">Modern Flex Living Space</h2>
                    <p className="text-blue-100">Premium accommodation in the heart of London</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-blue-600" />
                    <span>Free WiFi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-blue-600" />
                    <span>Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-blue-600" />
                    <span>Kitchen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tv className="h-5 w-5 text-blue-600" />
                    <span>Smart TV</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Guest Reviews</h3>

              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-lg">{review.guestName}</h4>
                            <p className="text-gray-600 text-sm">{formatDate(review.submittedAt)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-500">
                              {getStarRating(
                                review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) /
                                  review.reviewCategory.length,
                              )}
                            </span>
                            <Badge variant={review.type === "guest-to-host" ? "default" : "secondary"}>
                              {review.type === "guest-to-host" ? "Guest Review" : "Host Review"}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-gray-800 mb-4">{review.publicReview}</p>

                        <div className="flex flex-wrap gap-2">
                          {review.reviewCategory.map((cat, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cat.category.replace("_", " ")}: {cat.rating}/10
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">No approved reviews yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating Breakdown */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Rating Breakdown</h3>
                <div className="space-y-3">
                  {categoryAverages.map(({ category, average }) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{category.replace("_", " ")}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(average / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8">{average.toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-semibold">{reviews.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Rating</span>
                    <span className="font-semibold">{overallRating.toFixed(1)}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-semibold">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
