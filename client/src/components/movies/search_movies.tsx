import { useSearchMovieQuery } from '@/store/movies/movies_api';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchMovies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: searchData, error, isLoading } = useSearchMovieQuery({ title: searchTerm as string });

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            setSearchTerm(searchTerm.trim());
            console.log('search found@@@@@@@ next after', searchData);
        }
    };

    return (
        <>
            <div className="relative flex items-center bg-gray-200 text-black p-2 rounded-full w-96">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Movies..."
                    className="bg-transparent border-none outline-none w-full"
                />
                <div className="text-gray-500 mr-4" onClick={handleSearch}>
                    <button className="">
                        <FaSearch />
                    </button>
                </div>
                {searchTerm.trim() !== '' && searchData && searchData.searchResult.length > 0 && (
                    <div className='absolute top-14 w-48 bg-gray-700 bg-opacity-45 text-white text-center backdrop-blur-md backdrop-filter flex flex-col gap-2'>
                        {searchData.searchResult.map((movie: any) => (
                            <Link href={`/movies/${movie._id}`} key={movie._id}>
                                <h3 key={movie._id}>{movie.title}</h3>
                            </Link>
                        ))}
                    </div>
                )}
                {searchTerm.trim() !== '' && searchData && searchData.searchResult.length === 0 && (
                    <div className='absolute top-20 bg-white p-2'>
                        No movies found with the provided title
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchMovies;
