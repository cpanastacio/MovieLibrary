import axios from 'axios';

// MOVIES
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

export async function getMoviesWithArray(movieArray) {
  try {
    const movies = await axios.post(`/movies/watchlist`, {
      movieArray,
    });
    return movies.data;
  } catch (error) {
    throw new Error(error);
  }
}

// USERS
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

export async function updateUser(user) {
  try {
    const updateUser = await axios.patch('/user', user);
    return updateUser.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeFromWatchlist(title) {
  try {
    const result = await axios.patch(`/user/removeFromWatchlist/${title}`);
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}

// POSTS
export async function getPostsByTitle(title) {
  try {
    const posts = await axios.get(`/post/${title}`);
    return posts.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updatePostById(id, post) {
  try {
    const postToBeUpdated = await axios.patch(`/post/${id}`, { post });
    return postToBeUpdated.data;
  } catch (error) {
    throw new Error(error);
  }
}
export async function deletePostById(id) {
  try {
    const postToBeUpdated = await axios.delete(`/post/${id}`);
    return postToBeUpdated.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function insertPost(postObj) {
  try {
    const { username, title, comment } = postObj;
    const postToBeUpdated = await axios.post(`/post`, {
      username,
      title,
      comment,
    });
    return postToBeUpdated.data;
  } catch (error) {
    throw new Error(error);
  }
}
