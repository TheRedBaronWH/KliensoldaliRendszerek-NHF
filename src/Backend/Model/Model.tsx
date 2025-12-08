/**
 * Model for MangaDex data.
 * 
 * @param id : string - Manga's ID
 * @param title : string - Manga's title
 * @param author : string - Manga's author
 * @param artist : string - Manga's artist
 * @param description : string - Manga's description
 * @param cover : string - Manga's cover image URL
 * @param volumes : VolumeModel[] - List of VolumeModels associated with the manga
 */
export class MangaModel {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly author: string,
        readonly artist: string,
        readonly description: string,
        readonly cover: string,
        readonly volumes: VolumeModel[]
    ) { }
}

/**
 * Model for a volume in a manga
 * 
 * @param volumeNumber : string - Volume's number
 * @param chapterIds : string[] - List of Chapter IDs in the volume
 */
export class VolumeModel {
    constructor(
        readonly volumeNumber: string, //Volume.volume
        readonly chapterIds: string[] //Chapter
    ) { }
}

/**
 * Model for a chapter in a manga
 * 
 * @param id : string - Chapter's ID
 * @param chapterNumber : string - Chapter's number
 * @param title : string - Chapter's title
 * @param baseUrl : string - Base URL for the chapter's pages
 * @param hash : string - Hash for the chapter's pages
 * @param pageIds : string[] - List of page IDs for the chapter
 * @param dataSaverPageIds : string[] - List of data saver page IDs for the chapter
 * @param externalUrl : string - Optional external URL for the chapter, needed if the actual chapter is not hosted on MangaDex
 */
export class ChapterModel {
    constructor(
        readonly id: string, //VolumeChapter.id
        readonly chapterNumber: string, //VolumeChapter.chapter
        readonly title: string, //Chapter.attributes.title
        readonly baseUrl: string,
        readonly hash: string,
        readonly pageIds: string[], //ChapterPages
        readonly dataSaverPageIds: string[], //ChapterPages
        readonly externalUrl?: string //Chapter.attributes.externalUrl
    ) { }
}

/**
 * Helper structure for effectively storing a manga in LocalStorage
 * The API loads the actual manga once the entry in the Library is opened, which will automatically refresh this (in case a new cover art is available, etc.)
 * 
 * @param mangaId - Manga's ID
 * @param mangaCover - Manga's cover image URL
 * @param mangaTitle - Manga's title
 */
export class SavedManga {
    constructor(
        readonly mangaId: string,
        readonly mangaCover: string, 
        readonly mangaTitle: string,
    ) { }
}