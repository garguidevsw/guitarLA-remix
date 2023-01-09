import { Link } from "@remix-run/react";
import { formatearFecha } from "~/utils/helpers";

const Post = ({ post }) => {
  const { title, content, image, url, publishedAt } = post;
  return (
    <article className="post">
      <img
        className="imagen"
        src={image.data.attributes.formats.small.url}
        alt={`Imagen blog ${title}`}
      />
      <div className="contenido">
        <h3>{title}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="resumen">{content}</p>
        <Link className="enlace" to={`/posts/${url}`}>Leer entrada</Link>
      </div>
    </article>
  );
};

export default Post;
