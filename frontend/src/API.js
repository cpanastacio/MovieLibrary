import axios from "axios";

const baseUrl = `http://localhost:${8080}`;

export async function getMovies() {
    try {
        const movies = await axios.get(`${baseUrl}/movies`);
        return movies.data;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getMovieIfNotExistsAddsDB(name) {
    try {
        const movies = await axios.get(`${baseUrl}/movie/${name}`);
        return movies.data;
    } catch (error) {
        throw new Error(error);
    }
}
