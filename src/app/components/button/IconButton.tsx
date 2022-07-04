import * as React from 'react';
import styled from 'styled-components';

type Props = {
    children?: React.ReactNode;
    active: boolean;
    onClick: () => void;
};

const IconButton = ({children, active, onClick}: Props) => (
    <RealButton active={active} onClick={onClick}>
        {children}
    </RealButton>
);

const RealButton = styled.button<{active?: boolean}>`
    width: 32px;
    height: 32px;
    margin: 0;
    padding: 0;
    border: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 2px;
    cursor: pointer;
    user-select: none;

    background-color: ${(props) => (props.active ? '#18A0FB' : '#FFFFFF')};

    :hover {
        background-color: ${(props) => (props.active ? '#18A0FB' : '#F0F0F0')};
    }

    // todo 按钮active的样式有什么作用，感觉不太需要呀
    :active {
        border: 1px solid ${(props) => (props.active ? 'rgba(0, 0, 0, .3)' : '#18A0FB')};
    }
`;

export default IconButton;
