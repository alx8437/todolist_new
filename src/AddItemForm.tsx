import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";
import { IconButton } from '@mui/material';
import {Add} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

export const AddItemForm:FC<AddItemFormPropsType> = React.memo(({addItem}) => {
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


    const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null);
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <div>
                <TextField
                    value={taskTitle}
                    onChange={changeTitleHandler}
                    type="text"
                    label={'Type value'}
                    onKeyUp={addItemOnKeyUpHandler}
                    variant={"outlined"}
                    error={!!error}
                    helperText={error}
                />
                <IconButton onClick={addItemHandler} color={"primary"}>
                    <Add/>
                </IconButton>
            </div>
        </div>
    );
});
