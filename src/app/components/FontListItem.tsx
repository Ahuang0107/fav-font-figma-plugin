import * as React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {FontItem, FontName} from '~/models/Font';
import useStores from '~/hooks/useStores';
import ArrowIcon from '~/components/icon/ArrowUpIcon';
import ArrowDownIcon from '~/components/icon/ArrowDownIcon';
import StarIcon from '~/components/icon/StarIcon';
import {LanguageType, MessageType} from '../../share/constant';

interface PropsType {
    font: FontItem;
    hide?: boolean;
    language?: LanguageType;
    currentFontName?: FontName;
    onClick: (fontName: FontName, currentFontName: FontName) => void;
}

const FontListItem = ({font, hide = false, language = 'EN', currentFontName = null, onClick}: PropsType) => {
    const active = currentFontName !== null;
    const isCurrent = active && font.family === currentFontName.family;
    const {fontListStore} = useStores();
    const singleStyle = font.styles.length === 1;
    const [folded, seFolded] = useState(true);
    const fontClick = (fontName) => {
        parent.postMessage(
            {
                pluginMessage: {
                    type: MessageType.FONT_CLICK,
                    data: fontName,
                },
            },
            '*'
        );
    };
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
                    <Text
                        active={active}
                        selected={isCurrent}
                        onClick={() => {
                            if (active) {
                                const fontName = {family: font.family, style: font.styles[0]};
                                fontClick(fontName);
                                onClick(fontName, currentFontName);
                            }
                        }}
                    >
                        {font.family}
                        {singleStyle && ` ${font.styles[0]}`}
                    </Text>
                </FlexRowStartEndLayout>
                <FlexRowStartEndLayout>
                    <Text hide={!font.local} right={12} fontFamily={font.family} active={active} selected={isCurrent}>
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
                                <Text
                                    left={60}
                                    active={active}
                                    selected={isStyleCurrent}
                                    onClick={() => {
                                        if (active) {
                                            const fontName = {family: font.family, style: style};
                                            fontClick(fontName);
                                            onClick(fontName, currentFontName);
                                        }
                                    }}
                                >
                                    {style}
                                </Text>
                            </FlexRowStartEndLayout>
                            <FlexRowStartEndLayout>
                                <Text
                                    hide={!font.local}
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
`;

interface LayoutProps {
    readonly selected?: boolean;
}

interface LayoutChangeProps {
    readonly backgroundColor: string;
    readonly hoverBackgroundColor: string;
}

// FontFamilyItem和FontStyleItem都是基于此Component
const FlexRowLayout = styled.div.attrs<LayoutProps, LayoutChangeProps>(({selected}) => ({
    backgroundColor: selected ? '#18A0FB' : '',
    hoverBackgroundColor: selected ? '#189dfd' : '#f5f5f5',
}))<LayoutProps>`
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FlexRowStartEndLayout = styled(FlexRowLayout)``;

const FontFamilyItem = styled(FlexRowLayout)`
    background-color: ${(props) => props.backgroundColor};

    :hover {
        background-color: ${(props) => props.hoverBackgroundColor};
    }
`;

const FontStyleItem = styled(FlexRowLayout)`
    background-color: ${(props) => props.backgroundColor};

    :hover {
        background-color: ${(props) => props.hoverBackgroundColor};
    }
`;

interface HideProps {
    readonly hide?: boolean;
}

interface HideChangeProps {
    readonly visibility: string;
}

const IconButton = styled.span.attrs<HideProps, HideChangeProps>(({hide}) => ({
    visibility: hide ? 'hidden' : 'visible',
}))<HideProps>`
    visibility: ${(props) => props.visibility};
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

interface TextProps extends HideProps {
    readonly left?: number;
    readonly right?: number;
    readonly fontFamily?: string;
    readonly fontStyle?: string;
    readonly active: boolean;
    readonly selected: boolean;
}

interface TextChangeProps extends HideChangeProps {
    readonly marginLeft: string;
    readonly marginRight: string;
    readonly cursor: string;
    readonly color: string;
    readonly fontFamily: string;
}

// todo 这里用attrs的实际作用是什么，目前只是console建议使用才改的
const Text = styled.span.attrs<TextProps, TextChangeProps>((props) => ({
    marginLeft: `${props.left ?? 6}px`,
    marginRight: `${props.right ?? 0}px`,
    cursor: props.active ? 'pointer' : 'auto',
    color: props.active ? (props.selected ? '#FFF' : '#000') : '#B2B2B2',
    fontFamily: `${props.fontFamily + ',Inter, sans-serif' ?? 'Inter, sans-serif'}`,
    visibility: props.hide ? 'hidden' : 'visible',
}))<TextProps>`
    visibility: ${(props) => props.visibility};
    height: 28px;
    line-height: 28px;
    margin-left: ${({marginLeft}) => marginLeft};
    margin-right: ${({marginRight}) => marginRight};

    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;
    cursor: ${({cursor}) => cursor};

    color: ${({color}) => color};
    font-family: ${({fontFamily}) => fontFamily};
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export default observer(FontListItem);
