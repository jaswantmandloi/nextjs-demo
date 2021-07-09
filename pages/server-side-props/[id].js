import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'

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
  console.log('Running ServerSide Props')

  const path = require('path');

  return {
    props: {
      baseName: path.basename(`/foo/bar/baz/asdf/${new Date().getTime()}.html`),
      id: context.query.id
    }, // will be passed to the page component as props
  }
}