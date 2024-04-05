
// URL base de la API
const BASE_URL = 'http://localhost:8082/api/v1';
// Función para guardar una transacción
export const saveTransaction = async (transactionData: any) => {
  try {
      const url = `${BASE_URL}/transaction/save`;
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Error al guardar la transacción');
      }

      const responseData = await response.json();
      return { data: responseData, response };
  } catch (error) {
      console.error('Error saving transaction:', error);
      throw error;
  }
};


// Función para manejar las respuestas de la API
const handleResponse = async (response: Response): Promise<any> => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error en la solicitud');
    }
    return response.json();
};
export const fetchData = async (url: string, method: string = 'GET', data?: any) => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
    };

    try {
        const response = await fetch(url, options);
        const responseData = await handleResponse(response);
        return { data: responseData, response };
    } catch (error) {
        console.error(`Error ${method} request to ${url}:`, error);
        throw error;
    }
};



  // Función para crear un nuevo producto
export const createProduct = async (newProductDTO: any) => {
    try {
        const url = `${BASE_URL}/product/game/new`;
        return fetchData(url, 'POST', newProductDTO);
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

  // Función para obtener la lista de productos
export const getProductsList = async (category: any) => {
    try {
      const url = `${BASE_URL}/product/games${category ? `?category=${category}` : ''}`;
      return fetchData(url);
    } catch (error) {
      console.error('Error fetching products list:', error);
      throw error;
    }
  };
  
  // Función para obtener un producto por ID
export const getProductById = async (id: any) => {
    try {
      const url = `${BASE_URL}/product/game/${id}`;
      return fetchData(url);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  };
  
  // Función para obtener productos por nombre
export const getProductByName = async (name: any) => {
    try {
      const url = `${BASE_URL}/product/games/${name}`;
      return fetchData(url);
    } catch (error) {
      console.error('Error fetching product by name:', error);
      throw error;
    }
  };
  
  // Función para actualizar un producto
export const updateProduct = async (productDTO: any) => {
    try {
      const url = `${BASE_URL}/product/game/update`;
      return fetchData(url, 'PUT', productDTO);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };
  
  // Función para eliminar un producto
export const deleteProduct = async (id: any) => {
    try {
      const url = `${BASE_URL}/product/game/delete/${id}`;
      return fetchData(url, 'DELETE');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };
  
  // Función para obtener productos por puntaje
export const getProductByScore = async (score: any) => {
    try {
      const url = `${BASE_URL}/product/games/score/${score}`;
      return fetchData(url);
    } catch (error) {
      console.error('Error fetching products by score:', error);
      throw error;
    }
  };
  // localhost:8082/api/v1/genre/list
// Función para obtener todas las categorías
export const getCategorias = async () => {
  try {
      const url = `${BASE_URL}/category/all`; 
      return fetchData(url, 'GET');
  } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
  }
};

// localhost:8082/api/v1/platform/list
// Función para obtener todas las plataformas
export const getPlatforms = async () => {
  try {
      const url = `${BASE_URL}/platform/all`; 
      return fetchData(url, 'GET');
  } catch (error) {
      console.error('Error fetching platforms:', error);
      throw error;
  }
};
