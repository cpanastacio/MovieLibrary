import axios from 'axios';

export async function getMovies() {
  try {
    const movies = await axios.get(`/movies`);
    return movies.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getMovieIfNotExistsAddsDB(name) {
  try {
    const movies = await axios.get(`/movie/${name}`);
    return movies.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function register(user) {
  try {
    const createUser = await axios.post(`/register`, user);
    return createUser.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function login(username, password) {
  try {
    const loginUser = await axios.post(`/authenticate`, { username, password });
    return loginUser.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSession() {
  try {
    const logoutUser = await axios.get(`/get_session`);
    return logoutUser.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function logout() {
  try {
    const logoutUser = await axios.get(`/destroysession`);
    return logoutUser.data;
  } catch (error) {
    throw new Error(error);
  }
}
