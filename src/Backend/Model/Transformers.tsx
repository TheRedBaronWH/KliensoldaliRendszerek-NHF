import { Manga } from "./Api/Manga";
import { ChapterModel, MangaModel, VolumeModel } from "./Model";
import { Volume } from "./Api/Volume";
import { loadMangaContent, loadMangaCover } from "../Api/MangaLoader";
import { Chapter } from "./Api/Chapter";
import { loadPages } from "../Api/ChapterLoader";

/** 
 * Since the API returns information in a slightly inconvienient format (at least for our purposes),
 * we need to transform the raw data into our internal models.
 * 
 * @param data: Manga - Raw manga data from the API
 * 
 * @returns a MangaModel representing the transformed manga data
 **/
export async function toManga(data: Manga): Promise<MangaModel> {
    let id = data.id;
    let title = data.attributes.title.en;
    let description = data.attributes.description.en;
    let author = findRelationship(data, "author") || "Unknown Author";
    let artist = findRelationship(data, "artist") || "Unknown Artist";
    let cover = await loadMangaCover(id, findRelationship(data, "cover_art")) || null;
    let volumes = toVolumes(await loadMangaContent(id)); 

    return new MangaModel(
        id,
        title,
        author,
        artist,
        description,
        cover,
        volumes
    );
}

/** 
 * Finds the ID of a related entity (like author, artist, or cover art) from the manga relationships.
 * 
 * @param data: Manga - Raw manga data from the API
 * @param type: string - The type of relationship to find (for example: "author", "artist" or "cover_art" - these are the 3 we actually need)
 * 
 * @returns a string representing the ID of the related entity, or null if not found
 **/
function findRelationship(data: Manga, type: string): string | null {
    for (let rel of data.relationships) {
        if (rel.type === type) {
            return rel.id;
        }
    }
    return null;
}

/** 
 * Since the API returns information in a slightly inconvienient format (at least for our purposes),
 * we need to transform the raw data into our internal models.
 * 
 * @param volumes: Volume[] - Raw volume data from the API
 * 
 * @returns a VolumeModel[] representing the transformed volume data
 **/
function toVolumes(volumes: Volume[]): VolumeModel[] {
    let volumeModels: VolumeModel[] = [];
    for (let volume of volumes) {
        let chapters = volume.chapters.map(chapter => {
            return chapter.id;
        });
        volumeModels.push(new VolumeModel(volume.volume, chapters));
    }
    return volumeModels;
}

/** 
 * Since the API returns information in a slightly inconvienient format (at least for our purposes),
 * we need to transform the raw data into our internal models.
 * 
 * @param data: Chapter - Raw chapter data from the API
 * 
 * @returns a ChapterModel representing the transformed chapter data
 **/
export async function toChapter(data: Chapter): Promise<ChapterModel> {
    let id = data.id;
    let title = data.attributes.title;
    let chapterNumber = data.attributes.chapter;
    
    let chapterPagesResponse = await loadPages(id);
    let baseUrl = chapterPagesResponse.baseUrl || "";
    let hash = chapterPagesResponse.chapter.hash;
    let pageIds = chapterPagesResponse.chapter.data;
    let dataSaverPageIds = chapterPagesResponse.chapter.dataSaver;

    return {
        id,
        chapterNumber,
        title,
        baseUrl,
        hash,
        pageIds,
        dataSaverPageIds                
    }
}
    