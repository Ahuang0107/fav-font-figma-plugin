import * as React from 'react';

type Props = {
    size?: number;
    fill?: string;
};

function LocateIcon({size = 16, fill = '#333'}: Props) {
    return (
        <svg fill={fill} width={size} height={size} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M512 512m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z" fill={fill}></path>
            <path
                d="M960 480h-33.632C910.752 276.16 747.84 113.248 544 97.632V64a32 32 0 1 0-64 0v33.632C276.16 113.248 113.248 276.16 97.632 480H64a32 32 0 0 0 0 64h33.632C113.248 747.84 276.16 910.752 480 926.368V960a32 32 0 1 0 64 0v-33.632C747.84 910.752 910.752 747.84 926.368 544H960a32 32 0 1 0 0-64zM544 862.368V800a32 32 0 1 0-64 0v62.368C311.424 847.104 176.896 712.576 161.632 544H224a32 32 0 1 0 0-64H161.632C176.896 311.424 311.424 176.896 480 161.632V224a32 32 0 0 0 64 0V161.632c168.576 15.296 303.104 149.792 318.368 318.368H800a32 32 0 1 0 0 64h62.368c-15.264 168.576-149.792 303.104-318.368 318.368z"
                fill={fill}
            ></path>
        </svg>
    );
}

export default LocateIcon;