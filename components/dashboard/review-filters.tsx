"use client"

import { useState } from "react"
import type { FilterOptions } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReviewFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void
  properties: string[]
}

export function ReviewFilters({ onFiltersChange, properties }: ReviewFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({})

  const handleFilterChange = (key: keyof FilterOptions, value: string | number | undefined) => {
    const newFilters = { ...filters, [key]: value || undefined }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    setFilters({})
    onFiltersChange({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Property</label>
            <Select onValueChange={(value) => handleFilterChange("listingName", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Properties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                {properties.map((property) => (
                  <SelectItem key={property} value={property}>
                    {property}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Min Rating</label>
            <Select onValueChange={(value) => handleFilterChange("rating", value ? Number.parseInt(value) : undefined)}>
              <SelectTrigger>
                <SelectValue placeholder="Any Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Rating</SelectItem>
                <SelectItem value="8">8+ Stars</SelectItem>
                <SelectItem value="6">6+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Review Type</label>
            <Select onValueChange={(value) => handleFilterChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="guest-to-host">Guest to Host</SelectItem>
                <SelectItem value="host-to-guest">Host to Guest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Date From</label>
            <Input
              type="date"
              value={filters.dateFrom || ""}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
