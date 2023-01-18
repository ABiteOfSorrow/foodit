import { useState } from "react"
import FileInput from "./FileInput";
import "./FoodForm.css";

function FoodForm() {

    const [values, setValues] = useState({
        title: '',
        calorie: 0,
        content: '',
        imgFile: null,
    });

    const handleChange = (name, value) => {
        setValues((preValues) => ({
            ...preValues, [name]: value
        })
    )}

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleInputChange(name, value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({values})
    }

    return (
    <form className="FoodForm" onSubmit={handleSubmit}>
        <FileInput name="imgFile" value={values.imgFile} onChange={handleChange}/>
        <input name="title" value={values.title} onChange={handleInputChange} />
        <input type="number" name="calorie" value={values.calorie} onChange={handleInputChange} />
        <input name="content" value={values.content} onChange={handleInputChange} />
        <button type="submit">확인</button>
    </form>
    )

}

export default FoodForm