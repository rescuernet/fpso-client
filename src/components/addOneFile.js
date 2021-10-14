import React from 'react';
import {Fab} from "@material-ui/core";

const AddOneFile = () => {
    return (
        <label htmlFor="upload-photo">
            <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
            />

            <Fab
                color="primary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
            >
                прикрепить
            </Fab>
        </label>
    );
};

export default AddOneFile;