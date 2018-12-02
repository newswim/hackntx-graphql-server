import React from 'react'
import { GRAPHQL_URL } from '../../constants'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Leaflet from 'leaflet'
import './App.css'

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  headers: {
    'X-Hasura-Access-Key': 'password',
  },
})

export const GET_EVENT_TYPES = gql`
  {
    waze2018(distinct_on: event_type) {
      event_type
    }
  }
`

export const LAT_LON_EVENTS = gql`
  {
    waze2018(limit: 50) {
      lat
      lon
      event_description
    }
  }
`

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
          <h1>Waze Event Data</h1>
        <MyMap />
      </div>
    </ApolloProvider>
  )
}

// export const EventTypes = () => {
//   const styles = {
//     listStyle: 'none',
//   }
//   return (
//     <Query query={GET_EVENT_TYPES}>
//       {({ loading, error, data }) => {
//         if (loading) return <p>Loading...</p>
//         if (error) return <p>Error :(</p>

//         const { waze2018 = [] } = data
//         return (
//           <ul style={styles}>
//             {waze2018.map(eventType => (
//               <li key={eventType.event_type}>{eventType.event_type}</li>
//             ))}
//           </ul>
//         )
//       }}
//     </Query>
//   )
// }

export const MyMap = () => {
  const average = [32.984690555, -96.8364421299999]
  return (
    <Map center={average} zoom={10}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Query query={LAT_LON_EVENTS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          const { waze2018 = [] } = data

          console.log(waze2018[0])

          return <div>{waze2018.map((event, i) => <MyMarker event={event} key={i} />)}</div>
            // <MyMarker event={waze2018[0]} />
            // {/waze2018.map((event, i) => <MyMarker event={event} key={i} />)} */}
            // <MyMarker event={waze2018[0]} />
            // <span>hi</span>
          
        }}
      </Query>
    </Map>
  )
}

export const MyMarker = ({ event: { lat, lon, event_description } }) => {
  return (
    <Marker position={[lat, lon]}>
      <Popup>{event_description}</Popup>
    </Marker>
  )
}
