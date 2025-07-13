import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Home,
  Shield,
  FileText,
  Eye,
  Truck,
  CreditCard,
  Paintbrush,
  Globe,
  Star,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-black sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-900 rounded-full flex items-center justify-center">
                  <Home className="w-4 h-4 text-white " />
                </div>
                <span className="text-xl font-bold text-white">Zenith Realities</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="outline" size="sm">
                <CreditCard className="w-4 h-4 mr-2" />
                Pay Rent
              </Button>
              <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                For Property owners
              </Button>
              <Link href="/auth/signup" className="text-sm font-bold text-white hover:text-blue-600">
                Sign up
              </Link>
              <Link href="/auth/login" className="text-sm font-bold text-white hover:text-blue-600">
                Log in
              </Link>
              <Button variant="ghost" className="text-sm font-bold text-white hover:text-blue-600">
                Menu
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Home with Zenith Realities
          </h1>

          <div className="flex justify-center space-x-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              <FileText className="w-4 h-4 mr-2" />
              Rental Agreement
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Truck className="w-4 h-4 mr-2" />
              Next Day Delivery
            </Badge>
          </div>

          {/* Search Interface */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <Tabs defaultValue="rent" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="rent" >
                  Rent
                </TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
              </TabsList>

              <TabsContent value="rent" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      placeholder="Search upto 3 localities or landmarks"
                      className="h-12"
                      defaultValue="Bangalore"
                    />
                  </div>
                  <Select defaultValue="full-house">
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="BHK Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-house">Full House</SelectItem>
                      <SelectItem value="pg-hostel">PG/Hostel</SelectItem>
                      <SelectItem value="flatmates">Flatmates</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="within-15-days">Within 15 days</SelectItem>
                      <SelectItem value="within-30-days">Within 30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full md:w-auto bg-red-500 hover:bg-red-600 h-12 px-8">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8">
            <p className="text-gray-600 mb-4">Are you a Property Owner?</p>
            <Link href="/listings/create">
              <Button className="bg-green-600 hover:bg-green-700 px-8 py-3">Post Free Property Ad</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  Lowest Price
                </Badge>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-sm">Packers & Movers</CardTitle>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  New Offers
                </Badge>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-sm">Pay rent</CardTitle>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  Flat 10% off
                </Badge>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-sm">Rental Agreement</CardTitle>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Paintbrush className="w-6 h-6 text-red-600" />
                </div>

              </CardHeader>
              <CardContent>
                <CardTitle className="text-sm">Painting & Cleaning</CardTitle>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Use NoBroker */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use Zenith Realities</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Listing</h3>
              <p className="text-gray-600 text-sm">Easy listing process. Also using WhatsApp</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Shortlist without Visit</h3>
              <p className="text-gray-600 text-sm">Extensive Information makes it easy</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rental Agreement</h3>
              <p className="text-gray-600 text-sm">Assistance in creating Rental agreement & Paper work</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-yellow-900 rounded-full flex items-center justify-center">
                  <Home className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">Zenith Realities</span>
              </div>
              <p className="text-gray-400 text-sm">Your trusted partner in finding dream homes and smart investments.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/listings" className="hover:text-white">
                    Browse Properties
                  </Link>
                </li>
                <li>
                  <Link href="/listings/create" className="hover:text-white">
                    Post Property
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    Services
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: support@zenithRealities.com</li>
                <li>Phone: +91 9765295527</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 ZenithRealities. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
