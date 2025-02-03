import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void;
}

export const EditableSpan: FC<EditableSpanPropsType> = ({title, onChange}) => {
    const [titleValue, setTitleValue] = useState<string>(title)
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const turnOnEditMode = () => {
        setIsEditMode(true);
    }

    const turnOffEditMode = () => {
        setIsEditMode(false);
        onChange(titleValue)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        setTitleValue(value);
    }


    return (
        <>
            {isEditMode ? <input onChange={onChangeTitle} autoFocus value={titleValue} onBlur={turnOffEditMode} type="text"/> : <span onDoubleClick={turnOnEditMode}>{title}</span>}
        </>
    );
};
