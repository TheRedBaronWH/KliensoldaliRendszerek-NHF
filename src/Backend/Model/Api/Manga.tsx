//api.mangadex.dev/manga/id

export interface MangaResponse {
    data: Manga;
}

export interface Manga {
    id: string;
    attributes: MangaAttributes;
    relationships: Relationship[];
}

export interface MangaAttributes {
    title: MangaTitle
    description: MangaDescription
    contentRating: string
}

export interface MangaTitle {
    en: string
}

export interface MangaDescription {
    en: string
}

export interface Relationship {
    id: string
    type: string
}

//uploads.mangadex.org/cover/ relationship type=cover_art

export interface CoverResponse {
    data: Cover;
}

export interface Cover {
    attributes: CoverAttributes;
}

export interface CoverAttributes {
    fileName: string;
}