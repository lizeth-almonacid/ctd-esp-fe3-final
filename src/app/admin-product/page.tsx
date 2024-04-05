/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import CreateGame from "../components/CreateGame";
import { useGames } from "../hooks/useGames";
import Loading from "../loading";
import { Layout, message } from "antd";
import { ModalConfirm } from "../components/ModalConfirm";
import { ThemeProvider } from "next-themes";
import HeaderLayout from "../components/Header";
import { Content } from "antd/es/layout/layout";
import FooterLayout from "../components/Footer";
import { Pagination } from "antd";
import { deleteProduct, updateProduct } from "../servers/reques";
import EditGameModal from "../components/EditGameModal";

const AdminProducts = () => {
  const { gameAll, cards, loading } = useGames();
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [gameToEdit, setGameToEdit] = useState(null);
  const [gameAllFilter, setGameAllFilter] = useState()
  const itemsPerPage = 10;

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleDeleteItem = async () => {
    if (selectedGameId) {
      try {
        await deleteProduct(selectedGameId);
        message.success("Deleted successfully", 3);
        setDeleteModalVisible(false);
      } catch (error) {
        message.error("Could not delete, please try later", 3);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white">
        <HeaderLayout />
        <Content className="p-4 w-full mt-20">
          <div className="flex flex-col justify-center items-center mt-12">
            <div className="w-48">
              <CreateGame />
            </div>
            <table className="rounded-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mt-4 dark:bg-gray-900">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Product Name</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {gameAll
                  .slice(startIndex, endIndex)
                  .map((product: any, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4">
                        {product.name ? product.name : product.nombre}
                      </td>
                      <td className="py-2 px-4 ">
                        <div className="flex justify-center space-x-4 mt-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="2em"
                            viewBox="0 0 26 26"
                            className="ml-4 cursor-pointer text-custom_red"
                            onClick={() => {
                              setSelectedGameId(product.id);
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
                              setGameToEdit(product.id);
                              setGameAllFilter(product)
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
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              current={currentPage}
              total={gameAll.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
              className="mt-4"
            />
            <EditGameModal
              visible={editModalVisible}
              onCancel={() => setEditModalVisible(false)}
              // onEdit={() => updateProduct()}
              game={gameAllFilter}
              gameId={gameToEdit}
            />
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
          </div>
        </Content>
        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
};

export default AdminProducts;
