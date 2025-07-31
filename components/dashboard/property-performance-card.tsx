import type { PropertyPerformance } from "@/lib/types"
import { getStarRating } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PropertyPerformanceCardProps {
  property: PropertyPerformance
}

export function PropertyPerformanceCard({ property }: PropertyPerformanceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold truncate">{property.listingName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Average Rating</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{property.averageRating}</span>
              <span className="text-yellow-500">{getStarRating(property.averageRating)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Reviews</span>
            <Badge variant="secondary">{property.totalReviews}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Approved</span>
            <Badge variant="default">{property.approvedReviews}</Badge>
          </div>

          <div className="pt-2 border-t">
            <h4 className="text-sm font-medium mb-2">Category Averages</h4>
            <div className="space-y-1">
              {Object.entries(property.categoryAverages).map(([category, rating]) => (
                <div key={category} className="flex items-center justify-between text-xs">
                  <span className="capitalize">{category.replace("_", " ")}</span>
                  <span className="font-medium">{rating.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
