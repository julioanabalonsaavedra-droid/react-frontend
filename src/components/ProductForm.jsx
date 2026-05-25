import React, { useState } from 'react';

function ProductForm() {

const [nombre, setNombre] = useState('');
const [precio, setPrecio] = useState('');
const [categoria, setCategoria] = useState('');
const [imagen, setImagen] = useState(null);
const [visualizacion, setVisualizacion] = useState('');
const [errores, setErrores] = useState({});
const [productos, setProductos] = useState([]);

const validarFormulario = () => {

let nuevosErrores = {};

if(nombre.trim() === ''){
nuevosErrores.nombre='El nombre es obligatorio';
}

if(precio===''){
nuevosErrores.precio='El precio es obligatorio';
}
else if(precio<=0){
nuevosErrores.precio='Debe ser mayor a 0';
}

if(categoria===''){
nuevosErrores.categoria='Seleccione una plataforma';
}

if(!imagen){
nuevosErrores.imagen='Suba una portada';
}

setErrores(nuevosErrores);

return Object.keys(nuevosErrores).length===0;

};

const verImagen=(e)=>{

const archivo=e.target.files[0];

if(archivo){

setImagen(archivo);

setVisualizacion(
URL.createObjectURL(archivo)
);

}

};

const guardarProducto=(e)=>{

e.preventDefault();

if(validarFormulario()){

const nuevoProducto={

nombre,
precio,
categoria,
visualizacion

};

setProductos([
...productos,
nuevoProducto
]);

setNombre('');
setPrecio('');
setCategoria('');
setImagen(null);
setVisualizacion('');
setErrores({});

}

};

return(

<div className="contenedor">

<h1>🎮 Catálogo Gamer</h1>

<form onSubmit={guardarProducto}>

<label>Nombre del videojuego</label>

<input
type="text"
value={nombre}
onChange={(e)=>setNombre(e.target.value)}
/>

{errores.nombre &&
<p className="error">
{errores.nombre}
</p>
}

<label>Precio</label>

<input
type="number"
value={precio}
onChange={(e)=>setPrecio(e.target.value)}
/>

{errores.precio &&
<p className="error">
{errores.precio}
</p>
}

<label>Plataforma</label>

<select
value={categoria}
onChange={(e)=>setCategoria(e.target.value)}
>

<option value="">
Seleccione
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

{errores.categoria &&
<p className="error">
{errores.categoria}
</p>
}

<label>Portada del videojuego</label>

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

{visualizacion && (

<div>

<h3>Vista previa</h3>

<img
src={visualizacion}
alt="preview"
className="visualizacion"
/>

</div>

)}

<button type="submit">

Guardar Juego

</button>

</form>

<hr/>

<h2>🎮 Juegos Registrados</h2>

<div className="lista-productos">

{productos.map(
(producto,index)=>(

<div
className="card"
key={index}
>

<img
src={producto.visualizacion}
alt={producto.nombre}
/>

<h3>

{producto.nombre}

</h3>

<p>

💰 ${producto.precio}

</p>

<p>

🕹️ {producto.categoria}

</p>

</div>

)
)}

</div>

</div>

);

}

export default ProductForm;