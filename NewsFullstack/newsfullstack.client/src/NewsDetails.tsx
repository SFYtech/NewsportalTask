import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface NewsDetail {
    article_id: string;
    title: string;
    description: string;
    content: string;
    pubDate: string;
    creator: string | null;
    keywords: string[];
    country: string[];
    category: string[];
    image_url: string;
    source_id: string;
    source_name: string;
    source_url: string;
    source_icon: string;
}

function NewsDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNewsDetail();
    }, [id]);

    async function fetchNewsDetail() {
        try {
            const response = await fetch(`/api/News/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                setNewsDetail(data.results[0]);
            } else {
                throw new Error('News article not found.');
            }
        } catch (error: any) {
            setError(error.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-4">
            <Link to="/" className="text-blue-500 hover:underline">&larr; Back to Headlines</Link>
            {newsDetail && (
                <div className="mt-4 bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-4">{newsDetail.title}</h1>
                    <img src={newsDetail.image_url} alt={newsDetail.title} className="w-full h-auto rounded-lg mb-4" />

                    <p className="text-gray-700 mb-2"><strong>Published:</strong> {new Date(newsDetail.pubDate).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-2"><strong>By:</strong> {newsDetail.creator || 'Unknown'}</p>
                    <p className="text-gray-700 mb-2"><strong>Keywords:</strong> {newsDetail.keywords?.join(', ') || 'N/A'}</p>
                    <p className="text-gray-700 mb-2"><strong>Country:</strong> {newsDetail.country?.join(', ') || 'N/A'}</p>
                    <p className="text-gray-700 mb-2"><strong>Category:</strong> {newsDetail.category?.join(', ') || 'N/A'}</p>

                    <div className="mt-4">
                        <p className="text-lg font-semibold">Description:</p>
                        <p className="text-gray-600">{newsDetail.description}</p>
                    </div>

                    {newsDetail.content && (
                        <div className="mt-4">
                            <p className="text-lg font-semibold">Content:</p>
                            <p className="text-gray-600">{newsDetail.content}</p>
                        </div>
                    )}
                    <hr className="my-4" />

                    <footer className="flex items-center mt-4">
                        <img src={newsDetail.source_icon} alt={newsDetail.source_name} className="w-8 h-8 mr-2" />
                        <div>
                            <p className="text-gray-700"><strong>Source:</strong> {newsDetail.source_name}</p>
                            <a href={newsDetail.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Visit Source
                            </a>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    );
}

export default NewsDetailPage;
