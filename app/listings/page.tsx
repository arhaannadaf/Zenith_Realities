"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MapPin, Bed, Bath, Square, Heart, Phone, Eye, Filter, Map, List ,Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const mockListings = [
  {
    id: 1,
    title: "Spacious 2BHK Apartment in Koramangala",
    price: 25000,
    location: "Koramangala, Bangalore",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "Apartment",
    images: ["/placeholder.svg?height=200&width=300"],
    verified: true,
    featured: true,
  },
  {
    id: 2,
    title: "Modern 3BHK Villa with Garden",
    price: 45000,
    location: "Whitefield, Bangalore",
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    type: "Villa",
    images: ["/placeholder.svg?height=200&width=300"],
    verified: true,
    featured: false,
  },
  {
    id: 3,
    title: "Cozy 1BHK Near Metro Station",
    price: 15000,
    location: "Indiranagar, Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    type: "Apartment",
    images: ["/placeholder.svg?height=200&width=300"],
    verified: false,
    featured: false,
  },
]

export default function ListingsPage() {
  const [viewMode, setViewMode] = useState("list")
  const [priceRange, setPriceRange] = useState([10000, 50000])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-900 rounded-full flex items-center justify-center">
                  <Home className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-black">Zenith Realities</span>
              </Link>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Saved (0)
              </Button>
              <Link href="/listings/create">
                <Button className="bg-green-600 hover:bg-green-700">Post Property</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input placeholder="Enter location" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Property Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="pg">PG/Hostel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <Button key={num} variant="outline" size="sm">
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-4 block">
                    Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100000}
                    min={5000}
                    step={1000}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Amenities</label>
                  <div className="space-y-2">
                    {["Parking", "Gym", "Swimming Pool", "Security", "Power Backup"].map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Properties in Bangalore</h1>
                <p className="text-gray-600">{mockListings.length} properties found</p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {viewMode === "list" ? (
              <div className="space-y-6">
                {mockListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      <div className="relative">
                        <Image
                          src={listing.images[0] || "/placeholder.svg"}
                          alt={listing.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        {listing.featured && <Badge className="absolute top-2 left-2 bg-orange-500">Featured</Badge>}
                        {listing.verified && <Badge className="absolute top-2 right-2 bg-green-500">Verified</Badge>}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="md:col-span-2 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{listing.title}</h3>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">₹{listing.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">per month</div>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{listing.location}</span>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1 text-gray-500" />
                            <span className="text-sm">{listing.bedrooms} Bed</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1 text-gray-500" />
                            <span className="text-sm">{listing.bathrooms} Bath</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="w-4 h-4 mr-1 text-gray-500" />
                            <span className="text-sm">{listing.area} sqft</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{listing.type}</Badge>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Phone className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="h-96">
                <CardContent className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Map view will be integrated here</p>
                    <p className="text-sm text-gray-500">Google Maps API integration pending</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
