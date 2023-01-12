import { useLoaderData } from "@remix-run/react"
import ListadoBlog from "~/components/listado-blog"
import { obtenerPosts } from "~/models/posts.server"

export async function loader() {
  const posts = await obtenerPosts()
  console.log(posts.data);
  return posts.data
}

export function meta() {
  return {
    title: 'GuitarLA - Nuestro Blog'
  }
}

const Blog = () => {

  const posts = useLoaderData()
  return (
    
      <ListadoBlog posts={posts} />
    
  )
}

export default Blog