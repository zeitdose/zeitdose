'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { InferInput as ValibotInput, maxLength, minLength, object, string, pipe } from 'valibot'

import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { login } from '~/lib/actions/login'

import { useToast } from '~/components/ui/use-toast'

const loginSchema = object({
  // username: string('username is required', [
  //   minLength(1, 'Please enter your name'),
  //   maxLength(255, 'Username must be less than 255 characters'),
  // ]),
  username: pipe(string('username is required'), minLength(1, 'Please enter your name'), maxLength(255, 'Username must be less than 255 characters')),
  password: string('password is required'),
})

export const LoginForm = () => {
  const { toast } = useToast()

  const form = useForm<ValibotInput<typeof loginSchema>>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: ValibotInput<typeof loginSchema>) => {
    const response = await login(values.username, values.password)
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
        <h2>Log in</h2>
        <small>Welcome back! Please enter your details</small>
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
                  <Input placeholder='Your name' {...field} />
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
                  <Input placeholder='Please enter your password.' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Log in</Button>
        </form>
      </Form>
    </>
  )
}
