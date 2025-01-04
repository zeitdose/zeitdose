import Link from 'next/link'

import { SignUpForm } from '~/components/forms/SignUpForm'

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Sign Up</h1>
        <p className="text-sand-11">Start your journey here.</p>
      </div>
      <SignUpForm />
      <p className="text-center text-sand-11">
        Already have an account?
        {' '}
        <Link className="text-sand-12 hover:underline" href="/auth/login">
          Log in
        </Link>
      </p>
    </div>
  )
}
