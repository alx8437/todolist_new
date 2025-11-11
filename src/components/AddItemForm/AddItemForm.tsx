import React, {FC} from 'react';
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useAddItemForm} from "./hooks/useAddItemForm";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

export const AddItemForm:FC<AddItemFormPropsType> = React.memo(({addItem}) => {
    const {
        title,
        changeTitleHandler,
        addItemOnKeyUpHandler,
        error,
        addItemHandler
    } = useAddItemForm(addItem)

    return (
        <div>
            <div>
                <TextField
                    value={title}
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
