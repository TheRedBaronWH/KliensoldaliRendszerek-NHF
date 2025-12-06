import { CoverResponse, MangaResponse } from "../Model/Api/Manga";
import { RawVolumesResponse, RawVolumesResponseToVolumesResponse, Volume, VolumeResponse } from "../Model/Api/Volume";
import { MangaModel} from "../Model/Model";
import { toManga} from "../Model/Transformers";


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
    const url = "https://api.mangadex.dev/manga/";

    try {
        let response = await fetch(url + Id);
        if (!response.ok) {
            console.error("Failed to fetch manga:", response.statusText);
            return null;
        }
        //console.log(url + Id);
        let data = await response.json() as MangaResponse;
        return toManga(data.data);
    }
    catch (error) {
        console.error("Error loading manga:", error);
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
    const aggregate = "/aggregate?translatedLanguage[]=en";

    try {
        let response = await fetch(url + Id + aggregate);
        if (!response.ok) {
            console.error("Failed to fetch manga content:", response.statusText);
            return null;
        }
        //console.log(url + Id + aggregate);
        let data = await response.json() as RawVolumesResponse;
        let fixedData = RawVolumesResponseToVolumesResponse(data);
        return fixedData.volumes;
    }
    catch (error) {
        console.error("Error loading manga content:", error);
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
    const url = "https://api.mangadex.dev/cover"
    const coverUrl = "https://uploads.mangadex.org/covers/";

    try {
        let coverResponse = await fetch(url + "/" + coverId);
        if (!coverResponse.ok) {
            console.error("Failed to fetch manga cover:", coverResponse.statusText);
            return null;
        }
        //console.log(url + "/" + coverId);
        let coverData = await coverResponse.json() as CoverResponse;
        let fileName = coverData.data.attributes.fileName;

        return coverUrl + mangaId + "/" + fileName;
    }
    catch (error) {
        console.error("Error loading manga cover:", error);
        return null;
    }
}