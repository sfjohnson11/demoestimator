"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { verifyPaymentAndActivate } from "@/app/actions/stripe"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId) {
        setStatus("error")
        setMessage("No payment session found. Please try again or contact support.")
        return
      }

      try {
        const result = await verifyPaymentAndActivate(sessionId)
        
        if (result.success) {
          setStatus("success")
          setMessage("Your subscription has been activated! You now have full access to E-Deck Estimator.")
        } else {
          setStatus("error")
          setMessage(result.error || "Failed to verify payment. Please contact support.")
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        setStatus("error")
        setMessage("An error occurred while verifying your payment. Please contact support.")
      }
    }

    verifyPayment()
  }, [sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
              <CardTitle className="text-2xl">Verifying Payment...</CardTitle>
              <CardDescription>Please wait while we confirm your subscription.</CardDescription>
            </>
          )}
          
          {status === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
              <CardDescription>{message}</CardDescription>
            </>
          )}
          
          {status === "error" && (
            <>
              <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-red-600">Payment Issue</CardTitle>
              <CardDescription>{message}</CardDescription>
            </>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {status === "success" && (
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-green-800 font-medium">Your subscription is now active!</p>
              <p className="text-green-600 text-sm mt-1">Valid for 1 year from today</p>
            </div>
          )}
          
          {status !== "loading" && (
            <Button 
              onClick={() => router.push("/")} 
              className="w-full"
              size="lg"
            >
              {status === "success" ? "Go to E-Deck Estimator" : "Return to Home"}
            </Button>
          )}
          
          {status === "error" && (
            <p className="text-center text-sm text-gray-500">
              Need help? Contact{" "}
              <a href="mailto:support@sfjohnsonconsulting.com" className="text-blue-600 underline">
                support@sfjohnsonconsulting.com
              </a>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
