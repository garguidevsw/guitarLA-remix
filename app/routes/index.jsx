
import { useLoaderData } from '@remix-run/react'
import ListadoBlog from '~/components/listado-blog'
import ListadoGuitarras from '~/components/listado-guitarras'
import Curso from '~/components/curso'
import { obtenerGuitarras } from '~/models/guitarras.server'
import { obtenerPosts } from '~/models/posts.server'
import { obtenerCurso } from '~/models/course.serve'

import stylesGuitarras from '~/styles/guitarras.css'
import stylesBlog from '~/styles/blog.css'
import stylesCurso from '~/styles/curso.css'

export function meta() {

}

export function  links() {
  return[
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylesBlog
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

export async function loader() {

  const [guitarras, posts, course] = await Promise.all([
    obtenerGuitarras(), 
    obtenerPosts(),
    obtenerCurso()
  ])

  return {
    guitarras: guitarras.data,
    posts: posts.data,
    course: course.data
  }
}


const Index = () => {

  const { guitarras, posts, course } = useLoaderData()
  console.log(course);

  return (
    <>
      <main className='contenedor'>
        <ListadoGuitarras guitarras={guitarras} />
      </main>
      <Curso course={course.attributes} />
      <section className="contenedor">
        <ListadoBlog posts={posts} />
      </section>
    </>
  )
}

export default Index