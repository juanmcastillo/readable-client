import _ from 'lodash';
import React from 'react';
import ShortId from 'shortid';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCategory } from '../../actions/categories/Categories';
import { toggleSideMenu } from '../../actions/general/General';

function CategoriesMenu({ categories, openSideMenu, toggleSideMenu, selectCategory }){

    return (
        <Drawer open={openSideMenu} 
                docked={false}
                onRequestChange={() => toggleSideMenu(openSideMenu)}>

                <Link to="/" 
                      className="undecorated-anchor"
                      onClick={() => selectCategory(undefined)}>

                    <MenuItem onClick={() => toggleSideMenu(openSideMenu)}>
                    { 
                        "General"
                    }
                    </MenuItem>

                </Link>

        {
            categories && categories.length > 0 ?
                categories.map(category => (
                    <Link className='undecorated-anchor'
                          key={ShortId.generate()}
                          to={`/${category.name}`}
                          onClick={() => selectCategory(category)}>

                        <MenuItem onClick={() => toggleSideMenu(openSideMenu)}>
                        { 
                            _.capitalize(category.name) 
                        }
                        </MenuItem>

                    </Link>
                ))
            : <h2 className="padded-text">No Categories available.</h2>

        }
        </Drawer>
    );
}

CategoriesMenu.propTypes = {
    categories: PropTypes.array,
    openSideMenu: PropTypes.bool.isRequired,
    selectCategory: PropTypes.func.isRequired,
    toggleSideMenu: PropTypes.func.isRequired
}

const mapStateToProps = ({categories, general}, props) => ({
    categories: categories.categories,
    openSideMenu: general.sideMenuState
});

const mapDispatchToProps = (dispatch) => ({
    selectCategory: (category) => dispatch(selectCategory(category)),
    toggleSideMenu: (sideMenuState) => dispatch(toggleSideMenu(sideMenuState))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesMenu);