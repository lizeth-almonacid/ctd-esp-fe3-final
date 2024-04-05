/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import HeaderLayout from "../components/Header";
import { Layout, Col, Row, Button, Pagination, message } from "antd";
import { ThemeProvider } from "next-themes";
import Filters from "../components/Filters";
import Tarjetas from "../../../gift-cards.json";
import { deleteCard, getCards } from "../services/firebase";
import FooterLayout from "../components/Footer";
import Link from "next/link";
import Loading from "../loading";
import { ModalConfirm } from "../components/ModalConfirm";
import useUser from "../hooks/useUser";

interface FilterProps {
  id: number;
  codigo: string;
  valor: number;
  moneda: string;
  fecha_expiracion: string;
  estado: string;
  image: string;
  juego_relacionado: string;
}

export default function GiftCards() {
  const { Content, Footer } = Layout;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 12;

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = currentPage * itemsPerPage;

  const cardsPaginados: FilterProps[] = Tarjetas.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const handleDeleteItem = async () => {
    if (selectedGameId) {
      try {
        await deleteCard(selectedGameId);
        message.success("Deleted successfully", 3);
        setDeleteModalVisible(false);
      } catch (error) {
        message.error("Could not delete, please try later", 3);
      }
    }
  };
  const { user } = useUser();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [gameToEdit, setGameToEdit] = useState(null);
  const handleFilterChange = (filters: FilterProps) => {};
  useEffect(() => {
    getCards()
      .then((result: any) => {
        if (result.success) {
          setCards(result.card);
        } else {
          console.error("Error al obtener los juegos:", result.error);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los juegos:", error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Loading />;
  }
  console.log(user);
  
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ModalConfirm
        open={isDeleteModalVisible}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedGameId(null);
        }}
        onAction={handleDeleteItem}
        nameItem={"confirm"}
        titleConfirm="Confirm deletion"
        descriptionConfirm="Are you sure you want to delete this item?"
      />
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white">
        <HeaderLayout />
        <Content className="p-4 mt-8">
          <div className="flex flex-col p-8">
            {/* <div className="flex flex-col items-center">
              <Filters />
            </div> */}
            <div className="px-12">
              <h1 className="text-2xl font-bold m-4 text-center">Gift cards</h1>
              <div className="flex flex-col justify-center items-center">
                <Row
                  gutter={[16, 16]}
                  className="md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4"
                >
                  {cards.map((card: any, index) => (
                    <Col key={index} className="mb-4">
                      {/* @ts-ignore */}
                      {user && user.rol === "ADMIN" ? (
                        <div className=" border border-gray-900 shadow-md rounded-xl dark:bg-gray-900 h-[26rem] sm:w-full w-full">
                          <div className="card-home card2">
                            <Link href={`/cards-details/${card.id}`}>
                              <img
                                alt={card.nombre ? card.nombre : card.name}
                                src={
                                  card?.imagen
                                    ? card?.imagen
                                    : card?.image_url ||
                                      "https://pixel-palace.netlify.app/logo.png"
                                }
                                className="bg-gray-900 w-full h-48 object-cover rounded-t-xl border border-gray-300"
                              />
                              <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">
                                  {card.nombre ? card.nombre : card.name}
                                </h2>
                                <p className="text-gray-100">
                                  {card.categoria
                                    ? card.categoria
                                    : card.categories}
                                </p>
                                <p className="text-gray-100">
                                  {card.fecha_lanzamiento}
                                </p>
                                <p className="text-red-500 font-semibold mt-2">
                                  ${card.precio ? card.precio : card.price}
                                </p>
                              </div>
                            </Link>
                          </div>

                          <div className="flex space-x-4 mt-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="2em"
                              height="2em"
                              viewBox="0 0 26 26"
                              className="ml-4 cursor-pointer text-custom_red"
                              onClick={() => {
                                setSelectedGameId(card.id);
                                setDeleteModalVisible(true);
                              }}
                            >
                              <path
                                fill="currentColor"
                                d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593h-3zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1V8zm2 2v12h2V10H8zm4 0v12h2V10h-2zm4 0v12h2V10h-2z"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="2em"
                              height="2em"
                              viewBox="0 0 24 24"
                              className="ml-4 cursor-pointer"
                              onClick={() => {
                                setGameToEdit(card.id);
                                setEditModalVisible(true);
                              }}
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              >
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1l1-4l9.5-9.5z" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div className="card-home card2 border border-gray-900 shadow-md rounded-xl dark:bg-gray-900 h-[22rem] sm:w-full w-full">
                          <Link href={`/cards-details/${card.id}`}>
                            <img
                              alt={card.nombre ? card.nombre : card.name}
                              src={
                                card?.imagen
                                  ? card?.imagen
                                  : card?.image_url ||
                                    "https://pixel-palace.netlify.app/logo.png"
                              }
                              className="bg-gray-900 w-full h-48 object-cover rounded-t-xl border border-gray-300"
                            />
                            <div className="p-4">
                              <h2 className="text-xl font-semibold mb-2">
                                {card.nombre ? card.nombre : card.name}
                              </h2>
                              <p className="text-gray-100">
                                {card.categoria
                                  ? card.categoria
                                  : card.categories}
                              </p>
                              <p className="text-gray-100">
                                {card.fecha_lanzamiento}
                              </p>
                              <p className="text-red-500 font-semibold mt-2">
                                ${card.precio ? card.precio : card.price}
                              </p>
                            </div>
                          </Link>
                        </div>
                      )}
                    </Col>
                  ))}
                </Row>
                <Pagination
                  current={currentPage}
                  total={Tarjetas.length}
                  pageSize={itemsPerPage}
                  onChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </Content>
        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
}
