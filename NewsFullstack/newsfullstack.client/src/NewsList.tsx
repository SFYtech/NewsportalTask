import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface News {
    article_id: string;
    title: string;
    pubDate: string;
    country: string[];
    category: string[];
}

function NewsList() {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNewsDataWithRetry();
    }, []);

    // Function with retry mechanism for handling 429 errors
    async function fetchNewsDataWithRetry(retries = 3, delay = 1000) {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/News/headlines', {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                }
            });

            if (response.status === 429 && retries > 0) {
                console.warn(`429 received. Retrying in ${delay / 1000} seconds...`);
                setTimeout(() => fetchNewsDataWithRetry(retries - 1, delay * 2), delay);  // Exponential backoff
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched News Data:', data);

            if (data.results) {
                setNewsList(data.results);
            } else {
                throw new Error('Invalid data format received from API');
            }
        } catch (error: any) {
            setError(error.message || 'An unexpected error occurred.');
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Latest News Headlines</h2>

            {loading && <p>Loading news...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Publication Date</th>
                            <th className="px-4 py-2 text-left">Country</th>
                            <th className="px-4 py-2 text-left">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsList.map(news => (
                            <tr key={news.article_id} className="border-t hover:bg-gray-100">
                                <td className="px-4 py-2">
                                    <Link to={`/news/${news.article_id}`} className="text-blue-500 hover:underline">
                                        {news.title}
                                    </Link>
                                </td>
                                <td className="px-4 py-2">{new Date(news.pubDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{news.country?.join(', ') || 'N/A'}</td>
                                <td className="px-4 py-2">{news.category?.join(', ') || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default NewsList;
