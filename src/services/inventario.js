// frontend/src/services/inventario.js
import axios from 'axios';

class InventarioService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '/api/inventario',
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  // --- Categorías ---
  async obtenerCategorias() {
    return this.axiosInstance.get('/categorias/obtenercategorias');
  }

  async crearCategoria(categoria) {
    return this.axiosInstance.post('/categorias/crearcategoria', categoria);
  }

  async actualizarCategoria(id, categoria) {
    return this.axiosInstance.put(`/categorias/actualizar/${id}`, categoria);
  }

  async eliminarCategoria(id) {
    return this.axiosInstance.delete(`/categorias/eliminar/${id}`);
  }

  // --- Productos ---
  async obtenerProductos() {
    return this.axiosInstance.get('/productos/obtenerproductos');
  }

  async crearProducto(producto) {
    return this.axiosInstance.post('/productos/crearproducto', producto);
  }

  async actualizarProducto(id, producto) {
    return this.axiosInstance.put(`/productos/actualizar/${id}`, producto);
  }

  async eliminarProducto(id) {
    return this.axiosInstance.delete(`/productos/eliminar/${id}`);
  }

  // --- Movimientos ---
  async obtenerMovimientos() {
    return this.axiosInstance.get('/movimientos/obtenermovimientos');
  }

  async crearMovimiento(movimiento) {
    return this.axiosInstance.post('/movimientos/crearmovimiento', movimiento);
  }
}

export default new InventarioService();