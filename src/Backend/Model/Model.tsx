export class MangaModel {
    constructor(
        readonly id: string, //Manga.id
        readonly title: string, //Manga.relationships.type = title
        readonly author: string, //Manga.relationships.type = author
        readonly artist: string, //Manga.relationships.type = artist
        readonly description: string, //Manga.attributes.description.en
        readonly cover: string, //Manga.relationships.type = cover
        readonly volumes: VolumeModel[] //Volume
    ) { }
}

export class VolumeModel {
    constructor(
        readonly volumeNumber: string, //Volume.volume
        readonly chapterIds: string[] //Chapter
    ) { }
}

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

export class SavedManga {
    constructor(
        readonly mangaId: string,
        readonly mangaCover: string, 
        readonly mangaTitle: string,
    ) { }
}