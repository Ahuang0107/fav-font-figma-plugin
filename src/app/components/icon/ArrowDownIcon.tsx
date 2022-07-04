import * as React from 'react';

type Props = {
    size?: number;
    fill?: string;
};

function ArrowDownIcon({size = 16, fill = '#000'}: Props) {
    return (
        <svg fill={fill} width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M7.825 9.44967L4.17667 5.803L3.47 6.51034L7.82533 10.8637L12.1767 6.51031L11.4697 5.80331L7.825 9.44967Z" />
        </svg>
    );
}

export default ArrowDownIcon;
