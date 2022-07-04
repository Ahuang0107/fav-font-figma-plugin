import * as React from 'react';

type Props = {
    size?: number;
    fill?: string;
};

function ArrowUpIcon({size = 16, fill = '#333'}: Props) {
    return (
        <svg fill={fill} width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M8.93967 8.33167L5.293 11.98L6.00034 12.6867L10.3537 8.33134L6.00031 3.98L5.29331 4.687L8.93967 8.33167Z" />
        </svg>
    );
}

export default ArrowUpIcon;
