import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

export default function Index() {
  // const router = useRouter()
  const handleClick = function() {
    //router.push(`/initial-props/${new Date().getTime()}`)
    window.history.pushState(null, '', `/initial-props/${new Date().getTime()}`)
  }

  useEffect(() => {
    window.onpopstate = function() {
      console.log('pop state')
    }
  })

  return (
    <div >
      <Head>
        <title>Get Initial Props</title>
      </Head>

      <button onClick={handleClick}>Push</button>

      <a href="/" >Home with reload</a>
      
    </div>
  )
}

Index.getInitialProps = function(ctx) {
  console.log("running getInitalProps", ctx)
  return {}
}