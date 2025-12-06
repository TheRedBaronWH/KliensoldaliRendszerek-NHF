import "./PageReader.css";

import { SideBar } from "./SideBar";

export type ChapterControls = {
    title: string, chapter: string, page: number, pageSrc: string,
    onNextChapter: () => void, onPreviousChapter: () => void,
    onNextPage: () => void, onPreviousPage: () => void
}

export function PageReader(
    { title, chapter, page, pageSrc,
        onNextChapter, onPreviousChapter,
        onNextPage, onPreviousPage }: ChapterControls
) {
    return <div class="PageReader">
        <img class="Page"src={pageSrc} />
        <SideBar
            title={title} chapter={chapter} page={page}
            onNextChapter={onNextChapter}
            onPreviousChapter={onPreviousChapter}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
        />
    </div>
}