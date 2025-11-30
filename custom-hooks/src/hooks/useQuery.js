import { useEffect, useState } from 'react';

const cache = {};
export const useQuery = (queryKey, fetcherFx) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cache[queryKey]) {
            console.log('cache hit! Returned from cache.');
            setData(cache[queryKey]);
            fetcherFx()
                .then((res) => {
                    setData(res);
                    cache[queryKey] = res;
                })
                .catch((err) => console.log('API silently failed!'));
            return;
        }

        setIsLoading(true);
        fetcherFx()
            .then((res) => {
                setData(res);
                cache[queryKey] = res;
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return {
        isLoading,
        data,
        error,
    };
};

// Hook Signature:
// The hook must have the signature useQuery(queryKey, fetcherFn).
// queryKey: A unique, serializable identifier for the query (e.g., a string or an array).
// fetcherFn: An asynchronous function that returns a promise, which will resolve with the data.
// Return Value: The hook must return an object with the current query state: { data, isLoading, error }.
// Global Caching: All query results must be stored in a global, in-memory cache, keyed by the queryKey.
// Stale-While-Revalidate: When a component mounts and uses a query:

// If the data is already in the cache, it should be returned immediately (isLoading should be false).

// Simultaneously, a "background" fetch should be initiated to get fresh data.

// When the fresh data arrives, the component should seamlessly re-render with the new data.
