import { useLoaderData } from "@remix-run/react";
import { obtenerPost } from "~/models/posts.server";
import { formatearFecha } from "~/utils/helpers";


export function meta({data}) {
    if(!data) {
        return {
            title: 'GuitarLA - Entrada no encontrada',
            description: 'Guitarras, blog, entrada no encontrada'
        }
    }

    return {
        title: `GuitarLA - ${ data.data[0].attributes.title }`,
        description: `Guitarras, blog - ${ data.data[0].attributes.title }`
    }
}

export async function loader({ params }) {
  const post = await obtenerPost(params.postUrl);

  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Entrada no encontrada",
    });
  }

  return post;
}

const Post = () => {
  const post = useLoaderData();
  const { title, content, image, publishedAt } = post?.data[0].attributes;

  return (
    <article className="post mt-3">
      <img
        className="imagen"
        src={image.data.attributes.url}
        alt={`Imagen blog ${title}`}
      />
      <div className="contenido">
        <h3>{title}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{content}</p>
      </div>
    </article>
  );
};

export default Post;
