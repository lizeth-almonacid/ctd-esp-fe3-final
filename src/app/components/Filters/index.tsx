import React, { useEffect, useState } from "react";

const Filters: React.FC = () => {
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(50);
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value, 10));
  };

  //   getGames()
  //     .then((result: any) => {
  //       if (result.success) {
  //         setGames(result.games);
  //         // Obtener una lista de todas las categorías de los juegos
  //         const allCategories: any = result.games.map((game: { categoria: any; }) => game.categoria).flat();
  //         const uniqueCategories: any = [...new Set(allCategories)];
  //         setCategories(uniqueCategories);

  //         const allPlatforms: any = result.games.map((game: { desarrollador: any; }) => game.desarrollador).flat();
  //         const uniquePlatforms: any = [...new Set(allPlatforms)];
  //         setPlatforms(uniquePlatforms);
  //       } else {
  //         console.error("Error al obtener los juegos:", result.error);
  //       }
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener los juegos:", error);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <div className="p-4 w-48">
      <h2 className="text-2xl font-semibold mb-4">Filters</h2>
      <form className="mb-4">
        <div className="mb-4">
          <label className="block text-sm font-bold text-white">
          Product name
          </label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-indigo-300 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-white">Price</label>
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-indigo-300 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-white">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-indigo-300 focus:outline-none"
          >
            <option value="all">All</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-white">Platform</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-indigo-300 focus:outline-none"
          >
            <option value="all">All</option>
            {platforms.map((platform, index) => (
              <option key={index} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filters;
