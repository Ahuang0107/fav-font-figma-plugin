import * as React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import DropDownIcon from '~/components/icon/DropDownIcon';
import CheckIcon from '~/components/icon/CheckIcon';

interface PropsType {
    value: string | null;
    setValue: (value: string | null) => void;
    options: string[];
}

const Select = ({value, setValue, options}: PropsType) => {
    const [expand, setExpand] = useState(false);

    function onClick(value: string | null) {
        setValue(value);
        setExpand(false);
    }

    return (
        <RealSelectWrap>
            <SelectWrap onClick={() => setExpand(!expand)}>
                <SelectText>{value ?? 'All Class'}</SelectText>
                <SelectDropDown>
                    <DropDownIcon />
                </SelectDropDown>
            </SelectWrap>
            <OptionsWrap hidden={!expand}>
                <Option onClick={() => onClick(null)}>
                    <CheckIconSpan hide={value !== null}>
                        <CheckIcon fill={'#FFF'} />
                    </CheckIconSpan>
                    <OptionText>All Class</OptionText>
                </Option>
                <OptionOutline>
                    <Outline />
                </OptionOutline>
                {options.map((it) => (
                    <Option onClick={() => onClick(it)}>
                        <CheckIconSpan hide={value !== it}>
                            <CheckIcon fill={'#FFF'} />
                        </CheckIconSpan>
                        <OptionText>{it}</OptionText>
                    </Option>
                ))}
            </OptionsWrap>
        </RealSelectWrap>
    );
};

const RealSelectWrap = styled.div`
    width: 100%;
    position: relative;
`;

const SelectWrap = styled.div`
    width: 100%;
    height: 30px;
    border: #f0f0f0 solid 1px;
    border-radius: 4px;
    margin-right: 8px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    :hover {
        border: #18a0fb solid 1px;
    }
`;

const SelectText = styled.span`
    height: 14px;
    line-height: 14px;
    font-size: 12px;

    margin-left: 8px;
    font-family: Inter, sans-serif;

    user-select: none;
`;

const SelectDropDown = styled.span`
    width: 16px;
    height: 16px;
    margin-right: 8px;
`;

const OptionsWrap = styled.div`
    width: 100%;
    background-color: #212121;
    padding: 8px 0;
    z-index: 99;
    border: #000000 solid 0.5px;
    border-radius: 4px;
    margin-top: 1px;

    position: absolute;
`;

const OptionOutline = styled.div`
    width: 100%;
    height: 16px;

    display: flex;
    align-items: center;
`;

const Outline = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(178, 178, 178, 0.3);
`;

const Option = styled.div`
    width: 100%;
    height: 24px;
    padding-left: 8px;

    color: white;

    display: flex;
    justify-content: start;
    align-items: center;
    user-select: none;
    cursor: pointer;

    :hover {
        background-color: #18a0fb;
    }
`;

interface HideProps {
    readonly hide?: boolean;
}

interface HideChangeProps {
    readonly visibility: string;
}

const CheckIconSpan = styled.span.attrs<HideProps, HideChangeProps>(({hide}) => ({
    visibility: hide ? 'hidden' : 'visible',
}))<HideProps>`
    visibility: ${(props) => props.visibility};
`;

const OptionText = styled.p`
    color: white;
    font-family: Inter, sans-serif;
    font-size: 11px;
    line-height: 14px;
    height: 14px;
    margin-left: 8px;
`;

export default Select;
