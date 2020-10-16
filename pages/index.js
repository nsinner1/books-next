import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import axios from 'axios'

const fetch = async (url) => {
  const response = await axios.get(url);
  return response.data;
}

export default function Home() {
  const {data, error} = useSWR('http://swapi.dev/api/people/', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  // return <div>hello {data.name}!</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {data.results.map((item) => {
          return <h2 key={item.url}>Character name: {item.name}</h2>
        })};
       </main>
    </div>
  )
}
