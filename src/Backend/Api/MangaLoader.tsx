import { isApiLogging, isTryWithOrgAsWell } from "../..";
import { CoverResponse, MangaResponse, MangaSearchResponse } from "../Model/Api/Manga";
import { RawVolumesResponse, RawVolumesResponseToVolumesResponse, Volume, VolumeResponse } from "../Model/Api/Volume";
import { MangaModel, SavedManga } from "../Model/Model";
import { toManga, toSavedManga } from "../Model/Transformers";

/** 
 * Looks for a manga's data from the MangaDex API based on the provided manga name.
 * 
 * @param name - Manga's name
 * 
 * @returns a MangaModel, or null if failed
 * 
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 **/
export async function searchForManga(name: string): Promise<SavedManga | null> {
    const url = "https://api.mangadex.dev/manga?title=";
    const orgUrl = "https://api.mangadex.org/manga?title=";

    let manga = await fetchByName(url, name);
    if (manga) {
        return manga;
    }
    else {
        if (!isTryWithOrgAsWell()) {
            return null;
        }
        console.log("Trying with .org endpoint");
        let manga = await fetchByName(orgUrl, name);
        return manga;
    }
}

async function fetchByName(url: string, name: string): Promise<SavedManga | null> {
    try {
        let response = await fetch(url + name);
        if (!response.ok) {
            console.error(`Failed to fetch manga (${name}): ${response.statusText}`);
            return null;
        }

        if (isApiLogging()) console.log(url + name);

        let data = await response.json() as MangaSearchResponse;
        return toSavedManga(data.data);
    }
    catch (error) {
        console.error(`Error loading manga (${name}): ${error}`);
        return null;
    }
}

/** 
 * Loads a manga's data from the MangaDex API based on the provided manga ID.
 * this data includes details such as title, author, description, and other relevant information about the manga.
 * 
 * @param Id - Manga's ID
 * 
 * @returns a MangaModel, or null if failed
 * 
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 **/
export async function loadManga(Id: string): Promise<MangaModel | null> {
    //await connect();

    const url = "https://api.mangadex.dev/manga/";
    const orgUrl = "https://api.mangadex.org/manga/";

    let manga = await fetchById(url, Id);
    if (manga) {
        return manga;
    }
    else {
        if (!isTryWithOrgAsWell()) {
            return null;
        }
        console.log("Trying with .org endpoint");
        let manga = await fetchById(orgUrl, Id);
        return manga;
    }
}

async function fetchById(url: string, Id: string): Promise<MangaModel | null> {
    try {
        let response = await fetch(url + Id);
        if (!response.ok) {
            console.error(`Failed to fetch manga (${Id}): ${response.statusText}`);
            return null;
        }

        if (isApiLogging()) console.log(url + Id);

        let data = await response.json() as MangaResponse;
        return toManga(data.data);
    }
    catch (error) {
        console.error(`Error loading manga (${Id}): ${error}`);
        return null;
    }
}

/** 
 * Loads a manga's content from the MangaDex API based on the provided manga ID.
 * this content includes a list of volumes and chapters in said volumes. 
 * for simplicity, only English translated volumes are fetched.
 * 
 * @param Id - Manga's ID
 * 
 * @returns a List of Volumes, or null if failed
 * 
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 **/
export async function loadMangaContent(Id: string): Promise<Volume[] | null> {
    const url = "https://api.mangadex.dev/manga/";
    const orgUrl = "https://api.mangadex.org/manga/";

    let content = await fetchContent(url, Id);
    if (content) {
        return content;
    }
    else {
        if (!isTryWithOrgAsWell()) {
            return null;
        }
        console.log("Trying with .org endpoint");
        let content = await fetchContent(orgUrl, Id);
        return content;
    }
}

async function fetchContent(url: string, Id: string): Promise<Volume[] | null> {
    const aggregate = "/aggregate?translatedLanguage[]=en";

    try {
        let response = await fetch(url + Id + aggregate);
        if (!response.ok) {
            console.log(`Failed to fetch manga content (${Id}): ${response.statusText}`);
            return null;
        }

        if (isApiLogging()) console.log(url + Id + aggregate);

        let data = await response.json() as RawVolumesResponse;
        let fixedData = RawVolumesResponseToVolumesResponse(data);
        return fixedData.volumes;
    }
    catch (error) {
        console.error(`Error loading manga content (${Id}): ${error}`);
        return null;
    }
}

/** 
 * Loads a manga's cover art throught the MangaDex API based on the provided manga ID and cover ID.
 * 
 * @param mangaId - Manga's ID
 * @param coverId - Cover's ID
 * 
 * @returns a string: source URL of the cover image or null if failed
 * 
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 **/
export async function loadMangaCover(mangaId: string, coverId: string): Promise<string | null> {
    const url = "https://api.mangadex.dev/cover/";
    const orgUrl = "https://api.mangadex.org/cover/";

    let cover = await fetchCover(url, mangaId, coverId);
    if (cover) {
        return cover;
    }
    else {
        if (!isTryWithOrgAsWell()) {
            return null;
        }
        console.log("Trying with .org endpoint");
        let cover = await fetchCover(orgUrl, mangaId, coverId);
        return cover;
    }
}

async function fetchCover(url: string, mangaId: string, coverId: string): Promise<string | null> {
    const coverUrl = "https://uploads.mangadex.org/covers/";

    try {
        let coverResponse = await fetch(url + coverId);
        if (!coverResponse.ok) {
            console.error(`Failed to fetch manga cover (${mangaId}/${coverId}): ${coverResponse.statusText}`);
            return null;
        }

        if (isApiLogging()) console.log(url + coverId);

        let coverData = await coverResponse.json() as CoverResponse;
        let fileName = coverData.data.attributes.fileName;

        return coverUrl + mangaId + "/" + fileName;
    }
    catch (error) {
        console.error(`Error loading manga cover (${mangaId}/${coverId}): ${error}`);
        return null;
    }
}