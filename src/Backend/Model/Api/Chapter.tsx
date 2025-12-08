/**
 * The response structure for a chapter request from the MangaDex API.
 * It contains the chapter data including its attributes and relationships.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link fetched from api.mangadex.dev/chapter/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface ChapterResponse {
    data: Chapter;
}

/**
 * The structure representing a chapter in the MangaDex API, as provided in the response.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/chapter/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface Chapter {
    id: string
    attributes: ChapterAttributes
    relationships: Relationship[]
}

/**
 * The attributes of a chapter in the MangaDex API, as provided in the response.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/chapter/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface ChapterAttributes {
    volume: string,
    chapter: string,
    title: string,
    pages: number,
    externalUrl: string | null,
}

/**
 * The relationship structure in the MangaDex API, as provided in the response.
 * It's a blueprint, for the way the API return important information, like parent manga's id.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/chapter/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface Relationship {
    id: string
    type: string
}

/**
 * The response structure for chapter pages request from the MangaDex API.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link fetched from api.mangadex.dev/at-home/server/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface ChapterPagesResponse {
    baseUrl: string,
    chapter: ChapterPages
}

/**
 * The structure representing a chapter's pages in the MangaDex API, as provided in the response.
 * 
 * The page's source can be constructed using the baseUrl, hash, and data/dataSaver arrays., in the following ways:
 * 
 * "baseUrl/data/hash/data[i]"
 * or
 * "baseUrl/data-saver/hash/dataSaver[i]"
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/at-home/server/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface ChapterPages {
    hash: string,
    data: string[],
    dataSaver: string[]
}



