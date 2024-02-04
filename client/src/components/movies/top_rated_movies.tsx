import { useGetTopRatedQuery } from '@/store/movies/movies_api'
import React from 'react'

const TopRatedMovies: React.FC = () => {
    const { data: topRatedMovies, error, isLoading } = useGetTopRatedQuery({});

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error</p>
    }

    console.log('######', topRatedMovies)

    return (
        <div className="overflow-x-auto whitespace-nowrap p-4">
            <div className="flex space-x-4">
                {topRatedMovies.map((movie: any) => (
                    <div className="relative" key={movie._id}>
                        <img src={movie.imageUrl}
                            alt="movie title"
                            className="w-64 h-auto cursor-pointer"
                        />
                        <div className="hidden group-hover-block absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 transform translate-y-full transition-transform">
                            <h3 className='text-lg text-white font-bold'>{movie.title}</h3>
                            <p className='text-sm text-white'>{movie.description}</p>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default TopRatedMovies