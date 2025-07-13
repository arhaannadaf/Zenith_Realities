"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, MapPin, Home, Bed, Bath, Wifi, Car, Dumbbell, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function CreateListingPage() {
  const [listingType, setListingType] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [ocrExtracted, setOcrExtracted] = useState(false)

  const amenities = [
    { id: "parking", label: "Parking", icon: Car },
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "security", label: "Security", icon: Shield },
    { id: "power", label: "Power Backup", icon: Zap },
  ]

 const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files
  if (files) {
    const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file))
    setUploadedImages((prev) => [...prev, ...imageUrls])

    // Simulate OCR extraction
    if (files.length > 0) {
      setOcrExtracted(true)
      setTimeout(() => {
        alert("OCR detected phone number: +91 9876543210. Auto-filling contact details...")
      }, 1000)
    }
  }
}

const uploadToServer = async () => {
  const input = document.getElementById("photo-upload") as HTMLInputElement;
  if (!input?.files?.length) return alert("No files selected");

  const formData = new FormData();
  Array.from(input.files).forEach((file) => formData.append("files", file));

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const { urls } = await res.json();
    alert("Uploaded: " + urls.join(", "));
    // Optionally: setUploadedImages([...uploadedImages, ...urls]);
  } else {
    alert("Upload failed.");
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-900 rounded-full flex items-center justify-center">
                  <Home className="w-4 h-4 text-white " />
                </div>
                <span className="text-xl font-bold text-black">Zenith Realities</span>
              </Link>

            <div className="flex items-center space-x-4 ">
              <Link href="/listings">
                <Button variant="outline">Browse Properties</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Post Your Property</h1>
            <p className="text-gray-600">Fill in the details to list your property for free</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Tell us about your property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Listing Type</Label>
                      <Select value={listingType} onValueChange={setListingType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rent">For Rent</SelectItem>
                          <SelectItem value="sale">For Sale</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Property Type</Label>
                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="house">Independent House</SelectItem>
                          <SelectItem value="pg">PG/Hostel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Property Title</Label>
                    <Input id="title" placeholder="e.g., Spacious 2BHK Apartment in Koramangala" />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your property, nearby amenities, and what makes it special..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Bedrooms</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Beds" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Bedroom" : "Bedrooms"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Bathrooms</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Baths" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Bathroom" : "Bathrooms"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="area">Area (sqft)</Label>
                      <Input id="area" type="number" placeholder="e.g., 1200" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">{listingType === "rent" ? "Monthly Rent" : "Sale Price"} (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder={listingType === "rent" ? "e.g., 25000" : "e.g., 5000000"}
                      />
                    </div>

                    {listingType === "rent" && (
                      <div>
                        <Label htmlFor="deposit">Security Deposit (₹)</Label>
                        <Input id="deposit" type="number" placeholder="e.g., 50000" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea id="address" placeholder="Enter complete address with landmarks" rows={3} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="e.g., Bangalore" />
                    </div>

                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" placeholder="e.g., 560034" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                  <CardDescription>Select available amenities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <Checkbox id={amenity.id} />
                        <Label htmlFor={amenity.id} className="flex items-center space-x-2">
                          <amenity.icon className="w-4 h-4" />
                          <span>{amenity.label}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Photos */}
              <Card>
                <CardHeader>
                  <CardTitle>Photos</CardTitle>
                  <CardDescription>Upload high-quality photos of your property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium mb-2">Upload Property Photos</p>
                    <p className="text-gray-600 mb-4">Drag and drop or click to browse</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Label htmlFor="photo-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent">
                        <Camera className="w-4 h-4 mr-2" />
                        Choose Photos
                      </Button>
                      {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {uploadedImages.map((src, idx) => (
                          <img
                            key={idx}
                            src={src}
                            alt={`Uploaded ${idx}`}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                        ))}
                      </div>
                    )}
                    </Label>
                  </div>

                  {/* OCR Upload Section */}
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-blue-900">📸 Smart Upload Feature</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Upload a photo of your "To Let" or "For Sale" sign, and we'll automatically extract contact
                      details!
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="ocr-upload"
                    />
                    <Label htmlFor="ocr-upload">
                      <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                        <Camera className="w-4 h-4 mr-2" />
                        Upload Sign Photo
                      </Button>
                    </Label>
                    {ocrExtracted && <Badge className="ml-2 bg-green-100 text-green-800">OCR Extracted!</Badge>}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Listing Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Property Title</h3>
                    <p className="text-sm text-gray-600">Will appear here as you type</p>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">Location will appear here</span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span>- Bed</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>- Bath</span>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-green-600">₹ --</div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">Publish Listing</Button>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>✓ Free to post</p>
                    <p>✓ Reach thousands of verified tenants</p>
                    <p>✓ Get instant notifications</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
