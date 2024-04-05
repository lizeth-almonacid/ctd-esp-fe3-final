/* eslint-disable @next/next/no-img-element */
"use client";

import { Layout } from "antd";
import { ThemeProvider } from "next-themes";
import HeaderLayout from "../components/Header";
import { Content } from "antd/es/layout/layout";
import FooterLayout from "../components/Footer";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getTransactiontByUserId } from "../servers/requestProducts";
interface Purchase {
  id: number;
  itemName: string;
  price: number;
  quantity: number;
  image: string;
}

const PurchasesPage: React.FC = () => {
  const { data: session } = useSession();
  const [game, setGames] = useState();
  console.log(game);
  useEffect(() => {
    const fetchData = async () => {
      // @ts-ignore
      if (session && session.user && session.user.userId) {
        try {
          // @ts-ignore
          const response = await getTransactiontByUserId(session.user.userId);
          console.log(response);

          setGames(response.data);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      } else {
        console.warn("No hay usuario logueado. No se realizará la consulta.");
      }
    };

    fetchData();
  }, [session]);

  // @ts-ignore
  const purchases: any[] = game?.transaction?.map((transaction: any) => {
    console.log(transaction);
    const product = transaction.products[0];
    return {
      id: transaction.id,
      itemName: transaction.products[0],
      price: product.price,
      quantity: transaction.products.length,
      image: product.image_url
        ? product.image_url[0]
        : "https://pixel-palace.netlify.app/logo.png",
      platforms: transaction.platforms.join(", "),
    };
  });

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white">
        <HeaderLayout />
        <Content className="p-4 w-full mt-20">
          <div>
            <h1 className="text-2xl font-bold mb-4">My Purchases</h1>
            <table className="rounded-md w-full dark:bg-gray-900">
              <thead>
                <tr>
                  <th className="py-2 px-4">Item</th>
                  <th className="py-2 px-4">Platform</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {purchases?.map((purchase: any) => (
                  <tr key={purchase.id}>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        {Array.isArray(purchase.itemName) ? (
                          purchase.itemName.map((game: any) => (
                            <div className="flex items-center" key={game.id}>
                              <img
                                src={
                                  purchase.image
                                    ? purchase.image
                                    : "https://pixel-palace.netlify.app/logo.png"
                                }
                                alt={game.name}
                                className="w-8 h-8 mr-2"
                              />
                              {game.name}
                            </div>
                          ))
                        ) : (
                          <div
                            className="flex items-center"
                            key={purchase.itemName.id}
                          >
                            <img
                              src={
                                purchase.image
                                  ? purchase.image
                                  : "https://pixel-palace.netlify.app/logo.png"
                              }
                              alt={purchase.itemName.name}
                              className="w-8 h-8 mr-2"
                            />
                            {purchase.itemName.name}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4 text-center">
                      {purchase.platforms}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {purchase.quantity}
                    </td>
                    <td className="py-2 px-4 text-center">
                      $
                      {(Array.isArray(purchase.itemName)
                        ? purchase.itemName.reduce(
                            (total: number, game: any) => total + game.price,
                            0
                          )
                        : purchase.itemName.price) *
                        purchase.quantity.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Content>
        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
};

export default PurchasesPage;
