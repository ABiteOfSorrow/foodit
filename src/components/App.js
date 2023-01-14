import FoodList from './FoodList';
import getFoods from '../api';
import { useState, useEffect } from 'react';

function App() {
    const [order, setOrder] = useState('createdAt');
    const [listItems, setListItems] = useState([]);
    const [cursor, setCursor] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);
    const [search, setSearch] = useState("");

    const sortedItems = listItems.sort((a, b) => (b[order] - a[order]));
    
    // Sort items
    const handleNewestClick = () => setOrder('createdAt');
    const handleCalorieClick = () => setOrder('calorie');
    
    // Delete item
    const handleDelete = (id) => {
        const nextItem = listItems.filter((item) => item.id !== id);
        setListItems(nextItem);
    }
    
    // Load items
    const handleLoad = async (options) => {

        let result;
        try {
            setIsLoading(true);
            setLoadingError(null);
            result = await getFoods(options);
        } catch (error) {
            setLoadingError(error);
            return
        } finally {
            setIsLoading(false);
        }

        const { foods, paging: {nextCursor} } = await getFoods(options);
        if (!options.cursor) {
            setListItems(foods);
        } else {
            setListItems((prevItems) => [...prevItems, ...foods]);
        }
        setCursor(nextCursor);
    }

    // Load more items
    const handleLoadMore = async () => {
        handleLoad({order, cursor});        
    }

    // Search items
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch(e.target['search'].value);
        handleLoad({search});
    }

    // Load items (default)
    useEffect(() => {
        handleLoad({order});
    }, [order]);

  return (
    <div>
        <div>
            <button onClick={handleNewestClick}>최신순</button>
            <button onClick={handleCalorieClick}>칼로리순</button>
            <form onSubmit={handleSearchSubmit}>
                <input name='search'/>
                <button type='submit'>검색</button>
            </form>
        </div>
        <FoodList items={sortedItems} onDelete={handleDelete}/>
        {cursor && (<button disabled={isLoading} onClick={handleLoadMore}>더보기</button>)}
        {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
