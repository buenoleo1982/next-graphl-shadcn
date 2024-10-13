import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonGroup,
  Container,
  Heading,
  VStack
} from '@chakra-ui/react'
import type { ApolloError } from 'apollo-server-micro'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as Yup from 'yup'

import { useLoginMutation } from '../../../../generated/graphql'
import LoginInput from './LoginInput'
import StatusText from './StatusText'

const Login = () => {
  const router = useRouter()

  const [loginMutation] = useLoginMutation({
    notifyOnNetworkStatusChange: true
  })

  const [errMsg, setErrMsg] = useState<string | undefined>()

  return (
    <Container h="100vh">
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required('Username is required')
            .max(200, 'Username too long'),
          password: Yup.string()
            .required('Password is required')
            .min(6, 'Password too short')
            .max(200, 'Password too long')
        })}
        onSubmit={async (values, actions) => {
          const creds = { ...values }
          actions.resetForm()
          try {
            await loginMutation({
              variables: {
                credentials: creds
              }
            })
            router.push('/')
          } catch (error) {
            setErrMsg((error as ApolloError).message)
          }
        }}
      >
        <VStack h="100%" justify="center">
          <VStack as={Form} shadow="2xl" w="100%" bg="gray.50" p="4">
            <Heading>Login</Heading>
            <StatusText errMsg={errMsg} />
            <LoginInput name="username" label="Username or Email" />
            <LoginInput name="password" type="password" label="Password" />
            <ButtonGroup colorScheme="purple" w="100%" size="lg" pt="4">
              <Button
                variant="outline"
                w="100%"
                onClick={() => router.push('/auth/signup')}
                leftIcon={<ArrowBackIcon />}
              >
                Sign Up
              </Button>
              <Button w="100%" type="submit">
                Login
              </Button>
            </ButtonGroup>
          </VStack>
        </VStack>
      </Formik>
    </Container>
  )
}

export default Login
