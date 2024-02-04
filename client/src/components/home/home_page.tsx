import React, { useEffect, useState } from 'react';
import { FaEye, FaCalendar, FaStar, FaPlay, FaList } from 'react-icons/fa';
import NavebarPage from '../navbar/navbar';
import { useRouter } from 'next/router';
import { useGetAllMoviesQuery, useGetMovieQuery, useSearchMovieQuery, useStreamMovieQuery } from '@/store/movies/movies_api';

const HomePage: React.FC = () => {
    const router = useRouter();
    const { publicId } = router.query;
  
    

    return (
        <>
            <NavebarPage />
            <div className="bg-cover h-screen flex justify-center items-center" style={{ backgroundImage: 'url("your-movie-image.jpg")' }}>
                <div className="bg-black bg-opacity-70 p-8 ">
                    <div className=" flex space-x-4 justify-center"> {/* Centered column */}
                        <div className="text-center flex justify-center space-x-8">
                            <button className="bg-red-500 text-white px-6 py-3 rounded-lg flex items-center" >
                                <FaPlay className="mr-2" /> Watch Movie
                            </button>
                            <button className="bg-transparent border border-red-500 text-red-500 px-6 py-3 rounded-lg flex items-center">
                                <FaList className="mr-2" /> Add to Watchlist
                            </button>
                        </div>
                    </div>
                    <div className="text-white mt-10 mr-36"> {/* Left-aligned column */}
                        <div className="">
                            <h1 className="text-lg font-extrabold mt-8">Movie Title</h1>

                            <div className="flex flex-row space-x-4 mt-2">
                                <div className="text-xl bg-gray-50 text-black  px-3 py-1 rounded-lg">Action</div>
                                <div className="text-xl flex items-center">
                                    <FaCalendar className="mr-2" /> 2023
                                </div>
                                <div className="text-xl flex items-center">
                                    <FaEye className="mr-2" /> 100,000
                                </div>
                                <div className="text-xl flex items-center">
                                    <FaStar className="mr-2" /> 4.5/5
                                </div>
                            </div>
                        </div>
                        <div className="max-w-screen-md mr-6 mx-auto">
                            <p className="text-md mt-2 whitespace-normal">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Consequatur, fugiat laboriosam nesciunt adipisci ea labore ipsam. Qui impedit,
                                optio provident dolores animi praesentium repellendus cumque amet a, voluptatum sunt ipsam?
                                Qui impedit,
                                optio provident dolores animi praesentium repellendus cumque amet a, voluptatum sunt
                            </p>

                        </div>

                       

                    </div>
                </div>
            </div>
        </>
        
    );
};

export default HomePage;
