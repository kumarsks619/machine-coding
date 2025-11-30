import { useQuery } from '../hooks/useQuery';

const QueryComponent2 = () => {
    const { isLoading, data, error } = useQuery('posts', fetchPosts);

    async function fetchPosts() {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts');
        return data.json();
    }

    return (
        <div>
            <h1>useQuery Hook - 2nd Component</h1>
            <div>
                <p>isLoading: {String(isLoading)}</p>
                <p>error: {String(error)}</p>
                <p>data: {data.length}</p>
            </div>
        </div>
    );
};

export default QueryComponent2;
