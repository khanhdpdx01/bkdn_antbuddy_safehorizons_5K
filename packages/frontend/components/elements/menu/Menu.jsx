import React from 'react';
import Link from 'next/link';

import MegaMenu from './MegaMenu';
import MenuDropdown from './MenuDropdown';

const Menu = ({ data, className }) => (
    <ul className={className}>
        {data && data.length > 0 &&
            data.map(item => {
                if (item.subMenu) {
                    return <MenuDropdown menuData={item} key={item.text} />;
                } else if (item.megaContent) {
                    return <MegaMenu menuData={item} key={item.text} />;
                } else {
                    return (
                        <li key={item.categroy_id}>
                            <Link href={{ pathname: 'index', query: { categoryId: item.category_id}}} >
                                <a>{item.category_name}</a>
                            </Link>
                        </li>
                    );
                }
            })}
    </ul>
);

export default Menu;
