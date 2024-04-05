/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import juegos from "@/app/services/juegos.json";
import HeaderLayout from "../Header";
import { ThemeProvider } from "next-themes";
import Carousel from "../Carrusel";
import CategoriasPage from "../Categories/index";
import FooterLayout from "../Footer";
import { useGames } from "@/app/hooks/useGames";
import Loading from "@/app/loading";
import GiftCardsSection from "./GiftCardsSection";
import BestGamesSection from "./BestGameSection";
import RecommendationsSection from "./RecommendationsSection";
import { getCards } from "@/app/services/firebase";

const { Content } = Layout;

const GameContainer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const gamesToShow = juegos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const { gameAll, loading } = useGames();
  const [cards, setCards] = useState([])
  useEffect(() => {
    getCards()
      .then((result: any) => {
        if (result.success) {
          setCards(result.card);
        } else {
          console.error("Error al obtener los juegos:", result.error);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los juegos:", error);
      });
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       // Llamada a la API para obtener productos y tarjetas
  //       const [productsData, cardsData] = await Promise.all([
  //         getAllProducts(),
  //         getCards(),
  //       ]);

  //       // Manipulación de los datos obtenidos
  //       const result = productsData?.data || [];
  //       const gamesBack = result.products;
  //       const cardsFir: any = cardsData?.card || [];
  //       setCards(cardsFir);
  //       const gamesFir = [...games];
  //       const AllGames: any = [...gamesBack, ...gamesFir];
  //       // console.log(AllGames, 'AllGames');
  //       setProducts(AllGames);
  //     } catch (error: any) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [games]);

  if (loading) {
    return <Loading />;
  }
  
  const juegosPopulares = gameAll.filter((game) => game).slice(0, 4);
  const recomendaciones = gameAll.filter((game) => game).slice(0, 4);
  const tarjetasDeRegalo = cards.filter((game) => game).slice(0, 4);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white">
        <HeaderLayout />
        <Content className="p-4">
          <Carousel />
          <GiftCardsSection tarjetasDeRegalo={tarjetasDeRegalo} />
          <BestGamesSection juegosPopulares={juegosPopulares} />
          <RecommendationsSection recomendaciones={recomendaciones} />
          <CategoriasPage />
        </Content>
        {/* <Pagination
          current={currentPage}
          total={juegos.length}
          pageSize={pageSize}
          onChange={onChangePage}
          showSizeChanger={false}
          className="text-center"
        /> */}
        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
};

export default GameContainer;
