import type { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'

const Logout = () => {
  return null
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  nookies.destroy(ctx, 'sid', { path: '/' })
  return {
    redirect: {
      destination: '/login',
      permanent: false
    }
  }
}

export default Logout
