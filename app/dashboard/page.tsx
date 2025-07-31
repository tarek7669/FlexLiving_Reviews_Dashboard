"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PropertyPerformanceCard } from "@/components/dashboard/property-performance-card"
import { ReviewFilters } from "@/components/dashboard/review-filters"
import { ReviewTable } from "@/components/dashboard/review-table"
import { TrendsAnalysisCard } from "@/components/dashboard/trends-analysis"
import type { Review, PropertyPerformance, TrendAnalysis, FilterOptions } from "@/lib/types"
import { calculatePropertyPerformance, analyzeNegativeTrends } from "@/lib/utils"
import { getUniqueProperties } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function Dashboard() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [properties, setProperties] = useState<string[]>([])
  const [propertyPerformance, setPropertyPerformance] = useState<PropertyPerformance[]>([])
  const [trends, setTrends] = useState<TrendAnalysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReviews()
    setProperties(getUniqueProperties())
  }, [])

  useEffect(() => {
    if (reviews.length > 0) {
      setPropertyPerformance(calculatePropertyPerformance(reviews))
      setTrends(analyzeNegativeTrends(reviews))
    }
  }, [reviews])

  const fetchReviews = async (filters?: FilterOptions) => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams()

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== "" && value !== "all" && value !== "any") {
            queryParams.append(key, value.toString())
          }
        })
      }

      const response = await fetch(`/api/reviews/hostaway?${queryParams}`)
      const data = await response.json()

      if (data.status === "success") {
        setReviews(data.result)
        setFilteredReviews(data.result)
      } else {
        setError("Failed to fetch reviews")
      }
    } catch (err) {
      setError("Error fetching reviews")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFiltersChange = (filters: FilterOptions) => {
    fetchReviews(filters)
  }

  const handleApprovalChange = async (reviewId: number, approved: boolean) => {
    try {
      const response = await fetch("/api/reviews/hostaway", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId, approved }),
      })

      if (response.ok) {
        // Update local state
        setReviews((prev) => prev.map((review) => (review.id === reviewId ? { ...review, approved } : review)))
        setFilteredReviews((prev) => prev.map((review) => (review.id === reviewId ? { ...review, approved } : review)))
      }
    } catch (err) {
      console.error("Error updating review approval:", err)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews Dashboard</h1>
          <p className="text-gray-600">Manage and analyze guest reviews across all properties</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviews.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Approved Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{reviews.filter((r) => r.approved).length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{reviews.filter((r) => !r.approved).length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Property Performance */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Property Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyPerformance.map((property) => (
              <PropertyPerformanceCard key={property.listingName} property={property} />
            ))}
          </div>
        </div>

        {/* Trends Analysis */}
        <TrendsAnalysisCard trends={trends} />

        {/* Filters */}
        <ReviewFilters onFiltersChange={handleFiltersChange} properties={properties} />

        {/* Reviews Table */}
        <ReviewTable reviews={filteredReviews} onApprovalChange={handleApprovalChange} />
      </div>
    </DashboardLayout>
  )
}
