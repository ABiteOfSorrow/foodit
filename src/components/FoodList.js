import './styles/FoodList.css'
import { useState } from 'react';
import FoodForm from './FoodForm';

function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`
}


function FoodListItem({ item, onDelete, onEdit }) {
    const { imgUrl, title, calorie, content, createdAt } = item;
    const handleDeleteClick = () => onDelete(item.id);
    const handleEditClick = () => onEdit(item.id);

  return (
    <div className='FoodListItem'>
      <img className='FoodImg' src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleDeleteClick}>삭제</button>
      <button onClick={handleEditClick}>수정</button>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
    const [editingId, setEditingId] = useState(null);
    const handleCancel = () => setEditingId(null);
    
  return (
    <ul className='FoodList'>
        {items.map((item) => {
            if (item.id === editingId) {
                const { id, imgUrl, title, calorie, content } = item;
                const initialValue = { title, calorie, content }
                const handleSubmit = (formData) => onUpdate(id, formData);
                const handleSubmitSuccess = (newItem) => {
                    onUpdateSuccess(newItem)
                    setEditingId(null);
                }
            
            return (
                <li key={id}>
                    <FoodForm initialValue={initialValue} 
                              initialPreview={imgUrl}                               
                              onCancel={handleCancel}
                              onSubmit={handleSubmit}
                              onSubmitSuccess={handleSubmitSuccess}
                              />
                </li>
            )}
    
            return (
                <li key={item.id}>
                    <FoodListItem item={item} 
                                  onDelete={onDelete} 
                                  onEdit={setEditingId}/>
                </li>
            )}
        )}
    </ul>
)}

export default FoodList;
