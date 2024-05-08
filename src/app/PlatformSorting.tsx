"use client"

import React from 'react';

// Define the Game interface
interface Game {
    title: string;
    platform: string;
    score: number;
    genre: string;
    editors_choice: boolean;
}

interface Props {
    games: Game[];
    onSort: (sortedGames: Game[]) => void;
    onReset: () => void;


}

const PlatformSorterting: React.FC<Props> = ({ games, onSort, onReset }) => {

    const handleSort = () => {
        const sortedGames = [...games].sort((a, b) => {

            if (a && b && a.platform && b.platform) {
                // Sort alphabetically on platform
                return a.platform.localeCompare(b.platform);
            }

            return 0;
        });
        onSort(sortedGames);
    };


    return (
        <>

            <div className="flex justify-center m-5">
                <div><button className='m-2' onClick={handleSort}>Sort</button></div>
                <div><button className='m-2' onClick={onReset}>Reset</button></div>
            </div>


        </>

    );
};

export default PlatformSorterting;
