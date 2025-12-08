/**
 * The response structure for manga search request from the MangaDex API.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * ------------------------------------------------------------------------------------
 * 
 * @link fetched from api.mangadex.dev/manga?title={title}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface MangaSearchResponse {
    data: Manga[];
}

/**
 * The response structure for a manga request in the MangaDex API.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link fetched from api.mangadex.dev/manga/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface MangaResponse {
    data: Manga;
}

/**
 * The structure representing a manga in the MangaDex API, as provided in the response.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/manga/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface Manga {
    id: string;
    attributes: MangaAttributes;
    relationships: Relationship[];
}

/**
 * The attributes of a manga in the MangaDex API, as provided in the response.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/manga/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface MangaAttributes {
    title: MangaTitle
    description: MangaDescription
    contentRating: string
}

/**
 * The title structure in the MangaDex API, as provided in the response.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/manga/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface MangaTitle {
    en: string
}


/**
 * The description structure in the MangaDex API, as provided in the response.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/manga/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface MangaDescription {
    en: string
}

/**
 * The relationship structure in the MangaDex API, as provided in the response.
 * It's a blueprint, for the way the API return important information, like author's or manga cover's id.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/manga/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface Relationship {
    id: string
    type: string
}

/**
 * The response structure for a manga cover request in the MangaDex API.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link fetched from api.mangadex.dev/cover/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface CoverResponse {
    data: Cover;
}

/**
 * The structure representing a manga cover in the MangaDex API, as provided in the response.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/cover/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface Cover {
    attributes: CoverAttributes;
}

/**
 * The attributes of a manga cover in the MangaDex API, as provided in the response.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/cover/{id}
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface CoverAttributes {
    fileName: string;
}