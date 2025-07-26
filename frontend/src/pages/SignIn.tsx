// components/SignInPage.tsx
import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            variables: {
              colorPrimary: '#3b82f6',
              colorBackground: '#1f2937',
              colorInputBackground: '#374151',
              colorInputText: '#ffffff',
            }
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}

export default SignInPage
