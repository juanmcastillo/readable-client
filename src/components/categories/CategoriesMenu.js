import _ from 'lodash';
import React from 'react';
import ShortId from 'shortid';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { selectCategory } from '../../actions/Categories';

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
                              to={`/${category.name}`}
                              onClick={() => props.selectCategory(category)}>

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

const mapDispatchToProps = (dispatch) => ({
    selectCategory: (category) => dispatch(selectCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesMenu);