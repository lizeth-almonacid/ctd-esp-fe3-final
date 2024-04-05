// URL base de la API
const BASE_URL = 'http://localhost:8082/api/v1';
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
export const getReportForRating = async (
    startMonthYear: string,
    endMonthYear: string,
    categories: string,
    platforms: string
) => {
    try {
        const url = `${BASE_URL}/reports/top-rated-products?startMonthYear=${startMonthYear}&endMonthYear=${endMonthYear}&categories=${categories}&platforms=${platforms}`;
        const response = await fetchData(url, 'GET');
        return response.data;
    } catch (error) {
        console.error('Error fetching top-rated products report:', error);
        throw error;
    }
};
// Función para obtener todos los productos
export const getAllProducts = async () => {
    try {
        const url = `${BASE_URL}/product/games`;
        return fetchData(url, 'GET');
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};

export const createTransaction = async (newTransactionDTO: any) => {
    try {
        const url = `${BASE_URL}/transaction/create`;
        return fetchData(url, 'POST', newTransactionDTO);
    } catch (error) {
        console.error('Error fetching all transaction:', error);
        throw error;
    }
};
export const getTransactionById = async (id: any) => {
    try {
        const url = `${BASE_URL}/transaction/${id}`;
        console.log(url);
        
        return fetchData(url, 'GET');
    } catch (error) {
        console.error(`Error fetching transaction with ID ${id}:`, error);
        throw error;
    }
};
export const getTransactionAll = async () => {
    try {
        const url = `${BASE_URL}/transaction/ListTransaction`;
        console.log(url);
        
        return fetchData(url, 'GET');
    } catch (error) {
        console.error(`Error fetching transaction:`, error);
        throw error;
    }
};
export const getTransactiontByUserId = async (id: any) => {
    try {
        const url = `${BASE_URL}/transaction/user/${id}`;
        console.log(url);
        
        return fetchData(url, 'GET');
    } catch (error) {
        console.error(`Error fetching transaction:`, error);
        throw error;
    }
};

export const getTopSoldProducts = async (
    startMonthYear: string,
    endMonthYear: string,
    categories: string,
    platforms: string
) => {
    try {
      const url = `${BASE_URL}/reports/top-sold-products?startMonthYear=${startMonthYear}&endMonthYear=${endMonthYear}&categories=${categories}&platforms=${platforms}`;
      const response = await fetchData(url, 'GET');
      return response.data;
    } catch (error) {
      console.error('Error fetching top sold products:', error);
      throw error;
    }
  };