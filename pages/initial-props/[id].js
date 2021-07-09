import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'

export default function Index() {
  const router = useRouter()
  const handleClick = function() {
    router.push(`/initial-props/${new Date().getTime()}`)
  }
  return (
    <div >
      <Head>
        <title>Get Initial Props</title>
      </Head>

      <button onClick={handleClick}>Push</button>
      
    </div>
  )
}

Index.getInitialProps = function(ctx) {
  console.log("running getInitalProps", ctx)
  return {}
}