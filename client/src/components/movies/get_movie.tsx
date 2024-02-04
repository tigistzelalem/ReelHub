import { useGetMovieQuery } from "@/store/movies/movies_api";
import { useRouter } from "next/router";
import { CldVideoPlayer } from 'next-cloudinary';
import NavebarPage from "../navbar/navbar";

const MovieDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: movie, error, isLoading } = useGetMovieQuery(id as string);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    const movies = movie.movie;
    console.log(movies.publicId);

    return (
        <>
            <NavebarPage />
            <div className="flex justify-center items-center mt-16 gap-48 p-8 mx-24">
                {/* <CldVideoPlayer id={movies.id}
                    src="movies.publicId" // Replace with the actual property containing Cloudinary public ID
                    width="1920"
                    height="1080"
                    controls
                    preload="auto"
                /> */}
                <div>
                    <img src="movie-image.jpg" alt="Movie" className="w-full" />
                </div>
                <div className="text-white mt-4">
                    <h2 className="text-3xl font-bold mb-4">{movies.title}</h2>
                    <div className="flex items-center space-x-4 mt-4 my-2">
                        <div className="text-gray-400">
                            <div className="font-bold bg-white p-1 rounded-lg">{movies.genere}</div>
                        </div>
                        <div className="text-gray-400">
                            <span className="font-bold">Rating:</span> {movies.rating}
                        </div>
                        <div className="text-gray-400">
                            <span className="font-bold">Views:</span> {movies.views}
                        </div>
                    </div>
                    <p className="text-gray-600">{movies.description}</p>

                    {/* Add your "Watch Movie" button here */}
                    {/* Optionally, you can use the Cloudinary video player API to control the player */}
                    {/* <button onClick={() => player.play()} className="bg-red-500 text-white py-2 px-4 mt-4 rounded-full">
                        Watch Movie
                    </button> */}
                </div>
            </div>
        </>
    );
};

export default MovieDetail;
