import _ from 'lodash';
import React from 'react';
import ShortId from 'shortid';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

function CategoriesMenu (props){
    const { categories, openSideMenu, toggleSideMenu} = props;

    return (
        <Drawer open={openSideMenu} 
                docked={false}
                onRequestChange={toggleSideMenu}>
            {
                categories && categories.length > 0 ?
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
                : <h2>No Categories available.</h2>

            }
        </Drawer>
    );
}

const mapStateToProps = ({categories}, props) => ({
    categories: categories.categories
});

export default connect(mapStateToProps)(CategoriesMenu);