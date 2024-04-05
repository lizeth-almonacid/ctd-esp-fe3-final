import React, { useState } from "react";
import { Card } from "antd";
import usePlatformAndCategories from "@/app/hooks/usePlatformAndCategories";

const CategoriasPage = () => {
  const { categorias } = usePlatformAndCategories();
  const length = categorias.length;
  const [numCategorias, setNumCategorias] = useState(5);
  const mostrarTodas = numCategorias === length;

  const handleVerMasClick = () => {
    if (mostrarTodas) {
      setNumCategorias(5);
    } else {
      setNumCategorias(length);
    }
  };
  const categories = categorias.slice(0, numCategorias);
  return (
    <Card className="dark:bg-gray-400 text-white my-2">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold mb-6">Categories</h1>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {categories.map((category) => (
            <div
            //@ts-ignore
              key={category.id}
              className="card-home card2 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md max-w-xs w-48"
            >
              <a
              //@ts-ignore
                href={`/categoria/${category.name}`}
                className="text-white font-semibold flex flex-col justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  //@ts-ignore
                  viewBox={category.view_box}
                >
                  {/* @ts-ignore */}
                  <path fill="currentColor" d={category.icon} />
                </svg>
                {/* @ts-ignore */}
                {category.name}
              </a>
            </div>
          ))}
        </div>
        <button
          onClick={handleVerMasClick}
          className="mt-6 button3 w-96 md:text-2xl"
        >
          {mostrarTodas ? "See less" : "See more"}
        </button>
      </div>
    </Card>
  );
};

export default CategoriasPage;
