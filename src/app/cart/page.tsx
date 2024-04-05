/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Card, Layout, List } from "antd";
import { ThemeProvider } from "next-themes";
import FooterLayout from "../components/Footer";
import HeaderLayout from "../components/Header";
import { useCart } from "@/context/CarContext";
import Link from "next/link";

const Cart = () => {
  //@ts-ignore
  const { state, removeFromCart, updateQuantity } = useCart();

  const handleUpdateQuantity = (game: any, quantity: number) => {
    const newCart = [...state.cart];
    const updatedGame = newCart.find((item) => item.id === game?.id);

    if (updatedGame) {
      updatedGame.quantity = quantity;
      //@ts-ignore
      updateQuantity(updatedGame, quantity); 
    }
  };

  const handleRemoveFromCart = (game: any) => {
    removeFromCart(game);
  };
  

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white">
        <HeaderLayout />
        <Layout.Content className="p-4 w-full mt-24">
          <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            {state.cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <List
                  grid={{ gutter: 8, column: 2 }}
                  dataSource={state.cart}
                  renderItem={(item) => (
                    <List.Item>
                      <Card
                        title={
                          (item && (item.name || item.nombre)) || "No Name"
                        }
                        className="w-60 h-70"
                      >
                        <img
                          width={200}
                          height={200}
                          src={
                            (item && (item.imagen || item.image_url)) || ""
                          }
                          alt={
                            (item &&
                              (item.name || item.nombre || "No Name")) || ""
                          }
                        />
                        <p className="text-red">Quantity: {item.quantity}</p>
                        <button
                          className="button2"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          Remove from Cart
                        </button>
                        {/* <div className="flex items-center space-x-2 mt-2 ">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div> */}

                        {/* Debugging Information */}
                        {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                      </Card>
                    </List.Item>
                  )}
                />
                <div className="mt-8">
                  <Link href="/checkout">
                    <button className="button1">Buy Now</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </Layout.Content>
        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
};

export default Cart;
