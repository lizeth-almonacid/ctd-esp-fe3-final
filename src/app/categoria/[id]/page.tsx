/* eslint-disable @next/next/no-img-element */
"use client";

import HeaderLayout from "../../components/Header";
import { ThemeProvider } from "next-themes";
import FooterLayout from "../../components/Footer";
import { Col, Layout, Row } from "antd";
import { Key, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/app/loading";
import { getProductsList } from "@/app/servers/reques";
import Link from "next/link";

export default function Categoria() {
  const { Content } = Layout;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [title, setTitle] = useState('');
console.log(title);

  const pathname = usePathname();
  const categoryName = pathname.split("/").at(2);

  function formatDate(dateString: any) {
    const options: any = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }
  useEffect(() => {
    if (categoryName) {
      getProductsList(categoryName)
        .then((resp: any) => {
          setData(resp.data.products);
          setLoading(false);
          setTitle(`Games for the category ${categoryName}`);
        })
        .catch((error) => {
          // Manejar errores
          setTitle("No games found for this category");
          console.error("Error fetching products:", error);
          setLoading(false);
        });
    }
  }, [categoryName]);

  if (loading) return <Loading />;
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white">
        <HeaderLayout />
        <Content className="p-8 mt-24">
          <h1 className="text-center text-2xl mb-2">{title}</h1>
          <Row
            gutter={[16, 16]}
            className="md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 "
          >
            {/* @ts-ignore */}
            {data?.map((game: any, index: Key | null | undefined) => (
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
                        {game.release_date && formatDate(game.release_date)}
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
        </Content>

        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
}
