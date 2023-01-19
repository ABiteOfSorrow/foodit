import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, onChange}) {
    const [preView, setPreview] = useState();

    const inputRef = useRef();

    const handleChange = (e) => {
        const nextValue = e.target.files[0];
        onChange(name, nextValue)
    }

    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputNode) return;

        inputNode.value = '';
        onChange(name, null);
    }

    useEffect(() => {

        if(!value) return;
        const nextPreview = URL.createObjectURL(value);
        setPreview(nextPreview);

        return () => {
            setPreview();
            URL.revokeObjectURL(nextPreview)        
        }

    },[value])

    return (
        <div>
        <img src={preView} alt="이미지 미리보기" />
        <input type="file" onChange={handleChange} ref={inputRef}/>
        {value && <button onClick={handleClearClick}>x</button>}
        </div>
    )
}

export default FileInput;