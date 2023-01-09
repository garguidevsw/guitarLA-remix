import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta() {
  return (
      {
          title: 'GuitarLA - Nosotros',
          description: 'Venta de guitarras, blog de música y cursos'
      }
  )
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

const Nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="Imagen sobre nosotros" />

        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia aspernatur repudiandae nulla, nam harum temporibus? Nesciunt cumque, pariatur dignissimos perferendis temporibus quibusdam sapiente saepe laboriosam et maiores, suscipit incidunt quos.</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia aspernatur repudiandae nulla, nam harum temporibus? Nesciunt cumque, pariatur dignissimos perferendis temporibus quibusdam sapiente saepe laboriosam et maiores, suscipit incidunt quos.</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros