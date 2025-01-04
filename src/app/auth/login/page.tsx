import Link from 'next/link'

import { LoginForm } from '~/components/forms/LoginForm'

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold">Log in</h1>
        <p className="text-sand-11 text-sm">Welcome back! Please enter your details</p>
      </div>
      <div className="flex flex-col gap-2">
        <LoginForm />
        <p className="text-center text-sand-11">
          Don't have an account?
          {' '}
          <Link className="text-sand-12 hover:underline" href="/auth/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
