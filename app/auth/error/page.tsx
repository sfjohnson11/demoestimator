import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-white">E-Deck Estimator</h1>
            <p className="text-blue-100 mt-2">Professional Demolition Estimating Tool</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">Authentication Error</CardTitle>
              <CardDescription>
                There was a problem with authentication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-800">
                    Something went wrong during authentication. This could be due to an expired link or an invalid token.
                  </p>
                </div>
                <div className="text-center mt-4">
                  <Link href="/auth/login" className="text-blue-600 underline underline-offset-4">
                    Return to Login
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-center text-sm text-blue-100">
            <p>© 2026 E-Deck Estimator by S F Johnson Enterprises, LLC</p>
          </div>
        </div>
      </div>
    </div>
  )
}
