//api.mangadex.dev/chapter/id

export interface ChapterResponse {
    data: Chapter;
}

export interface Chapter {
    id: string
    attributes: ChapterAttributes
    relationships: Relationship[]
}

export interface ChapterAttributes {
    volume: string,
    chapter: string,
    title: string,
    pages: number
}

export interface Relationship {
    id: string
    type: string
}

//api.mangadex.dev/at-home/server/id

export interface ChapterPagesResponse {
    baseUrl: string,
    chapter: ChapterPages
}

export interface ChapterPages {
    hash: string,
    data: string[],
    dataSaver: string[]
}

//baseUrl/data/hash/data[i]
//or
//baseUrl/data-saver/hash/dataSaver[i]

