import FoodList from './FoodList';
import MockData from '../mock.json';
import { useState } from 'react';

function App() {
    const [order, setOrder] = useState('createdAt');
    const [listItems, setListItems] = useState(MockData);

    const sortedItems = listItems.sort((a, b) => (b[order] - a[order]));

    const handleNewestClick = () => setOrder('createdAt');
    const handleCalorieClick = () => setOrder('calorie');
    const handleDelete = (id) => {
        const nextItem = listItems.filter((item) => item.id !== id);
        setListItems(nextItem);
    }

  return (
    <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete}/>
    </div>
  );
}

export default App;
