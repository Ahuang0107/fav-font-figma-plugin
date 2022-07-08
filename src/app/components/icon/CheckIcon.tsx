import * as React from 'react';

type Props = {
    size?: number;
    fill?: string;
};

function CheckIcon({size = 16, fill = '#333'}: Props) {
    return (
        <svg fill={fill} width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M5.17647 6.88236L7.05882 8.76472L10.8235 5L12 6.17647L7.05882 11.1177L4 8.05883L5.17647 6.88236Z" />
        </svg>
    );
}

export default CheckIcon;
