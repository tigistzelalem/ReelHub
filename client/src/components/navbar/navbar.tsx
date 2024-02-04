import { useSearchMovieQuery } from '@/store/movies/movies_api';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchMovies from '../movies/search_movies';

const NavebarPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: searchData, error, isLoading } = useSearchMovieQuery({ title: searchTerm as string });
    

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            setSearchTerm(searchTerm.trim());
            console.log('search found@@@@@@@ next after', searchData);

        }
    }

    return (
        <nav className="bg-black p-8 flex justify-center items-center">
            <div className="flex items-center space-x-4">
                <a href="/" className="text-white text-lg font-bold">
                    Home
                </a>
                <a href="/movies/topRatedMovies" className="text-white text-lg">
                    Gener
                </a>
                <a href="/series" className="text-white text-lg">
                    Country
                </a>
            </div>
            <div className="flex items-center px-6">
               <SearchMovies />
            </div>
            <div className="flex items-center space-x-4">
                <a href="/movies" className="text-white text-lg">
                    Movies
                </a>
                <a href="/series" className="text-white text-lg">
                    Series
                </a>
                <a href="/" className="text-white text-lg font-bold">
                    Animation
                </a>
                <Link href="/" className="text-white text-lg font-bold">
                    Login
                </Link>
                <Link href="/" className="text-white text-lg font-bold">
                    Signup
                </Link>
            </div>
        </nav>
    );
};

export default NavebarPage;
