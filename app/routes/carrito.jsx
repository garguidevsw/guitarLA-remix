import { useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ClientOnly } from 'remix-utils'
import styles from "~/styles/carrito.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export function meta() {
  return {
    title: "GuitarLA - Carrito de compras",
    description: "Venta de guitarras, música, blog, carrito de compras",
  };
}

const Carrito = () => {
  const [total, setTotal] = useState();
  const { carrito, updateQuantity, deleteGuitarra } = useOutletContext();

  useEffect(() => {
    const calculoTotal = carrito.reduce((total, producto) => {
      return total + producto.quantity * producto.price;
    }, 0);

    setTotal(calculoTotal);
  }, [carrito]);

  //   const calcularTotal = () => {
  //     const total = carrito.reduce((total, producto) => {
  //       return total + producto.quantity * producto.price;
  //     }, 0);

  //     return total;
  //   };

  return (
    <ClientOnly fallback={'Cargando...'}>
        {() => (
        <main className="contenedor">
        <h1 className="heading">Carrito de compras</h1>

        <div className="contenido">
            <div className="carrito">
            <h2>Artículos</h2>
            {carrito?.length > 0 ? (
                carrito?.map((item) => (
                <div key={item.id} className="producto">
                    <div>
                    <img
                        src={item.image}
                        alt={`Imagen del producto ${item.name}`}
                    />
                    </div>

                    <div>
                    <p className="nombre">{item.name}</p>
                    <p>Cantidad:</p>
                    <select
                        onChange={(e) =>
                        updateQuantity({ qty: +e.target.value, id: item.id })
                        }
                        value={item.quantity}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <p className="precio">
                        $ <span>{item.price}</span>
                    </p>
                    <p className="subtotal">
                        Subtotal: $ <span>{item.quantity * item.price}</span>
                    </p>
                    </div>
                    <button
                    onClick={() => {
                        if (!confirm("Desea eliminar la guitarra")) return;
                        deleteGuitarra(item.id)
                    }}
                    type="button"
                    className="btn-eliminar"
                    >
                    X
                    </button>
                </div>
                ))
            ) : (
                <p>No hay articulos</p>
            )}
            </div>

            <aside className="resumen">
            <h3>Resumén del pedido</h3>
            <p>Total a pagar: $ {total}</p>
            </aside>
        </div>
        </main>
        )}
    </ClientOnly>
  );
};

export default Carrito;
