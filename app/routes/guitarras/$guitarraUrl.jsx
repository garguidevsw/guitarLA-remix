import { useLoaderData } from "@remix-run/react"
import { obtenerGuitarra } from "~/models/guitarras.server"

export function meta({data}) {
    if(!data) {
        return {
            title: 'GuitarLA - Guitarra no encontrada',
            description: 'Guitarras, venta y cursos, guitarra no encontrada'
        }
    }

    return {
        title: `GuitarLA - ${ data.data[0].attributes.name }`,
        description: `Guitarras, venta y cursos, guitarra ${ data.data[0].attributes.name }`
    }
}

export async function loader({ params }) {
    const { guitarraUrl } = params

    const guitarra = await obtenerGuitarra(guitarraUrl)

    if(guitarra.data.length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Guitarra no encontrada'
        })
    }

    return guitarra

}

const Guitarra = () => {
    const guitarra = useLoaderData()
    const { name, description, price, image, url } = guitarra.data[0].attributes
  return (
    <div className="guitarra">
        <img className="imagen" src={image.data.attributes.url} alt={`Imagen guitarra ${name}`} />

        <div className="contenido">
            <h3>{ name }</h3>
            <p className="texto">{ description }</p>
            <p className="price">MXN ${ price }</p>
        </div>
    </div>
  )
}

export default Guitarra