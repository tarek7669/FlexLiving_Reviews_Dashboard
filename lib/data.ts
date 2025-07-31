import type { Review } from "./types"

// Extended mock data based on the provided example
export const mockReviews: Review[] = [
  {
    id: 7453,
    type: "host-to-guest",
    status: "published",
    rating: null,
    publicReview: "Shane and family are wonderful! Would definitely host again :)",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 },
    ],
    submittedAt: "2020-08-21 22:45:14",
    guestName: "Shane Finkelstein",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    approved: true,
  },
  {
    id: 7454,
    type: "guest-to-host",
    status: "published",
    rating: null,
    publicReview:
      "Amazing location and beautifully designed space. The host was very responsive and helpful throughout our stay.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 10 },
      { category: "location", rating: 10 },
      { category: "value", rating: 8 },
    ],
    submittedAt: "2023-11-15 14:30:22",
    guestName: "Emma Thompson",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    approved: true,
  },
  {
    id: 7455,
    type: "guest-to-host",
    status: "published",
    rating: null,
    publicReview:
      "The apartment was clean but the noise from the street was quite disturbing at night. Location is great though.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 7 },
      { category: "location", rating: 9 },
      { category: "noise_level", rating: 4 },
      { category: "value", rating: 7 },
    ],
    submittedAt: "2023-11-10 09:15:33",
    guestName: "Michael Chen",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    approved: false,
  },
  {
    id: 7456,
    type: "guest-to-host",
    status: "published",
    rating: null,
    publicReview: "Perfect for our business trip. Modern amenities and excellent location near transport links.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "location", rating: 10 },
      { category: "amenities", rating: 9 },
      { category: "value", rating: 9 },
    ],
    submittedAt: "2023-11-08 16:45:11",
    guestName: "Sarah Johnson",
    listingName: "1B E2 B - 15 Canary Wharf Tower",
    approved: true,
  },
  {
    id: 7457,
    type: "guest-to-host",
    status: "published",
    rating: null,
    publicReview:
      "The check-in process was confusing and the WiFi kept dropping. The space itself was nice but these issues affected our stay.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 5 },
      { category: "check_in", rating: 4 },
      { category: "wifi", rating: 3 },
      { category: "value", rating: 6 },
    ],
    submittedAt: "2023-11-05 11:20:44",
    guestName: "David Wilson",
    listingName: "1B E2 B - 15 Canary Wharf Tower",
    approved: false,
  },
  {
    id: 7458,
    type: "guest-to-host",
    status: "published",
    rating: null,
    publicReview: "Absolutely loved our stay! The apartment exceeded expectations and the host was incredibly helpful.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "location", rating: 9 },
      { category: "amenities", rating: 10 },
      { category: "value", rating: 9 },
    ],
    submittedAt: "2023-11-01 19:30:15",
    guestName: "Lisa Rodriguez",
    listingName: "Studio S1 C - 8 King's Cross Plaza",
    approved: true,
  },
  {
    id: 7459,
    type: "guest-to-host",
    status: "published",
    rating: null,
    publicReview: "Good location but the apartment felt smaller than expected. Cleanliness could be improved.",
    reviewCategory: [
      { category: "cleanliness", rating: 6 },
      { category: "communication", rating: 8 },
      { category: "location", rating: 9 },
      { category: "space", rating: 5 },
      { category: "value", rating: 6 },
    ],
    submittedAt: "2023-10-28 13:15:27",
    guestName: "James Miller",
    listingName: "Studio S1 C - 8 King's Cross Plaza",
    approved: false,
  },
  {
    id: 7460,
    type: "guest-to-host",
    status: "published",
    rating: null,
    publicReview: "Fantastic experience! Modern, clean, and perfectly located. Would definitely stay again.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "location", rating: 10 },
      { category: "amenities", rating: 9 },
      { category: "value", rating: 10 },
    ],
    submittedAt: "2023-10-25 20:45:33",
    guestName: "Anna Kowalski",
    listingName: "Studio S1 C - 8 King's Cross Plaza",
    approved: true,
  },
]

// In-memory storage for approval status (in production, this would be a database)
const reviewApprovals: Record<number, boolean> = {}

// Initialize approvals from mock data
mockReviews.forEach((review) => {
  reviewApprovals[review.id] = review.approved || false
})

export function getReviews(): Review[] {
  return mockReviews.map((review) => ({
    ...review,
    approved: reviewApprovals[review.id] || false,
  }))
}

export function updateReviewApproval(reviewId: number, approved: boolean): boolean {
  reviewApprovals[reviewId] = approved
  return true
}

export function getUniqueProperties(): string[] {
  return [...new Set(mockReviews.map((review) => review.listingName))]
}
