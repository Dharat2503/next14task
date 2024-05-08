

// "use client"


// import React, { useEffect, useState } from 'react';
// import { fetchGames } from '../services/gameApi';
// import SearchBar from '../app/SearchBar';
// import PlatformSorterting from '../app/PlatformSorting';

// interface Game {
//   title: string;
//   platform: string;
//   score: number;
//   genre: string;
//   editors_choice: boolean;
// }

// const Home: React.FC = () => {
//   const [games, setGames] = useState<Game[]>([]);
//   const [filteredGames, setFilteredGames] = useState<Game[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const gamesData = await fetchGames();
//       if (gamesData) {
//         setGames(gamesData);
//         setFilteredGames(gamesData);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSearch = (query: string) => {
//     const filtered = games.filter(game =>
//       game && game.title && game.title.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredGames(filtered);
//   };

//   const handleSort = (sortedGames: Game[]) => {
//     setFilteredGames(sortedGames);
//   };

//   const handleReset = () => {
//     setFilteredGames(games); // original list
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
//       <div>
//         <h1 className="flex justify-center mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Games</h1>
//         <SearchBar onSearch={handleSearch} />
//         <PlatformSorterting games={filteredGames} onSort={handleSort} onReset={handleReset} />
//         <div className="overflow-x-auto">
//           <table className="table-auto border-collapse border border-gray-400 sm:p-8 sm:text-2xl mt-4">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">Title</th>
//                 <th className="px-4 py-2">Platform</th>
//                 <th className="px-4 py-2">Score</th>
//                 <th className="px-4 py-2">Genre</th>
//                 <th className="px-4 py-2">Editors Choice</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredGames.map((game, index) => (
//                 <tr key={index} className={index % 3 === 0 ? 'bg-gray-200' : ''}>
//                   <td className="border px-4 py-2">{game.title}</td>
//                   <td className="border px-4 py-2">{game.platform}</td>
//                   <td className="border px-4 py-2">{game.score}</td>
//                   <td className="border px-4 py-2">{game.genre}</td>
//                   <td className="border px-4 py-2">{game.editors_choice ? 'Yes' : 'No'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Home; // without  server-side 





"use client"
import React, { useEffect, useState } from 'react';
import { getServerSideProps } from '../services/gameApi';
import SearchBar from '../app/SearchBar';
import PlatformSorterting from '../app/PlatformSorting';

interface Game {
  title: string;
  platform: string;
  score: number;
  genre: string;
  editors_choice: boolean;
}

const Home: React.FC = ({}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);




  useEffect(() => {
    const fetchData  = async () => {
      try {
        const gamesData = await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json", {
          headers: {
            "Cache-Control": "no-store"
          }
        });
        if (gamesData.ok) {
          const data = await gamesData.json();
          setGames(data);
          setFilteredGames(data);
        } else {
          throw new Error('Failed to fetch games');
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchData();
  }, []);



  const handleSearch = (query: string) => {
    const filtered = games.filter(game =>
      game && game.title && game.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  const handleSort = (sortedGames: Game[]) => {
    setFilteredGames(sortedGames);
  };

  const handleReset = () => {
    setFilteredGames(games); // original list
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
      <div>
        <h1 className="flex justify-center mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Games</h1>
        <SearchBar onSearch={handleSearch} />
        <PlatformSorterting games={filteredGames} onSort={handleSort} onReset={handleReset} />
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-400 sm:p-8 sm:text-2xl mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Platform</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Genre</th>
                <th className="px-4 py-2">Editors Choice</th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.map((game, index) => (
                <tr key={index} className={index % 3 === 0 ? 'bg-gray-200' : ''}>
                  <td className="border px-4 py-2">{game.title}</td>
                  <td className="border px-4 py-2">{game.platform}</td>
                  <td className="border px-4 py-2">{game.score}</td>
                  <td className="border px-4 py-2">{game.genre}</td>
                  <td className="border px-4 py-2">{game.editors_choice ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Home; // with server-side and useEffect



// "use client"
// import React, { useState, useEffect } from "react";
// const Home = () => {
//   const [games, setGames] = useState<any[]>([]);
//   const [searchItem, setSearchItem] = useState<string>("");
//   const [sortedByPlatform, setSortedByPlatform] = useState<boolean>(
//     false
//   );
  // useEffect(() => {
  //   const fetchGames = async () => {
  //     try {
  //       const response = await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json", {
  //         headers: {
  //           "Cache-Control": "no-store"
  //         }
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setGames(data);
  //       } else {
  //         throw new Error('Failed to fetch games');
  //       }
  //     } catch (error) {
  //       console.error("Error fetching games:", error);
  //     }
  //   };
  //   fetchGames();
  // }, []);


//   const handleSearchChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSearchItem(event.target.value);
//   };
//   const handleSortByPlatform = () => {
//     const sortedGames = [...games].sort((a, b) => {
//       if (!a.platform || !b.platform) return 0;
//       if (sortedByPlatform) {
//         return b.platform.localeCompare(a.platform);
//       } else {
//         return a.platform.localeCompare(b.platform);
//       }
//     });
//     setGames(sortedGames);
//     setSortedByPlatform(!sortedByPlatform);
//   };
//   const filteredGames = games.filter(
//     (game) =>
//       game &&
//       game.title &&
//       game.title.toLowerCase().includes(searchItem.toLowerCase())
//   );
//   return (
//     <div className="p-8">
//       <h2 className="text-3xl text-center text-lime-400 mb-4">Games Arena</h2>
//       <input
//         type="text"
//         placeholder="Search by title"
//         value={searchItem}
//         onChange={handleSearchChange}
//         className="w-full h-12 border-2 border-lime-300 rounded mb-4 px-4 bg-transparent text-white"
//       />
//       <button
//         onClick={handleSortByPlatform}
//         className="px-4 py-2 bg-lime-300 text-black rounded mb-4"
//       >
//         Sort by Platform {sortedByPlatform ? "(Z-A)" : "(A-Z)"}
//       </button>
//       <table className="w-full border-2 border-lime-300">
//         <thead>
//           <tr>
//             <th className="border border-lime-300 p-4 text-lg"><u>Title</u></th>
//             <th className="border border-lime-300 p-4 text-lg"><u>Platform</u></th>
//             <th className="border border-lime-300 p-4 text-lg"><u>Score</u></th>
//             <th className="border border-lime-300 p-4 text-lg"><u>Genre</u></th>
//             <th className="border border-lime-300 p-4 text-lg"><u>Editors Choice</u></th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredGames.map((game, index) => (
//             <tr key={index}>
//               <td className="border border-lime-300 p-4">{game.title}</td>
//               <td className="border border-lime-300 p-4">{game.platform}</td>
//               <td className="border border-lime-300 p-4">{game.score}</td>
//               <td className="border border-lime-300 p-4">{game.genre}</td>
//               <td className="border border-lime-300 p-4">{game.editors_choice === "Y" ? "Yes" : "No"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default Home;