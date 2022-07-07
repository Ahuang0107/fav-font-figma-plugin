import {action, computed, makeObservable, observable} from 'mobx';
import {Font, FontItem} from '~/models/Font';
import {MessageType, microsoft_windows, typefaceGroups} from '../../share/constant';

export class FontListStore {
    // 会存储加载来的所有字体，是按照字体family group by过的
    fontList: FontItem[] = [];

    // 存储被mark的字体的family名称
    markedFonts: string[] = [];

    constructor() {
        makeObservable(this, {
            fontList: observable,
            markedFonts: observable,
            initFontList: action,
            initMarkedFonts: action,
            markOrUnmark: action,
            markedFontList: computed,
        });
    }

    initFontList = (fontList: Font[]) => {
        this.fontList = [];
        // 默认系统返回的font list是排序好的
        let currentFamily = null;
        let styles = [];
        let group = [];
        fontList.forEach((font) => {
            if (currentFamily != null && currentFamily !== font.fontName.family) {
                typefaceGroups.forEach((it) => {
                    if (it.value.indexOf(currentFamily) > -1) {
                        group.push(it.key);
                    }
                });
                this.fontList.push({
                    family: currentFamily,
                    styles,
                    isMarked: false,
                    group: group,
                    local: microsoft_windows.indexOf(currentFamily) > -1,
                });
                styles = [];
                group = [];
            }
            currentFamily = font.fontName.family;
            styles.push(font.fontName.style);
        });
        typefaceGroups.forEach((it) => {
            if (it.value.indexOf(currentFamily) > -1) {
                group.push(it.key);
            }
        });
        this.fontList.push({
            family: currentFamily,
            styles,
            isMarked: false,
            group: group,
            local: microsoft_windows.indexOf(currentFamily) > -1,
        });
    };

    initMarkedFonts = (fonts: string[]) => {
        this.markedFonts = fonts;
        fonts.forEach((font) => {
            this.fontList.find((item) => item.family === font).isMarked = true;
        });
    };

    markOrUnmark = (font: string) => {
        const index = this.markedFonts.indexOf(font);
        if (index === -1) {
            this.markedFonts = [...this.markedFonts, font];
            this.fontList.find((item) => item.family === font).isMarked = true;
        } else {
            const {length} = this.markedFonts;
            this.markedFonts = [...this.markedFonts.slice(0, index), ...this.markedFonts.slice(index + 1, length)];
            this.fontList.find((item) => item.family === font).isMarked = false;
        }
        parent.postMessage(
            {
                pluginMessage: {
                    type: MessageType.ADD_OR_REMOVE_MARKED_FONT,
                    data: JSON.stringify(this.markedFonts),
                },
            },
            '*'
        );
    };

    get markedFontList(): FontItem[] {
        const result = [];
        this.fontList.forEach((font) => {
            if (font.isMarked) result.push(font);
        });
        return result;
    }
}

export const fontListStore = new FontListStore();
