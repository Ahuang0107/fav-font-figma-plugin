import * as React from 'react';

type Props = {
    size?: number;
    fill?: string;
};

function ENIcon({size = 16, fill = '#333'}: Props) {
    return (
        <svg fill={fill} width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M5.89898 12H0.701719L2.03766 4.00195H7.0943L6.88336 5.25586H3.26227L2.91656 7.33008H5.91656L5.71734 8.51367H2.71734L2.34234 10.7461H6.10992L5.89898 12ZM13.2963 12H12.1537L9.42328 5.98828L8.42133 12H7.26703L8.60297 4.00195H10.0854L12.5756 9.49219L13.4955 4.00195H14.6381L13.2963 12Z" />
        </svg>
    );
}

export default ENIcon;
