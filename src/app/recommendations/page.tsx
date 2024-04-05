/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import HeaderLayout from "../components/Header";
import { Layout, Col, Row, Pagination, Button, message } from "antd";
import { ThemeProvider } from "next-themes";
import Filters from "../components/Filters";
import FooterLayout from "../components/Footer";
import { ModalConfirm } from "../components/ModalConfirm";
import Link from "next/link";
import { useGames } from "../hooks/useGames";
import Loading from "../loading";
import useUser from "../hooks/useUser";
import { deleteProduct } from "../servers/reques";

export default function Recommendations() {
  const { Content } = Layout;

  const [currentPage, setCurrentPage] = useState(1);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [gameToEdit, setGameToEdit] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    price: 50,
    platform: "all",
  });
  const itemsPerPage: number = 12;

  const pageSize = 12;
  const { gameAll, loading } = useGames();
  const startIndex: number = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedGames = gameAll.slice(startIndex, endIndex);
  const { user } = useUser();
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loading />;
  }
  const handleDeleteItem = async () => {
    if (selectedGameId) {
      try {
        await deleteProduct(selectedGameId);
        message.success("Se eliminó correctamente", 3);
        setDeleteModalVisible(false);
      } catch (error) {
        message.error("No se pudo eliminar, inténtelo más tarde", 3);
      }
    }
  };

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white">
        <HeaderLayout />
        <Content className="p-4 mt-8">
          <div className="flex flex-row p-8">
            {/* <div className="flex flex-col items-center">
              <Filters />
            </div> */}
            <div className="">
              <h1 className="text-center font-semibold text-4xl m-4">
                Recommendations games
              </h1>
              <div className="l mt-16">
                <div className="flex justify-center space-x-8 2xl:mr-60 2xl:ml-60">
                  <Row
                    gutter={[16, 16]}
                    className="md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 "
                  >
                    {displayedGames.map((game: any, index) => (
                      <Col
                        className="w-full sm:mx-2 md:mx-2 lg:mx-4 2xl:mx-4 "
                        key={index}
                      >
                        {/* @ts-ignore */}
                        <div className="card-home card2 border border-gray-900 shadow-md rounded-xl dark:bg-gray-900 h-[22rem] sm:w-full w-full">
                          <Link href={`/game-details/${game.id}`}>
                            <img
                              alt={game.nombre ? game.nombre : game.name}
                              src={
                                game?.imagen
                                  ? game?.imagen
                                  : game?.image_url ||
                                    "https://pixel-palace.netlify.app/logo.png"
                              }
                              className="bg-gray-900 w-full h-48 object-cover rounded-t-xl border border-gray-300"
                            />
                            <div className="p-4">
                              <h2 className="text-xl font-semibold mb-2">
                                {game.nombre ? game.nombre : game.name}
                              </h2>
                              <p className="text-gray-100">
                                {game?.categoria
                                  ? game?.categoria
                                      .split(",")
                                      .map((category: any) => category.trim())
                                      .join(", ")
                                  : game?.categories.join(", ")}
                              </p>
                              <p className="text-gray-100">
                                {game.fecha_lanzamiento}
                              </p>
                              <p className="text-red-500 font-semibold mt-2">
                                ${game.precio ? game.precio : game.price}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
              <Pagination
                current={currentPage}
                total={gameAll.length}
                pageSize={pageSize}
                onChange={onChangePage}
                showSizeChanger={false}
                className="text-center mt-8"
              />
              {/* <EditGameModal
        game={gameToEdit}
        visible={editModalVisible}
        onOk={handleUpdateGame}
        onCancel={() => {
          setGameToEdit(null);
          setEditModalVisible(false);
        }}
      /> */}

              <ModalConfirm
                open={isDeleteModalVisible}
                onCancel={() => {
                  setDeleteModalVisible(false);
                  setSelectedGameId(null);
                }}
                onAction={handleDeleteItem}
                nameItem={"confirm"}
                titleConfirm="Confirmar eliminación"
                descriptionConfirm="¿Estás seguro de que deseas eliminar este elemento?"
              />
            </div>
          </div>
        </Content>
        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
}
