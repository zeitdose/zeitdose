'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useActionState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
  forward,
  InferInput as ValibotInput,
  maxLength,
  minLength,
  object,
  partialCheck,
  pipe,
  string,
  value,
} from 'valibot'

import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { signUp } from '~/lib/actions/signup'

import { useToast } from '~/components/ui/use-toast'

const signUpSchema = pipe(
  object({
    username: pipe(
      string('username is required'),
      minLength(1, 'Please enter your name'),
      maxLength(255, 'Username must be less than 255 characters'),
    ),
    password: pipe(string('Please enter your password.'), minLength(6, 'You password must have 6 characters or more')),
    confirmPassword: pipe(
      string('Please enter your password.'),
      minLength(6, 'You password must have 6 characters or more'),
    ),
  }),
  forward(
    partialCheck(
      [['password'], ['confirmPassword']],
      (input) => input.password === input.confirmPassword,
      'The two passwords do not match.',
    ),
    ['confirmPassword'],
  ),
)

export const SignUpForm = () => {
  const { toast } = useToast()

  const [state, formAction] = useActionState(signUp, null)
  const form = useForm<ValibotInput<typeof signUpSchema>>({
    resolver: valibotResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
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
        title: 'Error',
        description: state.message,
      })
    }
  }, [state, toast])

  return (
    <>
      <div>
        <h2 className='scroll-m-20 pb-2 text-3xl tracking-tight first:mt-0 font-bold'>
          Sign Up
        </h2>
        <small className='text-sand-11'>Start your journey here.</small>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-2/3 space-y-6'
        >
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
                  <Input placeholder='Your password.' className='rounded-xl h-11' {...field} type='password' />
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
                  <Input
                    placeholder='Repeat your password to confirm.'
                    className='rounded-xl h-11'
                    {...field}
                    type='password'
                  />
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
