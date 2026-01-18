<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comeya - Panel de control</title>
    <link rel="shortcut icon" href="https://i.ibb.co/sQVD8vP/faviicon.png" type="image/x-icon">
    <!-- Bootstrap CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        .producto-container {
            border: 1px solid #ddd;
            padding: 10px;
            margin-top: 10px;
        }

        .img-thumbnail {
            max-width: 50px;
            max-height: 50px;
        }

        .icono-comida {
            margin-right: 8px;
        }

        .btn-edit {
            background-color: #ffc107;
            color: white;
        }

        .btn-delete {
            background-color: #dc3545;
            color: white;
        }
    </style>
</head>

<body>
    <div class="container mt-4">
        <h2 class="mb-4">Crear una nueva categoría</h2>
        <div class="card p-4 shadow">
            <div class="form-group">
                <label for="category">Nombre de la Categoría:</label>
                <input type="text" class="form-control" id="category" placeholder="Categoría">
            </div>
            <div class="form-group">
                <label for="photo">Adjuntar foto:</label>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="photo" accept="image/*">
                    <label class="custom-file-label" for="photo">Elige una imagen</label>
                </div>
            </div>
            <div class="form-group">
                <label for="options">Tipo de Categoria:</label>
                <select class="form-control" id="options">
                    <option value="" disabled selected>Elige una opción</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Jugos">Jugos</option>
                    <option value="Comida rapida">Comida rápida</option>
                    <option value="Licores">Licores</option>
                    <option value="Postres">Postres</option>
                    <option value="Entradas">Entradas</option>
                    <option value="Platos Principales">Platos Principales</option>
                    <option value="Frutas">Frutas</option>
                    <option value="Helados">Helados</option>
                </select>
            </div>
            <button type="button" class="btn btn-primary mt-3" id="crearCategoria">Crear Categoría</button>
        </div>
        <!-- Sección para mostrar categorías -->
        <div id="categoriasRegistradas" class="mt-5"></div>
    </div>

    <!-- Modal para editar categoría -->
    <div class="modal fade" id="modalEditarCategoria" tabindex="-1" role="dialog" aria-labelledby="modalEditarCategoriaLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditarCategoriaLabel">Editar Categoría</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="editCategory">Nombre de la Categoría:</label>
                        <input type="text" class="form-control" id="editCategory">
                    </div>
                    <div class="form-group">
                        <label for="editPhoto">Adjuntar foto:</label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="editPhoto" accept="image/*">
                            <label class="custom-file-label" for="editPhoto">Elige una imagen</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="editOptions">Tipo de Categoria:</label>
                        <select class="form-control" id="editOptions">
                            <option value="" disabled selected>Elige una opción</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Jugos">Jugos</option>
                            <option value="Comida rapida">Comida rápida</option>
                            <option value="Licores">Licores</option>
                            <option value="Postres">Postres</option>
                            <option value="Entradas">Entradas</option>
                            <option value="Platos Principales">Platos Principales</option>
                            <option value="Frutas">Frutas</option>
                            <option value="Helados">Helados</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" id="guardarCambiosCategoria">Guardar cambios</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para editar producto -->
    <div class="modal fade" id="modalEditarProducto" tabindex="-1" role="dialog" aria-labelledby="modalEditarProductoLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditarProductoLabel">Editar Producto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="editProductName">Nombre del Producto:</label>
                        <input type="text" class="form-control" id="editProductName">
                    </div>
                    <div class="form-group">
                        <label for="editProductDescription">Descripción del Producto:</label>
                        <textarea class="form-control" id="editProductDescription"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="editProductPrice">Precio:</label>
                        <input type="number" class="form-control" id="editProductPrice" min="0">
                    </div>
                    <div class="form-group">
                        <label for="editProductPhoto">Adjuntar foto:</label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="editProductPhoto" accept="image/*">
                            <label class="custom-file-label" for="editProductPhoto">Elige una imagen</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" id="guardarCambiosProducto">Guardar cambios</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        const iconosComida = {
            'Bebidas': 'fas fa-glass-cheers',
            'Jugos': 'fas fa-glass-whiskey',
            'Comida rapida': 'fas fa-hamburger',
            'Licores': 'fas fa-wine-glass',
            'Postres': 'fas fa-ice-cream',
            'Entradas': 'fas fa-utensils',
            'Platos Principales': 'fas fa-drumstick-bite',
            'Frutas': 'fas fa-apple-alt',
            'Helados': 'fas fa-ice-cream'
        };

        let categorias = [];

        document.getElementById('crearCategoria').addEventListener('click', function () {
            const categoria = document.getElementById('category').value;
            const tipo = document.getElementById('options').value;
            const foto = document.getElementById('photo').files[0];
            if (categoria && tipo && foto) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const nuevaCategoria = {
                        nombre: categoria,
                        tipo: tipo,
                        foto: e.target.result,
                        productos: []
                    };
                    categorias.push(nuevaCategoria);
                    mostrarCategorias();
                    limpiarCampos();
                };
                reader.readAsDataURL(foto);
            } else {
                alert("Por favor completa todos los campos.");
            }
        });

        function mostrarCategorias() {
            const contenedor = document.getElementById('categoriasRegistradas');
            contenedor.innerHTML = '';
            categorias.forEach((categoria, index) => {
                const nuevaCategoriaDiv = document.createElement('div');
                nuevaCategoriaDiv.classList.add('producto-container');
                nuevaCategoriaDiv.classList.add('card', 'p-4', 'shadow');
                nuevaCategoriaDiv.innerHTML = `
                    <h4>
                        <i class="${iconosComida[categoria.tipo]} icono-comida"></i>${categoria.nombre}
                        <button class="btn-edit" onclick="editarCategoria(${index})" data-toggle="modal" data-target="#modalEditarCategoria">Editar</button>
                        <button class="btn-delete" onclick="eliminarCategoria(${index})">Eliminar</button>
                    </h4>
                    <img src="${categoria.foto}" alt="Foto" width="100" height="100">
                    <p>Tipo: ${categoria.tipo}</p>
                    <h5>Variedades de Productos:</h5>
                    <div class="form-group">
                        <input type="text" class="form-control mb-2 nombreProducto" placeholder="Nombre del Producto">
                        <textarea class="form-control mb-2 descripcionProducto" placeholder="Descripción del Producto"></textarea>
                        <input type="number" class="form-control mb-2 precioProducto" placeholder="Precio" min="0">
                        <div class="custom-file mb-2">
                            <input type="file" class="custom-file-input" accept="image/*">
                            <label class="custom-file-label">Elige una imagen del producto</label>
                        </div>
                        <button type="button" class="btn btn-success agregarProducto">Agregar Producto</button>
                        <div class="productosAgregados"></div>
                    </div>
                    <table class="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="productosLista"></tbody>
                    </table>
                `;
                contenedor.appendChild(nuevaCategoriaDiv);
                const productosLista = nuevaCategoriaDiv.querySelector('.productosLista');
                categoria.productos.forEach((producto, pIndex) => {
                    const nuevoProducto = document.createElement('tr');
                    nuevoProducto.innerHTML = `
                        <td>${producto.nombre}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio}</td>
                        <td><img src="${producto.foto}" alt="Foto del Producto" class="img-thumbnail"></td>
                        <td>
                            <button class="btn-edit" onclick="editarProducto(${index}, ${pIndex})" data-toggle="modal" data-target="#modalEditarProducto">Editar</button>
                            <button class="btn-delete" onclick="eliminarProducto(${index}, ${pIndex})">Eliminar</button>
                        </td>
                    `;
                    productosLista.appendChild(nuevoProducto);
                });
            });
        }

        function limpiarCampos() {
            document.getElementById('category').value = '';
            document.getElementById('options').value = '';
            document.getElementById('photo').value = '';
            $('.custom-file-label').html('Elige una imagen');
        }

        function editarCategoria(index) {
            const categoria = categorias[index];
            document.getElementById('editCategory').value = categoria.nombre;
            document.getElementById('editOptions').value = categoria.tipo;
            document.getElementById('editPhoto').value = '';
            $('.custom-file-label').html('Elige una imagen');
            $('#modalEditarCategoria').modal('show');
            document.getElementById('guardarCambiosCategoria').onclick = function () {
                categoria.nombre = document.getElementById('editCategory').value;
                categoria.tipo = document.getElementById('editOptions').value;
                const foto = document.getElementById('editPhoto').files[0];
                if (foto) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        categoria.foto = e.target.result;
                        mostrarCategorias();
                    };
                    reader.readAsDataURL(foto);
                } else {
                    mostrarCategorias();
                }
                $('#modalEditarCategoria').modal('hide');
            };
        }

        function eliminarCategoria(index) {
            categorias.splice(index, 1);
            mostrarCategorias();
        }

        document.getElementById('categoriasRegistradas').addEventListener('click', function (e) {
            if (e.target.classList.contains('agregarProducto')) {
                const productoContainer = e.target.parentElement;
                const nombreProducto = productoContainer.querySelector('.nombreProducto').value;
                const descripcionProducto = productoContainer.querySelector('.descripcionProducto').value;
                const precioProducto = productoContainer.querySelector('.precioProducto').value;
                const fotoProducto = productoContainer.querySelector('input[type="file"]').files[0];
                if (nombreProducto && descripcionProducto && precioProducto && fotoProducto) {
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        const index = Array.from(productoContainer.closest('.producto-container').parentElement.children).indexOf(productoContainer.closest('.producto-container'));
                        const nuevoProducto = {
                            nombre: nombreProducto,
                            descripcion: descripcionProducto,
                            precio: precioProducto,
                            foto: event.target.result
                        };
                        categorias[index].productos.push(nuevoProducto);
                        mostrarCategorias();
                        productoContainer.querySelector('.nombreProducto').value = '';
                        productoContainer.querySelector('.descripcionProducto').value = '';
                        productoContainer.querySelector('.precioProducto').value = '';
                        productoContainer.querySelector('input[type="file"]').value = '';
                        $('.custom-file-label').html('Elige una imagen del producto');
                    };
                    reader.readAsDataURL(fotoProducto);
                } else {
                    alert("Por favor completa todos los campos del producto.");
                }
            }
        });

        function editarProducto(categoriaIndex, productoIndex) {
            const producto = categorias[categoriaIndex].productos[productoIndex];
            document.getElementById('editProductName').value = producto.nombre;
            document.getElementById('editProductDescription').value = producto.descripcion;
            document.getElementById('editProductPrice').value = producto.precio;
            document.getElementById('editProductPhoto').value = '';
            $('.custom-file-label').html('Elige una imagen');
            $('#modalEditarProducto').modal('show');
            document.getElementById('guardarCambiosProducto').onclick = function () {
                producto.nombre = document.getElementById('editProductName').value;
                producto.descripcion = document.getElementById('editProductDescription').value;
                producto.precio = document.getElementById('editProductPrice').value;
                const foto = document.getElementById('editProductPhoto').files[0];
                if (foto) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        producto.foto = e.target.result;
                        mostrarCategorias();
                    };
                    reader.readAsDataURL(foto);
                } else {
                    mostrarCategorias();
                }
                $('#modalEditarProducto').modal('hide');
            };
        }

        function eliminarProducto(categoriaIndex, productoIndex) {
            categorias[categoriaIndex].productos.splice(productoIndex, 1);
            mostrarCategorias();
        }
    </script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>
