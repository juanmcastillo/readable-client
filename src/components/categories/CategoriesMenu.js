import _ from 'lodash';
import React from 'react';
import ShortId from 'shortid';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

function CategoriesMenu ({categories, toggleSideMenu, openSideMenu}){
    return (
        <Drawer open={openSideMenu} 
                docked={false}
                onRequestChange={toggleSideMenu}>
            {
                categories.map(category => (
                    <Link className='undecorated-anchor'
                            key={ShortId.generate()}
                            to={`/${category.name}`}>

                        <MenuItem onClick={toggleSideMenu}>
                            { 
                                _.capitalize(category.name) 
                            }
                        </MenuItem>

                    </Link>
                ))
            }
        </Drawer>
    );
}

export default CategoriesMenu;