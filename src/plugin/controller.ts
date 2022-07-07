import {MessageType} from '../share/constant';

const STORAGE_NAME = 'favStorage';

figma.showUI(__html__, {
    width: 400,
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
        console.log('init:' + storage);
        figma.ui.postMessage({
            type: MessageType.FONT_LIST_LOADED,
            data: {
                fontList: fontList,
                favStorage: storage,
            },
        });

        figma.ui.onmessage = (msg) => {
            if (msg.type === MessageType.ADD_OR_REMOVE_MARKED_FONT) {
                figma.clientStorage.setAsync(STORAGE_NAME, msg.data).then(() => {
                    console.log('store with: ' + msg.data);
                });
            }
            if (msg.type === MessageType.FONT_CLICK && currentTextSelection != null) {
                figma
                    .loadFontAsync(msg.data as FontName)
                    .then(() => {
                        currentTextSelection.fontName = msg.data as FontName;
                        figma.ui.postMessage({
                            type: MessageType.FONT_CHANGED,
                        });
                    })
                    .catch((reason) => {
                        console.log(reason);
                        figma.notify(reason, {error: true});
                        figma.ui.postMessage({
                            type: MessageType.SELECTION_CHANGE,
                            data: {
                                layer: JSON.stringify(currentTextSelection?.fontName),
                            },
                        });
                    });
            }
        };
    }
);
