import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import * as cookie from 'cookie'

export default function Index(props) {

  const router = useRouter()
  const handleClick = function() {
    router.push(`/server-side-props/${new Date().getTime()}`)
  }


  console.log('props', props)

  return (
    <div >
      <Head>
        <title>Server Side Props</title>
      </Head>

      <button onClick={handleClick}>Push</button>
      
    </div>
  )
}


export async function getServerSideProps(context) {
  const requestHeaders = context.req.headers
  const cookies = requestHeaders.cookie;
  const query = context.query
  const parsedCookies = cookie.parse(cookies);
  console.log('cookies', cookies)
  
  const path = require('path');

  return {
    props: {
      baseName: path.basename(`/foo/bar/baz/asdf/${new Date().getTime()}.html`),
      cookies: parsedCookies,
      requestHeaders,
      query
    }, // will be passed to the page component as props
  }
}