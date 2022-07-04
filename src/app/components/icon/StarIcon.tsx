import * as React from 'react';

type Props = {
    size?: number;
    fill?: string;
    stroke?: string;
};

function StarIcon({size = 16, fill = 'none', stroke = '#1E1E1E'}: Props) {
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.8529 9.68413L10.6548 9.86979L10.7027 10.137L11.283 13.3795L8.22544 11.8349L8 11.7211L7.77456 11.8349L4.717 13.3795L5.29732 10.137L5.34523 9.86935L5.14656 9.68366L2.70987 7.40615L6.0932 6.9331L6.34995 6.8972L6.46856 6.66667L8 3.69021L9.53144 6.66667L9.65005 6.8972L9.9068 6.9331L13.2843 7.40533L10.8529 9.68413Z"
                fill={fill}
                stroke={stroke}
            />
        </svg>
    );
}

export default StarIcon;
