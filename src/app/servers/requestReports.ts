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

  // Función para obtener los productos más vendidos semanalmente
export const getTopSoldProductsWeekly = async () => {
    try {
        const url = `${BASE_URL}/reports/top-sold-weekly`;
        return await fetchData(url);
    } catch (error) {
        console.error('Error al obtener los productos más vendidos semanalmente:', error);
        throw error;
    }
};

// Función para obtener los productos más vendidos mensualmente
export const getTopSoldProductsMonthly = async () => {
    try {
        const url = `${BASE_URL}/reports/top-sold-monthly`;
        return await fetchData(url);
    } catch (error) {
        console.error('Error al obtener los productos más vendidos mensualmente:', error);
        throw error;
    }
};

// Función para obtener los productos más vendidos anualmente
export const getTopSoldProductsYearly = async () => {
    try {
        const url = `${BASE_URL}/reports/top-sold-yearly`;
        return await fetchData(url);
    } catch (error) {
        console.error('Error al obtener los productos más vendidos anualmente:', error);
        throw error;
    }
};
