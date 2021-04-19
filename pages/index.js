import Head from 'next/head'
import { useEffect, useState } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

async function fetch(collection) {
  const snapshots = await db.collection(collection).get()
  const data = []
  snapshots.forEach((doc) => data.push(doc.data()));
  return data
}

function InfoCard({data}){
  console.log(data)
  return (
    <div className="shadow-sm border border-gray-200 rounded-lg px-4 py-2 my-2 hover:bg-gray-50">
      <div><b>{ data.name }</b></div>
      <div>Mobile Number: { data.mobile }</div>
      <div>Description: { data.description }</div>
    </div>
  )
}

export default function Home() {
  const [cities, setCities] = useState([])
  const [filters, setFilters] = useState([])

  const [city, setCity] = useState()
  const [filter, setFilter] = useState()

  const [data, setData] = useState()

  useEffect(() => {
    fetch("cities").then(setCities)
    fetch("filters").then(setFilters)
  }, [])

  const getData = () => {
    const selectedCity = city || cities[0].name
    const selectedFilter = filter || filters[0].name

    fetch(selectedFilter).then((items) => {
      setData(items.filter(item => item.city == selectedCity.toLocaleLowerCase()))
    })
  }

  return (
    <div className="bg-blue-300 h-screen p-1">
      <Head>
        <title>CovHelp App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto bg-white rounded-lg p-4">
        <h1 className="font-bold">CovHelp</h1>
        <div className="my-4">
          <label htmlFor="cars">City:</label>
          <select className="mx-2 border border-gray-400 p-1 rounded-md" onChange={(e) => setCity(e.target.value)}>
            {cities.map(data => <option value={data.name} key={data.name}>{data.name}</option>)}
          </select>

          <label htmlFor="cars">Filter:</label>
          <select className="mx-2 border border-gray-400 p-1 rounded-md" onChange={(e) => setFilter(e.target.value)}>
            {filters.map(data => <option value={data.name} key={data.name}>{data.name}</option>)}
          </select>

          <button className="px-2 py-1 bg-blue-500 text-white" onClick={() => getData()}>Search</button>
        </div>

        {
          data != null ? 
          <div className="my-6">
            <h1 className="font-bold text-gray-700 my-4">Showing results for: {filter || filters[0].name} in { city || cities[0].name}</h1>
            {
              data.map(data => (<InfoCard data={data}/>))
            }
            {
              data.length == 0 ? <div>Sorry, no information available at this time.</div>:""
            }
          </div> : <div className="bg-gray-50 text-center p-4 rounded-xl text-gray-700">Use search to find help</div>
        }

      </div>
    </div>
  )
}
