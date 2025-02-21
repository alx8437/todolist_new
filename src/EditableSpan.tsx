import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

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
            {isEditMode ?
                <TextField
                    onChange={onChangeTitle}
                    value={title}
                    autoFocus
                    onBlur={turnOfEditMode}
                    size={'small'}
                />
                :
                <span onDoubleClick={turnOnEditMode}>{value}</span>}
        </>

    );
};
