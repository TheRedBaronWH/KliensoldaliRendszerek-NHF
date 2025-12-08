import { ChapterModel } from "../../../Backend/Model/Model";
import "./PageReader.css";

import { SideBar } from "./SideBar";

export type ChapterControls = {
    chapter: ChapterModel, pageNumber: number, pageSrc: string,
    onNextChapter: () => void, onPreviousChapter: () => void,
    onNextPage: () => void, onPreviousPage: () => void
}

export function PageReader(
    { chapter, pageNumber, pageSrc,
        onNextChapter, onPreviousChapter,
        onNextPage, onPreviousPage }: ChapterControls
) {
    let page = chapter.pageIds.length == 0 ? (
        <h1>No pages available for this chapter, go to {chapter.externalUrl}</h1>
    ) : (
        <img class="Page" src={pageSrc} alt={`Page ${pageNumber} of chapter ${chapter} titled ${chapter.title}`} />
    );
    return <div class="PageReader">
        {page}
        <SideBar
            title={chapter.title} chapter={chapter.chapterNumber} page={pageNumber}
            onNextChapter={onNextChapter}
            onPreviousChapter={onPreviousChapter}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
        />
    </div>
}