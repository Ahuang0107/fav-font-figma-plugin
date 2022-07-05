import * as React from 'react';
import {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import useStores from '~/hooks/useStores';
import FontListItem from '~/components/FontListItem';
import IconButton from '~/components/button/IconButton';
import StarIcon from '~/components/icon/StarIcon';
import Select from '~/components/select/Select';
import {MessageType} from '../../share/constant';

const Home = () => {
    const {fontListStore} = useStores();
    const [starSelected, setStarSelected] = useState(false);
    const options = ['字体分类选择：暂未实现该功能'];
    const [, setSelected] = useState<string>(options[0]);
    const [currentLayer, setCurrentLayer] = useState<{id: string} | null>(null);
    useEffect(() => {
        window.onmessage = (event) => {
            const {type} = event.data.pluginMessage;
            if (type === MessageType.FONT_LIST_LOADED) {
                const {data} = event.data.pluginMessage;
                fontListStore.initFontList(data.fontList);
                fontListStore.initMarkedFonts(data.favStorage);
            } else if (type === MessageType.SELECTION_CHANGE) {
                const {data} = event.data.pluginMessage;
                setCurrentLayer(data.layer);
            }
        };
    }, []);

    return (
        <Container>
            <SelectContainer>
                <Select options={options} onChange={(v) => setSelected(v)} />
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
                        hide={starSelected && !font.isMarked}
                        active={currentLayer !== null}
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

const ListContainer = styled.div`
    margin-top: 12px;
    flex: auto;
    width: 100%;
    border: #f0f0f0 solid 1px;
    border-radius: 2px;

    overflow-y: scroll;
`;

export default observer(Home);
