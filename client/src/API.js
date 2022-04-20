import axios from 'axios';

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

export async function register(user) {
  try {
    const createUser = await axios.post(`${baseUrl}/register`, user);
    return createUser.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function login(username, password) {
  try {
    const loginUser = await axios.post(`${baseUrl}/login`, {
      username,
      password,
    });
    return loginUser.data;
  } catch (error) {
    throw new Error(error);
  }
}
