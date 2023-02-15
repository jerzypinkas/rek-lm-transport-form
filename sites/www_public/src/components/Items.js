import React from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const { useState , useEffect } = React;

const types = [
    {
        value: 'normal',
        label: 'Normal',
    },
    {
        value: 'dangerous',
        label: 'Dangerous',
    }
];
const Item = ({id, index, removeItem}) => {

    return(
        <Box
            component="div"
            noValidate
            sx={{
                display: 'grid',
                gridTemplateColumns: { sm: '1fr' },
                gap: 1,
                sm: 12
            }}
        >
            <div>
                <TextField
                    id="`item-name-${id}`"
                    label="Name"
                    size="small"
                    variant="outlined"
                    InputProps={{
                        sx: {width: 200}
                    }}
                />
            </div>
            <div>
                <TextField
                id="`item-weight-${id}`"
                label="Weight"
                size="small"
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    sx: {width: 100}
                }}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="`label-item-type-${id}`">Type</InputLabel>
                    <Select
                        labelId="`label-item-type-${id}`"
                        id="`item-type-${id}`"
                        value="normal"
                        label="Type"
                        // onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>Choice</em>
                        </MenuItem>
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <Fab color="primary" size="small" aria-label="add" onClick={() => removeItem(index)}>
                    <div>{id}</div>
                    <DeleteIcon />
                </Fab>
            </div>
        </Box>
    )
}

var contentId = 0;
const Items = () => {

    const [content, setContent] = useState([]);

    useEffect(() => {});

    const addContent = event => {
        contentId++;
        setContent(content => [...content , contentId]);
    }

    function removeContent (index) {
        let clone = [...content]
        clone.splice(index, 1)
        setContent(clone);
    }

    return(
        <>
            <div>
                {
                    content.map((id,i) =>
                        <Item key={id} id={id} index={i} removeItem={removeContent}/>
                    )
                }
            </div>
            <div onClick={(event) => addContent(event)}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        </>
    )
}

export default Items;

