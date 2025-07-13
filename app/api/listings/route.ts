import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real implementation, use proper database
const listings = [
  {
    id: 1,
    title: "Spacious 2BHK Apartment in Koramangala",
    description: "Beautiful apartment with modern amenities",
    price: 25000,
    location: "Koramangala, Bangalore",
    address: "123 Main Street, Koramangala, Bangalore",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "apartment",
    listingType: "rent",
    amenities: ["parking", "wifi", "security"],
    images: ["/placeholder.svg?height=200&width=300"],
    ownerId: 1,
    verified: true,
    featured: true,
    status: "active",
    createdAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const type = searchParams.get("type")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const bedrooms = searchParams.get("bedrooms")

    let filteredListings = listings.filter((listing) => listing.status === "active")

    // Apply filters
    if (location) {
      filteredListings = filteredListings.filter((listing) =>
        listing.location.toLowerCase().includes(location.toLowerCase()),
      )
    }

    if (type) {
      filteredListings = filteredListings.filter((listing) => listing.type === type)
    }

    if (minPrice) {
      filteredListings = filteredListings.filter((listing) => listing.price >= Number.parseInt(minPrice))
    }

    if (maxPrice) {
      filteredListings = filteredListings.filter((listing) => listing.price <= Number.parseInt(maxPrice))
    }

    if (bedrooms) {
      filteredListings = filteredListings.filter((listing) => listing.bedrooms === Number.parseInt(bedrooms))
    }

    return NextResponse.json({
      listings: filteredListings,
      total: filteredListings.length,
    })
  } catch (error) {
    console.error("Listings fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const listingData = await request.json()

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "price",
      "location",
      "bedrooms",
      "bathrooms",
      "area",
      "type",
      "listingType",
    ]
    for (const field of requiredFields) {
      if (!listingData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Create new listing
    const newListing = {
      id: listings.length + 1,
      ...listingData,
      ownerId: 1, // In real implementation, get from JWT token
      verified: false,
      featured: false,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    listings.push(newListing)

    return NextResponse.json(
      {
        message: "Listing created successfully",
        listing: newListing,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Listing creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
