"use client";
import React, { useState } from "react";
import HeaderLayout from "../components/Header";
import { Layout } from "antd";
import { ThemeProvider } from "next-themes";
import Filters from "../components/Filters";
import FooterLayout from "../components/Footer";
import GameList from "../components/GameList";

interface FilterProps {
  id: number;
  nombre: string;
  categoria: string[];
  desarrollador: string;
  fecha_lanzamiento: string;
  precio: number;
  imagen: string;
}

export default function BestGames() {
  const { Content, Footer } = Layout;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 12;
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = currentPage * itemsPerPage;
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white">
        <HeaderLayout />
        <Content className="p-4 mt-8">
          <div className="flex flex-col p-8">
            {/* <div className="flex flex-col items-center">
              <Filters />
            </div> */}
            {/* <div className=""> */}
              <h1 className="text-center font-semibold text-4xl mt-4">
                The best games
              </h1>
              <GameList />
            </div>
          {/* </div> */}
        </Content>
        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
}
