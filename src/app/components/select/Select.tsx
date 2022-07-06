import * as React from 'react';
import styled from 'styled-components';
import DropDownIcon from '~/components/icon/DropDownIcon';

interface PropsType {
    value: string;
}

const Select = ({value}: PropsType) => (
    <SelectWrap>
        <SelectText>{value}</SelectText>
        <SelectDropDown>
            <DropDownIcon />
        </SelectDropDown>
    </SelectWrap>
);

const SelectWrap = styled.div`
    width: 100%;
    height: 30px;
    border: #f0f0f0 solid 1px;
    border-radius: 2px;
    margin-right: 8px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SelectText = styled.span`
    height: 14px;
    line-height: 14px;
    font-size: 12px;

    margin-left: 8px;
    font-family: Inter, sans-serif;
`;

const SelectDropDown = styled.span`
    width: 16px;
    height: 16px;
    margin-right: 8px;
`;

export default Select;
