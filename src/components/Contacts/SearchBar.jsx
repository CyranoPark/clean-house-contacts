import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    field: {
        marginRight: theme.spacing(2),
    },
}));

function SearchBar({ handleSearch }) {
    const classes = useStyles();
    const [text, setText] = useState('');

    const onChangeForm = (e) => {
        setText(e.target.value);
    };

    return (
        <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
                <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    <AddIcon />
                    연락처 추가
                </Button>
            </Box>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(text);
                }}
                onChange={onChangeForm}
                noValidate
            >
                <Box display="flex" alignItems="center">
                    <TextField
                        required
                        className={classes.field}
                        variant="outlined"
                        margin="normal"
                        id="mobile"
                        label="전화번호"
                        name="mobile"
                        inputProps={{ value: text }}
                    />
                    <Box display="flex" alignItems="center" margin="0 10">
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            검색
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default SearchBar;
