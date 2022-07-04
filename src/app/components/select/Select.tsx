import * as React from 'react';
import styled from 'styled-components';

interface PropsType {
    options: string[];
    onChange: (value: string) => void;
}

const Select = ({options, onChange}: PropsType) => (
    <RealSelect onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
            <RealOption value={o} key={o}>
                {o}
            </RealOption>
        ))}
    </RealSelect>
);

const RealSelect = styled.select`
    width: 100%;
    height: 30px;
    margin-right: 8px;

    border: #f0f0f0 solid 1px;
    border-radius: 2px;

    font-size: 11px;
    line-height: 14px;

    :active,
    :focus {
        border: #f0f0f0 solid 1px;
    }
`;

const RealOption = styled.option`
    height: 24px;
    border: #f0f0f0 solid 1px;
    border-radius: 2px;

    :active,
    :focus {
        border: #f0f0f0 solid 1px;
    }
`;

export default Select;
