import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Building2, Star, Users } from "lucide-react"

export default function Home() {
  const properties = [
    "2B N1 A - 29 Shoreditch Heights",
    "1B E2 B - 15 Canary Wharf Tower",
    "Studio S1 C - 8 King's Cross Plaza",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Flex Living Reviews Dashboard</h1>
          <p className="text-xl text-gray-600 mb-8">Manage and analyze guest reviews across all your properties</p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="px-8">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Track performance metrics and trends across all properties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Review Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Approve and manage which reviews appear publicly</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-green-600" />
                Property Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Get detailed insights for each property's performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Guest Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Understand guest satisfaction and identify improvement areas</p>
            </CardContent>
          </Card>
        </div>

        {/* Property Links */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-8">View Property Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{property}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/property/${encodeURIComponent(property)}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Property & Reviews
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
