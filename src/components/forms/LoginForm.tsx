'use client'

import type { InferInput as ValibotInput } from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { minLength, object, pipe, string } from 'valibot'

import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { useToast } from '~/components/ui/use-toast'
import { login } from '~/lib/actions/login'

const loginSchema = object({
  password: pipe(
    string('Please enter your password.'),
    minLength(6, 'Password must have 6 characters or more'),
  ),
  username: pipe(
    string('Username is required'),
    minLength(1, 'Please enter your username'),
  ),
})

export const LoginForm = () => {
  const { toast } = useToast()
  const [state, formAction] = useActionState(login, null)
  const form = useForm<ValibotInput<typeof loginSchema>>({
    defaultValues: {
      password: '',
      username: '',
    },
    resolver: valibotResolver(loginSchema),
  })

  const onSubmit = async (values: ValibotInput<typeof loginSchema>) => {
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
                <Input className="h-11 rounded-xl" placeholder="Your username" {...field} />
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

        <Button className="h-11 w-full rounded-xl" size="lg" type="submit">
          Log in
        </Button>
      </form>
    </Form>
  )
}
