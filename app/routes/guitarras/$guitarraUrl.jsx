import { useLoaderData, useOutletContext } from "@remix-run/react"
import { useState } from "react"
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

    const [quantity, setQuantity] = useState(0)

    const { agregarCarrito } = useOutletContext()

    const guitarra = useLoaderData()
    const { name, description, price, image, url } = guitarra.data[0].attributes

    const handleSubmit = (e) => {
        e.preventDefault()

        if(quantity < 1){
            alert('Debes seleccionar una cantidad')
            return
        }

        const guitarraSeleccionada = {
            id: guitarra.data[0].id,
            image: image.data.attributes.url,
            name,
            price,
            quantity
        }

        agregarCarrito(guitarraSeleccionada)

    }
  return (
    <div className="guitarra">
        <img className="imagen" src={image.data.attributes.url} alt={`Imagen guitarra ${name}`} />

        <div className="contenido">
            <h3>{ name }</h3>
            <p className="texto">{ description }</p>
            <p className="price">MXN ${ price }</p>

            <form onSubmit={handleSubmit} className="formulario">
                <label htmlFor="cantidad">Cantidad</label>
                <select onChange={ e => setQuantity(+e.target.value)} id="cantidad">
                    <option value="0">-- Seleccione --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <input type="submit" value="Agregar al carrito" />
            </form>
        </div>
    </div>
  )
}

export default Guitarra