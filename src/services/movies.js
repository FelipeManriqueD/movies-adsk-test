const apiKey = 'a9b856b302ef45f0fc28033e35b71d6a'
const baseUrl = 'https://api.themoviedb.org/3/discover/movie'

export const getMovies = async () => {
    const res = await fetch(`${baseUrl}?api_key=${apiKey}`);
    if (!res.ok) throw new Error("Error fetching");
    const data = await res.json();
    return data;
  };