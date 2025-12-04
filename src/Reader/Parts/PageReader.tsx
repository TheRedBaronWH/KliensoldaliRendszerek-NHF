import { Chapter } from "../../Model/Model";
import "./PageReader.css";

import { SideBar } from "./SideBar";

export type ChapterControls = {
            title: string, chapter: number, page: number,
            onNextChapter: () => void, onPreviousChapter: () => void,
            onNextPage: () => void, onPreviousPage: () => void
        }

export function PageReader(
    { title, chapter, page, onNextChapter, onPreviousChapter, onNextPage, onPreviousPage }: ChapterControls
) {
    return <div class="PageReader">
        <h1 class="Page">Reader</h1>
        <SideBar
            title={title} chapter={chapter} page={page}
            onNextChapter={onNextChapter}
            onPreviousChapter={onPreviousChapter}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
        />
    </div>
}