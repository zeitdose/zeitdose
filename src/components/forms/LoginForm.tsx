"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "~/components/ui/input"
// import { toast } from "~/components/ui/use-toast"
import { signUp } from "~/lib/actions/signup"

export const LoginForm = ( ) => {
  
  return (
    <>
      <div>
        <h2>Log in</h2>
        <small>Welcome back! Please enter your details</small>
      </div>
      {/* <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form> */}
    </>
   );
};
