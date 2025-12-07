import { isApiLogging } from "../..";
import { ChapterPagesResponse, ChapterResponse } from "../Model/Api/Chapter";
import { ChapterModel } from "../Model/Model";
import { toChapter } from "../Model/Transformers";

/** 
 * Loads a chapter's data from the MangaDex API based on the provided chapter ID.
 * 
 * @param Id - Chapter's ID
 * 
 * @returns a ChapterModel, or null if failed
 * 
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 **/
export async function loadChapter(Id: string): Promise<ChapterModel | null> {
    const url = `https://api.mangadex.dev/chapter/`;

    try {
        const response = await fetch(url + Id);
        if (!response.ok) {
            console.error(`Failed to fetch chapter: ${response.statusText}`);
            return null;
        }

        if(isApiLogging()) console.log(url + Id);

        const data = await response.json() as ChapterResponse;
        return toChapter(data.data);
        
    } 
    catch (error) {
        console.error(`Error loading chapter: ${error}`);
        return null;
    }
}

/** 
 * Loads a chapter's pages through the MangaDex API based on the provided chapter ID.
 * 
 * @param Id - Chapter's ID
 * 
 * @returns a ChapterPagesResponse, or null if failed
 * 
 * @see {@link https://api.mangadex.dev/docs/redoc.html} for API documentation
 **/
export async function loadPages(Id: string): Promise<ChapterPagesResponse | null> {
    const url = 'https://api.mangadex.dev/at-home/server/';

    try {
        const response = await fetch(url + Id);
        if (!response.ok) {
            console.error(`Failed to fetch chapter pages: ${response.statusText}`);
            return null;
        }

        if(isApiLogging()) console.log(url + Id);

        const chapter = await response.json() as ChapterPagesResponse;
        return chapter;
    }
    catch (error) {
        console.error(`Error loading chapter pages: ${error}`);
        return null;
    }
}