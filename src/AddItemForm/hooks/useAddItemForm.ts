import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (onAddItemAdded: (title: string) => void) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null)


    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        setTitle(value)
    }

    const addItemHandler = () => {
        const trimmedTitle  = title.trim();

        if (trimmedTitle !== '') {
            onAddItemAdded(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
            setTitle('')
        }
    }


    const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null);
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return {
        title,
        changeTitleHandler,
        addItemOnKeyUpHandler,
        error,
        addItemHandler
    }
}