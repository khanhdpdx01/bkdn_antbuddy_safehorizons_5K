import React from 'react';
// import menuData from '../../../../public/static/data/menu';
import Menu from '../../../elements/menu/Menu';
const MenuCategories = ({ data }) => (
    <Menu data={data} className="menu--dropdown" />
);

export default MenuCategories;
