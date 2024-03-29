import * as React from 'react';
import {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import useStores from '~/hooks/useStores';
import FontListItem from '~/components/FontListItem';
import IconButton from '~/components/button/IconButton';
import StarIcon from '~/components/icon/StarIcon';
import Select from '~/components/select/Select';
import {LanguageType, MessageType, typefaceGroups} from '../../share/constant';
import {FontName} from '~/models/Font';
import Spinner from '~/components/Spinner';
import LocateIcon from '~/components/icon/LocateIcon';
import ENIcon from '~/components/icon/ENIcon';
import CHIcon from '~/components/icon/CHIcon';

const Home = () => {
    const {fontListStore} = useStores();
    const [starSelected, setStarSelected] = useState(false);
    const [currentLayerFontName, setCurrentLayerFontName] = useState<FontName | null>(null);
    const [loading, setLoading] = useState(true);
    const languageButtonList: LanguageType[] = ['EN', 'EN_', 'CN', 'CN_'];
    const [language, setLanguage] = useState<number>(0);
    const [group, setGroup] = useState<string | null>(null);
    useEffect(() => {
        window.onmessage = (event) => {
            const {type} = event.data.pluginMessage;
            if (type === MessageType.FONT_LIST_LOADED) {
                const {data} = event.data.pluginMessage;
                fontListStore.initFontList(data.fontList);
                if (data.favStorage === null || data.favStorage === undefined) {
                    fontListStore.initMarkedFonts([]);
                } else {
                    fontListStore.initMarkedFonts(JSON.parse(data.favStorage));
                }
                setLoading(currentLayerFontName !== null);
            } else if (type === MessageType.SELECTION_CHANGE) {
                const {data} = event.data.pluginMessage;
                setCurrentLayerFontName(JSON.parse(data?.layer ?? null));
                setLoading(currentLayerFontName !== null);
            } else if (type === MessageType.FONT_CHANGED) {
                setLoading(currentLayerFontName !== null);
            }
        };
    }, []);

    return (
        <Container>
            {loading && (
                <LoadingCover onClick={(e) => e.stopPropagation()}>
                    <Spinner />
                </LoadingCover>
            )}
            <SelectContainer>
                <Select value={group} setValue={setGroup} options={typefaceGroups.map((it) => it.key)} />
                <Margin />
                <IconButton
                    active={language % 2 === 1}
                    onClick={() => {
                        setLanguage(language + 1);
                    }}
                >
                    {(() => {
                        switch (language % languageButtonList.length) {
                            case 0:
                                return <ENIcon />;
                            case 1:
                                return <ENIcon fill="#FFF" />;
                            case 2:
                                return <CHIcon />;
                            case 3:
                                return <CHIcon fill="#FFF" />;
                        }
                    })()}
                </IconButton>
                <Margin />
                <IconButton active={false} onClick={() => {}}>
                    <LocateIcon />
                </IconButton>
                <Margin />
                <IconButton active={starSelected} onClick={() => setStarSelected(!starSelected)}>
                    <StarIcon
                        fill={starSelected ? '#FFFFFF' : '#333333'}
                        stroke={starSelected ? '#FFFFFF' : '#333333'}
                    />
                </IconButton>
            </SelectContainer>
            <ListContainer>
                {fontListStore.fontList.map((font) => (
                    <FontListItem
                        font={font}
                        key={font.family}
                        hide={
                            (starSelected && !font.isMarked) ||
                            (!font.local && language % 2 === 1) ||
                            (group !== null && font.group.indexOf(group) === -1)
                        }
                        language={languageButtonList[language]}
                        currentFontName={currentLayerFontName}
                        onClick={(fontName, currentFontName) => {
                            setLoading(currentFontName !== null);
                            setCurrentLayerFontName(fontName);
                        }}
                    />
                ))}
            </ListContainer>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 16px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SelectContainer = styled.div`
    width: 100%;
    flex: 32px 0 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Margin = styled.span`
    width: 8px;
`;

const ListContainer = styled.div`
    margin-top: 12px;
    flex: auto;
    width: 100%;
    border: #f0f0f0 solid 1px;
    border-radius: 2px;
    position: relative;

    overflow-y: scroll;
`;

const LoadingCover = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    transition: all 1s linear;
    background-color: white;
    opacity: 0.6;
    user-select: none;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export default observer(Home);
