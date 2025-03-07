import {IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {AddBox} from "@mui/icons-material";


type CreateItemFormProps = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm: FC<CreateItemFormProps> = ({onCreateItem}) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle);
            setTitle('');
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget
        setTitle(value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.key === 'Enter') {
            addItemHandler();
        }
    }

    return (
        <div>
            <TextField
                label={'Enter a title'}
                size='small'
                error={!!error}
                onChange={onChangeHandler}
                value={title}
                onKeyUp={onKeyUpHandler}
                helperText={error}
            />
            <IconButton sx={{ml: '20px'}} color={'primary'} onClick={addItemHandler}>
                <AddBox/>
            </IconButton>
        </div>
    );
};
