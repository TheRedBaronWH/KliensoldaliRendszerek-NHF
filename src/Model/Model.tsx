export class Manga {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly author: string,
        readonly cover: any,
        readonly volumes: Volume[]
    ) { }
}

export class Volume {
    constructor(
        readonly id: string,
        readonly volumeNumber: number,
        readonly chapters: Chapter[]
    ) { }
}

export class Chapter {
    constructor(
        readonly id: string,
        readonly chapterNumber: number,
        readonly title: string,
        readonly pages: Page[]
    ) { }
}

export class Page {
    constructor(
        readonly id: string,
        readonly image: any
    ) { }
}