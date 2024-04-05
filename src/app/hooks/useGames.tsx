import { useState, useEffect } from "react";
import { getCards, getGames } from "../services/firebase";
import { getAllProducts } from "../servers/requestProducts";

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [products, setProducts] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Llamada a la API para obtener juegos
        const gamesData = await getGames();
        if (gamesData.success) {
          //@ts-ignore
          setGames(gamesData.games);
        } else {
          console.error("Error al obtener los juegos:", gamesData.error);
        }
        // Llamada a la API para obtener productos y tarjetas
        const [cardsData, productsData] = await Promise.all([
          getCards(),
          getAllProducts()
        ]);
        
        // Manipulación de los datos obtenidos
        const result = productsData?.data || [];
        const gamesBack = result.products;
        const cardsFir: any = cardsData?.card || [];
        setCards(cardsFir);
        setProducts(gamesBack);
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
//  const gameAll = [...games, ...products]
 const gameAll = products
//  console.log(gameAll);
 
  return { gameAll, cards, loading };
};
