'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { Input as ValibotInput, maxLength, minLength, object, string, custom, forward } from 'valibot'

import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { signUp } from '~/lib/actions/signup'

import { useToast } from '~/components/ui/use-toast'

const signUpSchema = object({
  username: string('username is required', [
    minLength(1, 'Please enter your name'),
    maxLength(255, 'Username must be less than 255 characters'),
  ]),
  password: string([
    minLength(1, "Please enter your password."),
    minLength(6, "You password must have 6 characters or more."),
  ]),
  confirmPassword: string([
    minLength(1, "Please enter your password."),
    minLength(6, "You password must have 6 characters or more."),
  ]),
},[
  forward(
    custom(
      (input) => input.password === input.confirmPassword,
      'The two passwords do not match.'
    ),
    ['confirmPassword']
  ),
])

export const SignUpForm = () => {
  const { toast } = useToast()

  const form = useForm<ValibotInput<typeof signUpSchema>>({
    resolver: valibotResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    },
  })

  const onSubmit = async (values: ValibotInput<typeof signUpSchema>) => {
    try {
      await signUp(values.username, values.password)
    } catch (err) {
      const error = err as Error
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      })
    } finally {
      form.reset()
    }
  }

  return (
    <>
      <div>
        <h2>Sign Up</h2>
        <small>Start your journey here.</small>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>
                  Please confirm your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </>
  )
}
