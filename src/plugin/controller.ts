import {MessageType} from '../share/constant';

const STORAGE_NAME = 'favStorage';

figma.showUI(__html__, {
    width: 320,
    height: 398,
});

let currentTextSelection = null;
if (figma.currentPage.selection.length === 1 && figma.currentPage.selection[0].type === 'TEXT') {
    currentTextSelection = figma.currentPage.selection[0];
    figma.ui.postMessage({
        type: MessageType.SELECTION_CHANGE,
        data: {
            layer: JSON.stringify(currentTextSelection?.fontName),
        },
    });
}

figma.on('selectionchange', () => {
    if (figma.currentPage.selection.length === 1 && figma.currentPage.selection[0].type === 'TEXT') {
        currentTextSelection = figma.currentPage.selection[0];
    } else {
        currentTextSelection = null;
    }
    figma.ui.postMessage({
        type: MessageType.SELECTION_CHANGE,
        data: {
            layer: JSON.stringify(currentTextSelection?.fontName),
        },
    });
});

Promise.all([figma.listAvailableFontsAsync(), figma.clientStorage.getAsync(STORAGE_NAME)]).then(
    ([fontList, storage]) => {
        const favStorage = storage != null ? new Set(JSON.parse(storage)) : new Set();
        figma.ui.postMessage({
            type: MessageType.FONT_LIST_LOADED,
            data: {
                fontList: fontList,
                favStorage: JSON.parse(storage),
            },
        });

        figma.ui.onmessage = (msg) => {
            if (msg.type === MessageType.ADD_OR_REMOVE_MARKED_FONT) {
                addOrRemoveFavFont(msg.data.family);
            }
            if (msg.type === MessageType.FONT_CLICK && currentTextSelection != null) {
                figma.loadFontAsync(msg.data as FontName).then(() => {
                    currentTextSelection.fontName = msg.data as FontName;
                });
            }
        };

        function addOrRemoveFavFont(font: string) {
            if (favStorage.has(font)) {
                favStorage.delete(font);
            } else {
                favStorage.add(font);
            }
            figma.clientStorage.setAsync(STORAGE_NAME, JSON.stringify([...favStorage])).then(() => {
                console.log(JSON.stringify([...favStorage]));
            });
        }
    }
);
