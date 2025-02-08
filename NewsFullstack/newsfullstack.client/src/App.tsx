import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsList from './NewsList';
import NewsDetails from './NewsDetails';

function App() {
    return (
        <Router>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">News Portal</h1>
                <Routes>
                    <Route path="/" element={<NewsList />} />
                    <Route path="/news/:id" element={<NewsDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
