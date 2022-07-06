import * as React from 'react';

type Props = {
    size?: number;
    fill?: string;
};

function DropDownIcon({size = 16, fill = '#333'}: Props) {
    return (
        <svg fill={fill} width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M7.646 10.354L4.646 7.354L5.354 6.646L8 9.293L10.646 6.646L11.354 7.354L8.354 10.354L8 10.707L7.646 10.354Z" />
        </svg>
    );
}

export default DropDownIcon;
