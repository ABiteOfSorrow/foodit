import FoodList from './FoodList';
import { createFood, getFoods, deleteFood, updateFood } from '../api';
import { useState, useEffect } from 'react';
import FoodForm from './FoodForm';

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
    const handleDelete = async (id) => {
        let result;

        try {
            setIsLoading(true);
            setLoadingError(null);
            result = await deleteFood(id);
        } catch (error) {
            setLoadingError(error);
            return;
        } finally {
            setIsLoading(false);
        }

        const nextItems = 
        setListItems((prevItems) => listItems.filter((item) => item.id !== id));
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

        const { foods, paging: {nextCursor} } = result
        if (!options.cursor) {
            setListItems(foods);
        } else {
            setListItems((prevItems) => [...prevItems, ...foods]);
        }
        setCursor(nextCursor);
    }

    // Load more items
    const handleLoadMore = () => {
        handleLoad({order, cursor, search});        
    }

    // Search items
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch(e.target['search'].value);
        handleLoad({search});
    }

    // create food
    const handleCreateSuccess = (newItem) => {
        setListItems((prevItems) => [newItem, ...prevItems]);
    }

    // update review
    const handleUpdateSuccess = (newItem) => {
        setListItems((prevItems) => {
          const splitIdx = prevItems.findIndex((item) => item.id === newItem.id);
          return [
            ...prevItems.slice(0, splitIdx),
            newItem,
            ...prevItems.slice(splitIdx + 1),
          ];
        });
      };
    

    // Load items (default)
    useEffect(() => {
        handleLoad({order, search});
    }, [order, search]);



  return (
    <div>
        <div>
            <FoodForm onSubmit={createFood} onSubmitSuccess={handleCreateSuccess}/>
            <button onClick={handleNewestClick}>최신순</button>
            <button onClick={handleCalorieClick}>칼로리순</button>
            <form onSubmit={handleSearchSubmit}>
                <input name='search'/>
                <button type='submit'>검색</button>
            </form>
        </div>        
        <FoodList items={sortedItems} onDelete={handleDelete} onUpdate={updateFood} onUpdateSuccess={handleUpdateSuccess}/>
        {cursor && (<button disabled={isLoading} onClick={handleLoadMore}>더보기</button>)}
        {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
