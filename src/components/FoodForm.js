import { useState } from "react"
import { createFood } from '../api';
import FileInput from "./FileInput";
import "./FoodForm.css";

const INITIAL_VALUE = {
        title: '',
        calorie: 0,
        content: '',
        imgFile: null,
}

function FoodForm() {

    const [values, setValues] = useState(INITIAL_VALUE);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittingError, setSubmittingError] = useState(null);

    const handleChange = (name, value) => {
        setValues((preValues) => ({
            ...preValues, [name]: value
        })
    )}

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value)
    }

    const handleSubmit = async (e) => {
        // prevent default get request of html form tag
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('calorie', values.calorie);
        formData.append('content', values.content);
        formData.append('imgFile', values.imgFile);

        try {
            setSubmittingError(null);
            setIsSubmitting(true);
            await createFood(formData);
        } catch (error) {
            setSubmittingError(error);
            return;
        } finally {
            setIsSubmitting(false);
        }
        setValues(INITIAL_VALUE);

    }

    return (
    <form className="FoodForm" onSubmit={handleSubmit}>
        <FileInput name="imgFile" value={values.imgFile} onChange={handleChange}/>
        <input name="title" value={values.title} onChange={handleInputChange} />
        <input type="number" name="calorie" value={values.calorie} onChange={handleInputChange} />
        <input name="content" value={values.content} onChange={handleInputChange} />
        <button type="submit" disabled={isSubmitting}>확인</button>
        {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
    )

}

export default FoodForm