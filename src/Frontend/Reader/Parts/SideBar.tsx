
import { IconButton } from "../../Common/IconButton";
import { ChapterSelector } from "./ChapterSelector";
import { PageSelector } from "./PageSelector";
import "./SideBar.css";

export type ChapterControls = {
            title: string, chapter: string, page: number,
            onNextChapter: () => void, onPreviousChapter: () => void,
            onNextPage: () => void, onPreviousPage: () => void
        }

export function SideBar(
    { title, chapter, page, onNextChapter, onPreviousChapter, onNextPage, onPreviousPage }: ChapterControls
) {
    return <div class="SideBar">
        <ChapterSelector chapterTitle={title} chapterNum={chapter}
            onNextChapter={onNextChapter} onPreviousChapter={onPreviousChapter} />
        <PageSelector pageNum={page} 
            onNextPage={onNextPage} onPreviousPage={onPreviousPage} />
    </div>
}