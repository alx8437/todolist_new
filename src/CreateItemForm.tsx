import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type CreateItemFormProps = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm: FC<CreateItemFormProps> = ({onCreateItem}) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addTaskHandler = () => {
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
            addTaskHandler();
        }
    }

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                onChange={onChangeHandler}
                value={title} type="text"
                onKeyUp={onKeyUpHandler}
            />
            <Button title='+' onClick={addTaskHandler} />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};
