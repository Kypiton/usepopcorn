import { useEffect, useState } from 'react';

const KEY = '21d73cb1';

export function useMovies(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function getMovie() {
      try {
        setIsLoading(true);
        setError('');
        const req = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
          signal: controller.signal,
        });
        if (!req.ok) throw new Error('Something went wrong with fetching movies');
        const res = await req.json();
        if (res.Response === 'False') throw new Error('Movie not found');
        setMovies(res.Search);
        setError('');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    getMovie();

    return () => {
      controller.abort();
    };
  }, [query]);

  return [movies, isLoading, error];
}
