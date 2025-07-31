import type { TrendAnalysis } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

interface TrendsAnalysisProps {
  trends: TrendAnalysis[]
}

export function TrendsAnalysisCard({ trends }: TrendsAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Top Issues to Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        {trends.length > 0 ? (
          <div className="space-y-3">
            {trends.map((trend, index) => (
              <div key={trend.category} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">{index + 1}</Badge>
                    <span className="font-medium capitalize">{trend.category.replace("_", " ")}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {trend.count} negative reviews • Avg: {trend.averageRating.toFixed(1)}/10
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No significant negative trends detected. Great job! 🎉</p>
        )}
      </CardContent>
    </Card>
  )
}
