import * as React from 'react';

type Props = {
    size?: number;
    fill?: string;
};

function CHIcon({size = 16, fill = '#333'}: Props) {
    return (
        <svg fill={fill} width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M7.20172 9.80859C6.51813 11.4102 5.46148 12.2109 4.0318 12.2109C3.16461 12.2109 2.45758 11.8984 1.9107 11.2734C1.36773 10.6445 1.09625 9.79102 1.09625 8.71289C1.09625 7.36523 1.44586 6.20898 2.14508 5.24414C2.8443 4.27539 3.74273 3.79102 4.84039 3.79102C5.69586 3.79102 6.37359 4.03906 6.87359 4.53516C7.37359 5.03125 7.65875 5.71875 7.72906 6.59766L6.42828 6.83203C6.31109 5.60547 5.77203 4.99219 4.81109 4.99219C4.03375 4.99219 3.4732 5.45312 3.12945 6.375C2.78961 7.29688 2.61969 8.17383 2.61969 9.00586C2.61969 9.6543 2.76227 10.1426 3.04742 10.4707C3.33648 10.7988 3.70367 10.9629 4.14898 10.9629C4.55914 10.9629 4.93023 10.8047 5.26227 10.4883C5.5982 10.168 5.85406 9.7793 6.02984 9.32227L7.20172 9.80859ZM14.1245 12H12.9819L10.2514 5.98828L9.24945 12H8.09516L9.43109 4.00195H10.9135L13.4037 9.49219L14.3237 4.00195H15.4662L14.1245 12Z" />
        </svg>
    );
}

export default CHIcon;