import React from 'react';
import {
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem
} from '@material-ui/core';

const MenuButton = ({...props}) => {
    const [ anchorEl, setAnchorEl ] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = ( ) => {
        setAnchorEl(null);
    }

    const handleMenuItemClick = (action) => {
        if (typeof(action) === "function") {
            handleClose( );
            action( );
            return;
        }

        handleClose( );
    }

    const Icon = props.icon;

    const ListItems = ( ) => props.menuItems.map((option, optionIndex) => (
        <>
            <MenuItem onClick={( ) => {
                if (props.menuFunctions[optionIndex] === null) {
                    handleMenuItemClick( );
                }
                handleMenuItemClick(props.menuFunctions[optionIndex])}}>
                {option}
            </MenuItem>
            {optionIndex === props.menuItems.length - 2 && <Divider/>}
        </>
    ))

    return (
        <div>
            {props.actionComp === "button" && 
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={handleClick}>
                    Actions
                </Button>
            }

            {props.actionComp === "icon" &&
                <IconButton onClick={handleClick}>
                    {<Icon fontSize="large" color="secondary"/>}
                </IconButton>
            }

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>

                <ListItems/>

            </Menu>
        </div>
    );
}

export default MenuButton;


