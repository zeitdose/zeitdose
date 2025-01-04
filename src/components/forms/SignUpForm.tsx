'use client'

import type {
  InferInput as ValibotInput,
} from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  forward,
  maxLength,
  minLength,
  object,
  partialCheck,
  pipe,
  string,
} from 'valibot'

import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { useToast } from '~/components/ui/use-toast'
import { signUp } from '~/lib/actions/signup'

const signUpSchema = pipe(
  object({
    confirmPassword: pipe(
      string('Please enter your password.'),
      minLength(6, 'You password must have 6 characters or more'),
    ),
    password: pipe(string('Please enter your password.'), minLength(6, 'You password must have 6 characters or more')),
    username: pipe(
      string('username is required'),
      minLength(1, 'Please enter your name'),
      maxLength(255, 'Username must be less than 255 characters'),
    ),
  }),
  forward(
    partialCheck(
      [['password'], ['confirmPassword']],
      input => input.password === input.confirmPassword,
      'The two passwords do not match.',
    ),
    ['confirmPassword'],
  ),
)

export const SignUpForm = () => {
  const { toast } = useToast()

  const [state, formAction] = useActionState(signUp, null)
  const form = useForm<ValibotInput<typeof signUpSchema>>({
    defaultValues: {
      confirmPassword: '',
      password: '',
      username: '',
    },
    resolver: valibotResolver(signUpSchema),
  })

  const onSubmit = async (values: ValibotInput<typeof signUpSchema>) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value)
    })
    formAction(formData)
  }

  useEffect(() => {
    if (state?.message) {
      toast({
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      })
    }
  }, [state, toast])

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Username</FormLabel>
              <FormControl>
                <Input className="h-11 rounded-xl" placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Password</FormLabel>
              <FormControl>
                <Input className="h-11 rounded-xl" placeholder="Your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  className="h-11 rounded-xl"
                  placeholder="Repeat your password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="h-11 w-full rounded-xl" size="lg" type="submit">
          Sign Up
        </Button>
      </form>
    </Form>
  )
}
