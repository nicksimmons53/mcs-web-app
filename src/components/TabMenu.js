import React from 'react';
import { 
    Tab,
    Tabs
} from '@material-ui/core';

function TabMenu({ ...props }) {
    const handleTabChange = (event, newValue) => { props.setValue(newValue) }

    return (
        <Tabs 
            centered 
            value={props.value} 
            indicatorColor="secondary" 
            onChange={handleTabChange}>
            {props.tabs.map((tab, index) => (
                <Tab key={index} label={tab}/>
            ))}
        </Tabs>
    );
}

export default TabMenu;