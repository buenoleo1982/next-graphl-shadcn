import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/generated/graphql'
import type { ApolloError } from '@apollo/client'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as v from 'valibot'

const formSchema = v.object({
  username: v.pipe(v.string(), v.minLength(3)),
  password: v.pipe(v.string(), v.minLength(6))
})

const LoginForm = () => {
  const router = useRouter()
  const [loginMutation] = useLoginMutation({
    notifyOnNetworkStatusChange: true
  })

  const form = useForm<v.InferInput<typeof formSchema>>({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onSubmit'
  })
  async function onSubmit(values: v.InferInput<typeof formSchema>) {
    const creds = { ...values }
    console.log(creds)

    form.reset()
    try {
      await loginMutation({
        variables: {
          credentials: creds
        }
      })
      router.push('/')
    } catch (error) {
      throw (error as ApolloError).message
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário ou Email</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default LoginForm
