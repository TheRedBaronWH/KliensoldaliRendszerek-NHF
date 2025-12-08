import { ChapterModel } from "../../../Backend/Model/Model";
import { IconButton } from "../../Common/IconButton";
import "./PageReader.css";

import { SideBar } from "./SideBar";

export type ChapterControls = {
    chapter: ChapterModel, pageNumber: number, pageSrc: string,
    onNextChapter: () => void, onPreviousChapter: () => void,
    onNextPage: () => void, onPreviousPage: () => void,
    isSideBarOpen: boolean
}

export function PageReader(
    { chapter, pageNumber, pageSrc,
        onNextChapter, onPreviousChapter,
        onNextPage, onPreviousPage, isSideBarOpen }: ChapterControls
) {
    let page = chapter.pageIds.length == 0 ? (
        <div>
            <h1>No pages available for this chapter</h1>
            <h1>Read at: <a href={chapter.externalUrl} target="_blank">
                {chapter.externalUrl}
            </a></h1>
        </div>
    ) : (
        <div class="PageContainer">
            <div class="Page-ChapterControls">
                <IconButton icon="arrow_back" onClick={onPreviousChapter} />
                <span class="ChapterText"> Chapter {chapter.chapterNumber}: {chapter.title}</span>
                <IconButton icon="arrow_forward" onClick={onNextChapter} />
            </div>
            <img class="Page" src={pageSrc} alt={`Page ${pageNumber} of chapter ${chapter} titled ${chapter.title}`} />
            <div class="Page-Hitboxes">
                <div onClick={onPreviousPage} class="Hitbox-Left" />
                <div onClick={onNextPage} class="Hitbox-Right" />
            </div>
        </div>
    );
    return <div className={`PageReader ${isSideBarOpen === true ? "WithSideBar" : "NoSideBar"}`}>
        {page}
        <SideBar
            title={chapter.title} chapter={chapter.chapterNumber} page={pageNumber}
            onNextChapter={onNextChapter}
            onPreviousChapter={onPreviousChapter}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
        />
        <span class="PageNum">{pageNumber}</span>
    </div>
}