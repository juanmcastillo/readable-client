import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import CategoriesMenu from '../../components/categories/CategoriesMenu';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { toggleSideMenu, showNotification } from '../../actions/general/General';

function Header({ selectedCategory, toggleSideMenu, openSideMenu, showNotification, displayNotification, notification }) {   
    return (
        <AppBar title={selectedCategory ? _.capitalize(selectedCategory.name): 'General'}
                onLeftIconButtonClick={() => toggleSideMenu(openSideMenu)} >

            <CategoriesMenu />

            <Snackbar open={showNotification}
                      message={notification}
                      autoHideDuration={4000}
                      onRequestClose={() => displayNotification(false)}/>

        </AppBar>
    );
}

Header.propTypes = {
    selectedCategory: PropTypes.object,
    openSideMenu: PropTypes.bool.isRequired,
    showNotification: PropTypes.bool.isRequired,
    notification: PropTypes.string.isRequired,
    toggleSideMenu: PropTypes.func.isRequired,
    displayNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
    selectedCategory: state.categories.selectedCategory,
    openSideMenu: state.general.sideMenuState,
    showNotification: state.general.showNotification,
    notification: state.general.notification || ''
});

const mapDispatchToProps = (dispatch) => ({
    toggleSideMenu: (sideMenuState) => dispatch(toggleSideMenu(sideMenuState)),
    displayNotification: (isShown) => dispatch(showNotification(isShown))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);