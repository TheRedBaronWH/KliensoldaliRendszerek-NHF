/**
 * The response structure for manga volumes request from the MangaDex API.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link fetched from api.mangadex.dev/manga/id/aggregate
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface VolumeResponse {
    volumes: Volume[];
}

/**
 * The structure representing a volume in the MangaDex API, as provided in the response.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/manga/id/aggregate
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface Volume {
    volume: string,
    count: number,
    chapters: VolumeChapter[];
}

/**
 * The structure representing a chapter within a volume in the MangaDex API, as provided in the response.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/manga/id/aggregate
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface VolumeChapter {
    chapter: string
    id: string
    isUnavailable: boolean
    others: string[]
    count: number
}

/**
 * The raw response structure for manga volumes request from the MangaDex API.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link fetched from api.mangadex.dev/manga/id/aggregate
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface RawVolumesResponse{
    volumes: Record<string, RawVolume>;
}

/**
 * Since the Raw response is in a Record form, we need to convert it to our VolumeResponse structure. 
 * 
 * @param rawResponse - The raw response from the API
 * @returns The converted VolumeResponse object
 */
export function RawVolumesResponseToVolumesResponse(rawResponse: RawVolumesResponse): VolumeResponse {
    let volumesArray: Volume[] = [];
    for (let volumeKey in rawResponse.volumes) {
        volumesArray.push(RawVolumetoVolume(rawResponse.volumes[volumeKey]));
    }
    return { volumes: volumesArray };
}

/**
 * The structure representing a volume in the MangaDex API, as provided in the raw response.
 * 
 * Only contains the data relevant to this app; Actual response returns much more information.
 * 
 * -------------------------------------------------------------------------------------
 * 
 * @link part of the response fetched from api.mangadex.dev/manga/id/aggregate
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 */
export interface RawVolume {
    volume: string,
    count: number,
    chapters: Record<string, VolumeChapter>;
}

/**
 * Converts a RawVolume object to a Volume object.
 * Helper function for the RawVolumesResponseToVolumesResponse() function.
 * 
 * @param rawVolume - The raw volume object from the API
 * @returns The converted Volume object
 */
function RawVolumetoVolume(rawVolume: RawVolume): Volume {
    let chaptersArray: VolumeChapter[] = [];
    for (let chapterKey in rawVolume.chapters) {
        chaptersArray.push(rawVolume.chapters[chapterKey]);
    }
    return {
        volume: rawVolume.volume,
        count: rawVolume.count,
        chapters: chaptersArray
    };
}