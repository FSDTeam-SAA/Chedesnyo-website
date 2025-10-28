import React, { Suspense } from 'react'
import VerifyOTPForm from './_components/OtpForm'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <VerifyOTPForm />
    </Suspense>
  )
}

export default page