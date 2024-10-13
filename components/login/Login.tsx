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
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as v from 'valibot'

import loginImg from '@/assets/login.jpeg'
import logo from '@/assets/logo-buenoinfo.png'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'

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
    <main className="flex md:flex-row flex-col w-full min-h-screen">
      <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={loginImg}
            alt="Imagem de fundo na tela de login"
            layout="fill"
            objectFit="cover"
            objectPosition="center 50%"
            priority
          />
        </div>
      </div>
      <section className="flex flex-col justify-center items-center gap-4 bg-background p-4 w-full md:w-1/2 h-full min-h-[calc(100vh-16rem)] md:min-h-screen">
        <div className="flex flex-col items-center space-y-6">
          <Image src={logo} alt="Logo da empresa" className="w-64" />
        </div>
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="font-bold text-2xl tracking-tighter">
              Acesse nosso sistema
            </CardTitle>
            <CardDescription>
              Utilize suas credenciais para acessar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                        <Input
                          type="password"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="pt-2 border-t-2 text-center text-muted-foreground text-sm">
              Ao entrar em nossa plataforma você concorda com nossos Termos de
              Uso e Política de Privacidade.
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}

export default LoginForm
