import React from 'react';
import {
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
        handleClose( );
        action( );
    }

    const Icon = props.icon;

    const ListItems = ( ) => props.menuItems.map((option, optionIndex) => (
        <>
            <MenuItem onClick={( ) => {
                handleMenuItemClick(props.menuFunctions[optionIndex])
                }}>
                {option}
            </MenuItem>
            {optionIndex === props.menuItems.length - 2 && <Divider/>}
        </>
    ))

    return (
        <div>
            <IconButton onClick={handleClick}>
                {<Icon color="primary"/>}
            </IconButton>


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


