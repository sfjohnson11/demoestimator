import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CoverPageProps {
  isCommercial?: boolean
}

export default function CoverPage({ isCommercial = false }: CoverPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 text-white p-8">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">E-Deck Estimator</h1>
            <p className="text-xl">by S F Johnson Enterprises, LLC</p>
            <p className="text-lg mt-2">{isCommercial ? "Commercial" : "Residential"} Edition</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {isCommercial ? "Commercial" : "Residential"} Demolition Estimating Revolution
                </CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  Transform Your {isCommercial ? "Commercial" : "Residential"} Demolition Business with Our Cutting-Edge
                  Estimation Tool
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold">Benefits of Our Estimator</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Lightning-fast estimates in minutes, not hours</li>
                  <li>Comprehensive {isCommercial ? "Commercial" : "Residential"} Demolition component database</li>
                  <li>Automatic calculations for labor and materials</li>
                  <li>Customizable pricing and profit margins</li>
                  <li>Professional-looking estimate reports</li>
                  <li>Cloud-based access from anywhere</li>
                  <li>Work offline with automatic syncing when connection is restored</li>
                  {isCommercial && (
                    <>
                      <li>Team collaboration features</li>
                      <li>Hazardous materials tracking</li>
                    </>
                  )}
                </ul>
                <div className="mt-4 p-3 bg-blue-600/30 rounded-lg border border-blue-300/50">
                  <h4 className="font-semibold">NEW: Offline Capabilities</h4>
                  <p className="text-sm mt-2">
                    Create and edit estimates even without internet connection. Your work is automatically saved locally
                    and synced when you're back online. Perfect for job sites with poor connectivity!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Why Choose E-Deck Estimator?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  E-Deck Estimator is designed specifically for {isCommercial ? "commercial" : "residential"} demolition
                  contractors who want to streamline their estimation process and increase accuracy. Our tool combines
                  industry expertise with cutting-edge technology to provide you with a powerful, user-friendly
                  estimating solution.
                </p>
                <p>
                  With E-Deck Estimator, you'll be able to create professional, detailed estimates in a fraction of the
                  time it takes using traditional methods. This means you can respond to more bids, win more contracts,
                  and grow your business faster.
                </p>
                <p>
                  Our commitment to regular updates ensures that you'll always have access to the most current pricing
                  and industry standards, keeping you competitive in the ever-changing demolition market.
                </p>
                {isCommercial && (
                  <p>
                    The Commercial Edition includes specialized features for larger projects, including structural steel
                    demolition, hazardous materials tracking, and multi-user collaboration tools to keep your entire
                    team on the same page.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl font-semibold mb-8">
              Start creating professional {isCommercial ? "commercial" : "residential"} demolition estimates today with
              E-Deck Estimator!
            </p>
          </div>

          {/* Contact Information */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg">S F Johnson Enterprises, LLC</p>
            <p className="text-lg">www.sfjohnsonconsulting.com</p>
            <p className="text-lg">info@sfjohnsonconsulting.com</p>
          </div>
        </div>
      </div>

      {/* Copyright notice and disclaimer */}
      <div className="mt-auto pt-8 text-center text-sm text-blue-200">
        <p>© 2025 E-Deck Estimator by S F Johnson Enterprises, LLC. All rights reserved.</p>
        <p className="mt-2">Unauthorized use or reproduction of this software is strictly prohibited.</p>
      </div>
    </div>
  )
}
