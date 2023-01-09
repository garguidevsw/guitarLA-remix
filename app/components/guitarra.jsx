import { Link } from "@remix-run/react";
import React from "react";

const Guitarra = ({ guitarra }) => {
  const { name, description, image, price, url } = guitarra;

  return (
    <div className="guitarra">
        <img src={image.data.attributes.formats.medium.url} alt={`Imagen guitarra ${name}`} />
      <div className="contenido">
        <h3>{name}</h3>
        <p className="description">{description}</p>
        <p className="price">MXN ${price}</p>

        <Link className="enlace" to={`/guitarras/${url}`}>Ver Producto</Link>
      </div>
    </div>
  );
};

export default Guitarra;
