import { useLoaderData } from "@remix-run/react"
import ListadoGuitarras from "~/components/listado-guitarras"
import { obtenerGuitarras } from "~/models/guitarras.server"

export function meta() {
  return {
    title: 'GuitarLA - Tienda',
    description: 'GuitarLA - Colección de guitarras'
  }
}

export async function loader() {

  const guitarras = await obtenerGuitarras()

  return guitarras.data
}

const Tienda = () => {

  const guitarras = useLoaderData()

  return (
      <ListadoGuitarras guitarras={guitarras} />

  )
}

export default Tienda