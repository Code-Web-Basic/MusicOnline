import axios from "axios";
const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGRmZmE5NzZlZTVlMGIwZTU0ZWUyZjk3MjE3ZmIzZSIsInN1YiI6IjYzYjU4MWJkYzU2ZDJkMDBkODQ0ZGQ2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LiHGDY9pdzlNQFLiCKF5kfPXmrtjBo_voIWXJ3sVBtI';
const httpRequest = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `bearer ${token}`,
    },
});
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest; 