export class Article {
    id: string;
    title: string;
    content: string;
    views: number;
    rating: number;
    date: Date;
    difficulty: difficulties;
    language: languages;
}

export enum difficulties {
    Easy,
    Medium,
    Hard
};

export enum languages {
    CSharp,
    HTML_CSS,
    JS_TS
}