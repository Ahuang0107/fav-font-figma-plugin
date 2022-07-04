import * as React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {FontItem} from '~/models/Font';
import useStores from '~/hooks/useStores';
import ArrowIcon from '~/components/icon/ArrowUpIcon';
import ArrowDownIcon from '~/components/icon/ArrowDownIcon';
import StarIcon from '~/components/icon/StarIcon';
import {LanguageType} from '../../share/constant';

interface PropsType {
    font: FontItem;
    hide?: boolean;
    language?: LanguageType;
}

const FontListItem = ({font, hide = false, language = 'EN'}: PropsType) => {
    const {fontListStore} = useStores();
    const singleStyle = font.styles.length === 1;
    const [folded, seFolded] = useState(true);
    return (
        <FontItemWrap hide={hide}>
            <FontFamilyItem>
                <FlexRowStartEndLayout>
                    <StarButton onClick={() => fontListStore.markOrUnmark(font.family)}>
                        {font.isMarked ? <StarIcon fill="#1E1E1E" /> : <StarIcon />}
                    </StarButton>
                    <FoldButton hide={singleStyle} onClick={() => seFolded(!folded)}>
                        {folded ? <ArrowIcon /> : <ArrowDownIcon />}
                    </FoldButton>
                    <Text>
                        {font.family}
                        {singleStyle && ` ${font.styles[0]}`}
                    </Text>
                </FlexRowStartEndLayout>
                <FlexRowStartEndLayout>
                    <Text right={12} fontFamily={font.family}>
                        {language === 'EN' ? 'Sample' : '字体样式'}
                    </Text>
                </FlexRowStartEndLayout>
            </FontFamilyItem>
            {!folded &&
                font.styles.map((style) => (
                    <FontStyleItem key={font.family + style}>
                        <FlexRowStartEndLayout>
                            <Text left={60}>{style}</Text>
                        </FlexRowStartEndLayout>
                        <FlexRowStartEndLayout>
                            <Text right={12} fontFamily={font.family} fontStyle={style}>
                                {language === 'EN' ? 'Sample' : '字体样式'}
                            </Text>
                        </FlexRowStartEndLayout>
                    </FontStyleItem>
                ))}
        </FontItemWrap>
    );
};

const FontItemWrap = styled.div<{hide?: boolean}>`
    display: ${(props) => (props.hide ? 'none' : 'block')};
    width: 100%;

    :hover {
        background-color: #f5f5f5;
    }
`;

const FlexRowLayout = styled.div`
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FlexRowStartEndLayout = styled(FlexRowLayout)``;

const FontFamilyItem = styled(FlexRowLayout)``;

const FontStyleItem = styled(FlexRowLayout)``;

const IconButton = styled.span<{hide?: boolean}>`
    visibility: ${(props) => (props.hide ? 'hidden' : 'visible')};
    height: 28px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
`;

const StarButton = styled(IconButton)`
    margin-left: 8px;
`;

const FoldButton = styled(IconButton)`
    margin-left: 4px;
`;

const Text = styled.span<{
    left?: number;
    right?: number;
    fontFamily?: string;
    fontStyle?: string;
}>`
    height: 28px;
    margin-left: ${(props) => props.left ?? 6}px;
    margin-right: ${(props) => props.right ?? 0}px;

    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;

    font-family: ${(props) => `${props.fontFamily},` ?? ''} Inter, sans-serif;
    font-weight: ${(props) => {
        let result = 'normal';
        switch (props.fontStyle?.toLowerCase() ?? '') {
            case 'bold':
                result = 'bold';
                break;
            default:
                break;
        }
        return result;
    }};
    font-size: 12px;
`;

export default observer(FontListItem);
