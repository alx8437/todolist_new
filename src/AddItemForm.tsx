import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

export const AddItemForm:FC<AddItemFormPropsType> = ({addItem}) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<null | string>(null)


    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        setTaskTitle(value)
    }

    const addItemHandler = () => {
        const trimmedTitle  = taskTitle.trim();

        if (trimmedTitle !== '') {
            addItem(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
            setTaskTitle('')
        }
    }


    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <div><input
                value={taskTitle}
                onChange={changeTitleHandler}
                type="text"
                onKeyUp={addTaskOnKeyUpHandler}
                className={error ? 'error' : ''}
            />
                <Button onClick={addItemHandler} title='+'/></div>
            {error && <div className="error-message">Field is required</div>}
        </div>
    );
};
