import {action, computed, makeObservable, observable} from 'mobx';
import {Font, FontItem} from '~/models/Font';

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
        fontList.forEach((font) => {
            if (currentFamily != null && currentFamily !== font.fontName.family) {
                this.fontList.push({
                    family: currentFamily,
                    styles,
                    isMarked: false,
                });
                styles = [];
            }
            currentFamily = font.fontName.family;
            styles.push(font.fontName.style);
        });
        this.fontList.push({
            family: currentFamily,
            styles,
            isMarked: false,
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
