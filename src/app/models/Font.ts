export type Font = {
    fontName: FontName;
};

export type FontName = {
    family: string;
    style: string;
};

export type FontItem = {
    family: string;
    styles: string[];
    isMarked: boolean;
};
