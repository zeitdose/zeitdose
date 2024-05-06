'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { custom, forward, Input as ValibotInput, maxLength, minLength, object, string } from 'valibot'

import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { signUp } from '~/lib/actions/signup'

import { useToast } from '~/components/ui/use-toast'

const signUpSchema = object({
  username: string('username is required', [
    minLength(1, 'Please enter your name'),
    maxLength(255, 'Username must be less than 255 characters'),
  ]),
  password: string([
    minLength(1, 'Please enter your password.'),
    minLength(6, 'You password must have 6 characters or more.'),
  ]),
  confirmPassword: string([
    minLength(1, 'Please enter your password.'),
    minLength(6, 'You password must have 6 characters or more.'),
  ]),
}, [
  forward(
    custom(
      (input) => input.password === input.confirmPassword,
      'The two passwords do not match.',
    ),
    ['confirmPassword'],
  ),
])

export const SignUpForm = () => {
  const { toast } = useToast()

  const form = useForm<ValibotInput<typeof signUpSchema>>({
    resolver: valibotResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: ValibotInput<typeof signUpSchema>) => {
    const response = await signUp(values.username, values.password)
    if (response.error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: response.error,
      })
    }
  }

  return (
    <>
      <div>
        <h2 className='scroll-m-20 pb-2 text-3xl tracking-tight first:mt-0 font-bold'>
          Sign Up
        </h2>
        <small className='text-sand-11'>Start your journey here.</small>
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
                  <Input placeholder='Your Name' className='rounded-xl h-11' {...field} />
                </FormControl>
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
                  <Input placeholder='Your password.' className='rounded-xl h-11' {...field} />
                </FormControl>
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
                  <Input placeholder='Repeat your password to confirm.' className='rounded-xl h-11' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full rounded-xl h-11' size={'lg'}>Sign Up</Button>
        </form>
      </Form>
    </>
  )
}
