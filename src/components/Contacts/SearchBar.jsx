import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    field: {
        marginRight: theme.spacing(2),
    },
    form: {
        display: 'flex',
        alignItems: 'center',
    },
}));

function SearchBar({ onClickRegister, searchKeyword }) {
    const classes = useStyles();
    const matches = useMediaQuery((theme) =>
        theme.breakpoints.down(theme.layout.breakPoint),
    );
    const { register, handleSubmit } = useForm();

    const onSubmit = (v) => {
        searchKeyword(v.mobile || '');
    };

    return (
        <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
                <Button
                    size={matches ? 'small' : 'large'}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={onClickRegister}
                >
                    <AddIcon />
                    {!matches && '연락처 추가'}
                </Button>
            </Box>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={classes.field}
                    size={matches ? 'small' : 'medium'}
                    variant={matches ? 'standard' : 'outlined'}
                    margin="normal"
                    id="mobile"
                    label={matches ? '' : '전화번호'}
                    name="mobile"
                    inputProps={{
                        defaultValue: '',
                        ...register('mobile'),
                    }}
                />
                <Box display="flex" alignItems="center" margin="0 10">
                    <Button
                        size={matches ? 'small' : 'large'}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        <SearchIcon />
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default SearchBar;
