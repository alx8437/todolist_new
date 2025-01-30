import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (title: string) => void;
}

export const EditableSpan:FC<EditableSpanPropsType> = ({value, onChange}) => {
    const [title, setTitle] = useState<string>(value);
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOfEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        setTitle(value)
    }

    return (
        <>
            {isEditMode ? <input onChange={onChangeTitle} value={title} autoFocus onBlur={turnOfEditMode} /> : <span onDoubleClick={turnOnEditMode}>{value}</span>}
        </>

    );
};
