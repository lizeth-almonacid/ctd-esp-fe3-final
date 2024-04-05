/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Col, Row, Pagination } from "antd";
import Link from "next/link";
import { useGames } from "@/app/hooks/useGames";
import Loading from "@/app/loading";

const GameList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "all",
    price: 50,
    platform: "all",
  });

  const pageSize = 12;
  const { gameAll, loading } = useGames();
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedGames = gameAll.slice(startIndex, endIndex);

  function formatDate(dateString: any) {
    const options: any = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loading />;
  }

  return (
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
                    <p className="text-gray-100">{game.release_date && formatDate(game.release_date)}</p>
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
    </div>
  );
};

export default GameList;
