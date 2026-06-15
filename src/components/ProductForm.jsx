import React, { useState } from 'react';
import '../App.css';

function ProductForm() {

const [nombre, setNombre] = useState('');
const [descripcion, setDescripcion] = useState('');
const [precio, setPrecio] = useState('');
const [categoria, setCategoria] = useState('');
const [stock, setStock] = useState('');
const [imagen, setImagen] = useState(null);
const [visualizacion, setVisualizacion] = useState('');
const [errores, setErrores] = useState({});
const [productos, setProductos] = useState([]);

/* FUNCIONES */

const validarFormulario = () => {

let nuevosErrores = {};

if(nombre.trim() === ''){
nuevosErrores.nombre = 'El nombre es obligatorio';
}

if(descripcion.trim() === ''){
nuevosErrores.descripcion = 'La descripción es obligatoria';
}

if(precio === ''){
nuevosErrores.precio = 'El precio es obligatorio';
}
else if(precio <= 0){
nuevosErrores.precio = 'Debe ser mayor a 0';
}

if(categoria === ''){
nuevosErrores.categoria = 'Seleccione una plataforma';
}

if(stock === ''){
nuevosErrores.stock = 'Ingrese stock';
}
else if(stock < 0){
nuevosErrores.stock = 'El stock no puede ser negativo';
}

if(!imagen){
nuevosErrores.imagen = 'Suba una portada';
}

setErrores(nuevosErrores);

return Object.keys(nuevosErrores).length === 0;

};

const verImagen = (e) => {

const archivo = e.target.files[0];

if(archivo){

/* VALIDAR TAMAÑO MAXIMO 2MB */

if(archivo.size > 2 * 1024 * 1024){

setErrores({
...errores,
imagen:'La imagen supera el tamaño permitido de 2MB'
});

setImagen(null);
setVisualizacion('');

return;

}

/* LIMPIAR ERROR SI TODO ESTA BIEN */

setErrores({
...errores,
imagen:''
});

setImagen(archivo);

setVisualizacion(
URL.createObjectURL(archivo)
);

}

};

const guardarProducto = (e) => {

e.preventDefault();

if(validarFormulario()){

const nuevoProducto = {

nombre,
descripcion,
precio,
categoria,
stock,
visualizacion

};

setProductos([
...productos,
nuevoProducto
]);

setNombre('');
setDescripcion('');
setPrecio('');
setCategoria('');
setStock('');
setImagen(null);
setVisualizacion('');
setErrores({});

}

};

const eliminarProducto = (index) => {

const confirmar = window.confirm(
'¿Desea eliminar el producto?'
);

if(confirmar){

const nuevosProductos =
productos.filter((_,i)=>i !== index);

setProductos(nuevosProductos);

}

};

/* RETURN */

return(

<div className="contenedor">

{/* HERO */}

<div className="hero">

<h1 className="logo">
SAVEGAMES
</h1>

<p className="descripcion-web">

🎮 Bienvenido a SAVEGAMES, tu espacio gamer definitivo.

Explora, registra y administra tu colección de videojuegos
favoritos en una plataforma moderna inspirada en las tiendas
gaming actuales. Organiza títulos de distintas plataformas,
controla stock disponible, visualiza portadas y crea tu propio
catálogo personalizado con un diseño futurista, dinámico y
totalmente responsive.

🔥 SAVEGAMES transforma tu biblioteca de juegos en una verdadera experiencia gamer.

</p>

</div>

{/* TITULO */}

<h1>🎮 Catálogo Gamer</h1>

<h2>
Productos registrados: {productos.length}
</h2>

{/* FORMULARIO */}

<form onSubmit={guardarProducto}>

<input
type="text"
placeholder="Nombre del videojuego"
value={nombre}
onChange={(e)=>setNombre(e.target.value)}
/>

<textarea
placeholder="Descripción"
value={descripcion}
onChange={(e)=>setDescripcion(e.target.value)}
></textarea>

<input
type="number"
placeholder="Precio"
value={precio}
onChange={(e)=>setPrecio(e.target.value)}
/>

<select
value={categoria}
onChange={(e)=>setCategoria(e.target.value)}
>

<option value="">
Seleccione Plataforma
</option>

<option value="PC">
PC
</option>

<option value="PlayStation">
PlayStation
</option>

<option value="Xbox">
Xbox
</option>

<option value="Nintendo">
Nintendo
</option>

</select>

<input
type="number"
placeholder="Stock"
value={stock}
onChange={(e)=>setStock(e.target.value)}
/>

<input
type="file"
accept="image/*"
onChange={verImagen}
/>

{errores.imagen &&
<p className="error">
{errores.imagen}
</p>
}

<button type="submit">
Guardar Juego
</button>

</form>

{/* PRODUCTOS */}

<div className="lista-productos">

{productos.map((producto,index)=>(

<div className="card" key={index}>

<img
src={producto.visualizacion}
alt={producto.nombre}
/>

<h3>{producto.nombre}</h3>

<p>{producto.descripcion}</p>

<p>💰 ${producto.precio}</p>

<p>🕹️ {producto.categoria}</p>

<p>📦 Stock: {producto.stock}</p>

<button
onClick={()=>eliminarProducto(index)}
>
Eliminar
</button>

</div>

))}

</div>

{/* FOOTER */}

<footer className="footer">

<h3>⚡ Desarrolladores</h3>

<p>
Proyecto desarrollado por los creadores de SAVEGAMES
</p>

<div className="github-links">

<a
href="https://github.com/julioanabalonsaavedra-droid"
target="_blank"
rel="noreferrer"
>
🚀 JulioAnabalonSaavedra
</a>

<a
href="https://github.com/Voltydemon"
target="_blank"
rel="noreferrer"
>
🎮 VoltyDemon
</a>

</div>

</footer>

</div>

);

}

export default ProductForm;