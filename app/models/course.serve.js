export const obtenerCurso = async () => {
  const respuesta = await fetch(`${process.env.API_URL}/course?populate=image`);

  return await respuesta.json()
};
