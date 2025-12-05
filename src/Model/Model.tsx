export class Manga {
    constructor(
        readonly id: string, //Manga.id
        readonly title: string, //Manga.relationships.type = title
        readonly author: string, //Manga.relationships.type = author
        readonly artist: string, //Manga.relationships.type = artist
        readonly description: string, //Manga.attributes.description.en
        readonly cover: any, //Manga.relationships.type = cover
        readonly volumes: Volume[] //Volume
    ) { }
}

export class Volume {
    constructor(
        readonly volumeNumber: string, //Volume.volume
        readonly chapters: Chapter[] //Chapter
    ) { }
}

export class Chapter {
    constructor(
        readonly id: string, //VolumeChapter.id
        readonly chapterNumber: number, //VolumeChapter.chapter
        readonly title: string, //Chapter.attributes.title
        readonly pages: Page[] //ChapterPages
    ) { }
}

export class Page {
    constructor(
        readonly id: string, //ChapterPages.data
        readonly idSaver: string, //ChapterPages.dataSaver
        readonly image: any
    ) { }
}

export class SavedManga {
    constructor(
        readonly mangaId: string,
        readonly mangaCover: any, 
        readonly mangaTitle: string,
    ) { }
}