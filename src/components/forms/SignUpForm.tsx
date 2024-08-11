'use client'

import type {
  InferInput as ValibotInput,
} from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useActionState, useEffect, useRef } from 'react'
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
  const formRef = useRef(null)

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   form.handleSubmit((value) => {
  //     console.log(value)
  //   })
  //   console.log(form.formState)
  //   e.preventDefault()
  //   const result = await form.trigger()
  //   console.log(result)
  //   // if (result && form.formState.isValid) {
  //   //   const formData = new FormData(e.currentTarget)
  //   //   formAction(formData)
  //   // }
  // }

  const onSubmit = async (values: ValibotInput<typeof signUpSchema>) => {
    console.log(values)
  }

  useEffect(() => {
    if (state?.message) {
      toast({
        description: state.message,
        title: 'Error',
      })
    }
  }, [state, toast])

  return (
    <>
      <div>
        <h2 className="scroll-m-20 pb-2 text-3xl tracking-tight first:mt-0 font-bold">
          Sign Up
        </h2>
        <small className="text-sand-11">Start your journey here.</small>
      </div>

      <Form {...form}>
        <form
          className="w-2/3 space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="rounded-xl h-11" placeholder="Your Name" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="rounded-xl h-11" placeholder="Your password." {...field} type="password" />
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
                    className="rounded-xl h-11"
                    placeholder="Repeat your password to confirm."
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full rounded-xl h-11" size="lg" type="submit">Sign Up</Button>
        </form>
      </Form>
    </>
  )
}
