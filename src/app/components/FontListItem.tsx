import * as React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {FontItem, FontName} from '~/models/Font';
import useStores from '~/hooks/useStores';
import ArrowIcon from '~/components/icon/ArrowUpIcon';
import ArrowDownIcon from '~/components/icon/ArrowDownIcon';
import StarIcon from '~/components/icon/StarIcon';
import {LanguageType} from '../../share/constant';

interface PropsType {
    font: FontItem;
    hide?: boolean;
    language?: LanguageType;
    currentFontName?: FontName;
}

const FontListItem = ({font, hide = false, language = 'EN', currentFontName = null}: PropsType) => {
    const active = currentFontName !== null;
    const isCurrent = active && font.family === currentFontName.family;
    const {fontListStore} = useStores();
    const singleStyle = font.styles.length === 1;
    const [folded, seFolded] = useState(true);
    // const click = (fontName) => {
    //     parent.postMessage({
    //         pluginMessage: {
    //             type: MessageType.SELECTION_CHANGE,
    //             data: fontName
    //         }
    //     }, '*')
    // }
    return (
        <FontItemWrap hide={hide}>
            <FontFamilyItem selected={isCurrent}>
                <FlexRowStartEndLayout>
                    <StarButton onClick={() => fontListStore.markOrUnmark(font.family)}>
                        {font.isMarked ? (
                            <StarIcon fill={isCurrent ? '#FFF' : '#1E1E1E'} stroke={isCurrent ? '#FFF' : '#1E1E1E'} />
                        ) : (
                            <StarIcon stroke={isCurrent ? '#FFF' : '#1E1E1E'} />
                        )}
                    </StarButton>
                    <FoldButton hide={singleStyle} onClick={() => seFolded(!folded)}>
                        {folded ? (
                            <ArrowIcon fill={isCurrent ? '#FFF' : '#333'} />
                        ) : (
                            <ArrowDownIcon fill={isCurrent ? '#FFF' : '#333'} />
                        )}
                    </FoldButton>
                    <Text active={active} selected={isCurrent}>
                        {font.family}
                        {singleStyle && ` ${font.styles[0]}`}
                    </Text>
                </FlexRowStartEndLayout>
                <FlexRowStartEndLayout>
                    <Text right={12} fontFamily={font.family} active={active} selected={isCurrent}>
                        {language === 'EN' ? 'Sample' : '字体样式'}
                    </Text>
                </FlexRowStartEndLayout>
            </FontFamilyItem>
            {!folded &&
                font.styles.map((style) => {
                    const isStyleCurrent =
                        active && font.family === currentFontName.family && style === currentFontName.style;
                    return (
                        <FontStyleItem key={font.family + style} selected={isStyleCurrent}>
                            <FlexRowStartEndLayout>
                                <Text left={60} active={active} selected={isStyleCurrent}>
                                    {style}
                                </Text>
                            </FlexRowStartEndLayout>
                            <FlexRowStartEndLayout>
                                <Text
                                    right={12}
                                    fontFamily={font.family}
                                    fontStyle={style}
                                    active={active}
                                    selected={isStyleCurrent}
                                >
                                    {language === 'EN' ? 'Sample' : '字体样式'}
                                </Text>
                            </FlexRowStartEndLayout>
                        </FontStyleItem>
                    );
                })}
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

const FontFamilyItem = styled(FlexRowLayout)<{selected?: boolean}>`
    background-color: ${(props) => (props.selected ? '#18A0FB' : '')};

    :hover {
        background-color: ${(props) => (props.selected ? '#189dfd' : '#f5f5f5')};
    }
`;

const FontStyleItem = styled(FlexRowLayout)<{selected?: boolean}>`
    background-color: ${(props) => (props.selected ? '#18A0FB' : '')};

    :hover {
        background-color: ${(props) => (props.selected ? '#189dfd' : '#f5f5f5')};
    }
`;

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
    active: boolean;
    selected: boolean;
}>`
    height: 28px;
    line-height: 28px;
    margin-left: ${(props) => props.left ?? 6}px;
    margin-right: ${(props) => props.right ?? 0}px;

    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;
    cursor: ${(props) => (props.active ? 'pointer' : 'auto')};

    color: ${(props) => (props.active ? (props.selected ? '#FFF' : '#000') : '#B2B2B2')};
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
