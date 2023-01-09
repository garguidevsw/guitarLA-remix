import { useLoaderData } from "@remix-run/react"
import Guitarra from "~/components/guitarra"
import { obtenerGuitarras } from "~/models/guitarras.server"

import styles from '~/styles/guitarras.css'

export function meta() {
  return {
    title: 'GuitarLA - Tienda',
    description: 'GuitarLA - Colección de guitarras'
  }
}

export function links() {
  return[
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export async function loader() {

  const guitarras = await obtenerGuitarras()

  return guitarras.data
}

const Tienda = () => {

  const guitarras = useLoaderData()

  return (
    <main className="contenedor">
      <h2 className="heading">Nuestra Colección</h2>
      { guitarras.length && (
        <div className="guitarras-grid">
          {
            guitarras.map( guitarra => (
              <Guitarra
                key={guitarra.id}
                guitarra={guitarra?.attributes}
              />
            ))
          }
        </div>
      )}
    </main>
  )
}

export default Tienda