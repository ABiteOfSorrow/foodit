import FoodList from './FoodList';
import getFoods from '../api';
import { useState, useEffect } from 'react';

function App() {
    const [order, setOrder] = useState('createdAt');
    const [listItems, setListItems] = useState([]);
    const [cursor, setCursor] = useState();

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
    const handleLoadClick = async (options) => {
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
        handleLoadClick({order, cursor});        
    }

    // Load items (default)
    useEffect(() => {
        handleLoadClick({order});
    }, [order]);

  return (
    <div>
        <div>
            <button onClick={handleNewestClick}>최신순</button>
            <button onClick={handleCalorieClick}>칼로리순</button>
        </div>
        <FoodList items={sortedItems} onDelete={handleDelete}/>
        <button onClick={handleLoadClick}>불러오기</button>
        {cursor && <button onClick={handleLoadMore}>더보기</button>}
    </div>
  );
}

export default App;
