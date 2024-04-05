/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import FooterLayout from "../../components/Footer";
import { ThemeProvider } from "next-themes";
import { Card, Layout } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getCardDetails } from "@/app/services/firebase";
import { usePathname } from "next/navigation";
import { Game } from "@/app/types/types";
import { useRouter } from "next/navigation";
import HeaderLayout from "@/app/components/Header";

function GameDetails() {
  const { Content } = Layout;
  const router = useRouter();
  
  const [data, setData] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const cardDetailId = pathname.split("/").at(2);

  useEffect(() => {
    if (cardDetailId) {
      getCardDetails(cardDetailId).then((resp) => {
        setData(resp as Game);
        setLoading(false);
      });
    }
  }, [cardDetailId]);

  if (loading) return <Loading />;
  
  function formatDate(dateString: any) {
    const options: any = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white">
        <HeaderLayout/>
        <Content className="p-4 w-full">
          <Card className="w-full mt-20 dark:bg-gray-200">
            <div className="container w-full flex flex-col md:flex-row items-start gap-8 px-4 md:px-6">
              <div className="flex-1">
                <img
                  src={data?.imagen}
                  width="500"
                  height="500"
                  alt={data?.nombre}
                  className="bg-gray-900 w-full aspect-[1/1] object-contain object-center dark:shadow-custom-purple rounded-md"
                />
              </div>
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter">
                  {data?.nombre}
                </h1>
                <p className="text-base text-zinc-500 dark:text-zinc-500">
                  Release Date:{data?.release_date && formatDate(data.release_date)}</p>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 px-4 py-2 w-12 h-12 rounded-md border border-zinc-200 text-zinc-900 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
                    9
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="text-yellow-500"
                    >
                      {star <= data?.valoracion ? (
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      ) : (
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                          fill="none"
                        ></polygon>
                      )}
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex-col w-full">
                <div className="bg-gray-200 p-4 rounded dark:bg-gray-900 dark:min-h-48 dark:shadow-custom-purple space-y-4">
                  <div className="flex items-center space-x-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-yellow-500"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                        fill="yellow"
                      />
                    </svg>
                    <p className="text-base text-zinc-500 dark:text-zinc-400">
                      Excellent rating: 9.81
                    </p>
                  </div>
                  <p className="text-2xl font-semibold text-zinc-900 dark:text-red-500">
                    $ {data?.precio}
                  </p>
                  <div className="flex flex-col items-center space-y-2">
                    <button className="button1 w-full text-white px-4 py-2 rounded" onClick={()=>router.push('/checkout')}>
                      Buy Now
                    </button>
                    <button className="button1 w-full text-white px-4 py-2 rounded">
                      <span className="self-center">
                        <ShoppingCartOutlined className="font-semibold mr-2 text-md" />
                        Add to Cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Content>
        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
}

export default GameDetails;
