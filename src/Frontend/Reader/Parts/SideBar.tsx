
import { IconButton } from "../../Common/IconButton";
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
        <div class="SideBarTopBar">
            <h1>Chapter {chapter}</h1>
            <h1>{title}</h1>
            <div class="ChapterControls">
                <IconButton icon="arrow_back" content="Last Chapter" contentPosition = "left" onClick={onPreviousChapter} />
                <IconButton icon="arrow_forward" content="Next Chapter" contentPosition = "right" onClick={onNextChapter} />
            </div>
        </div>
        <div class="SideBarBottomBar">
            <IconButton icon="arrow_back" onClick={onPreviousPage} />
            <h1>Page {page}</h1>
            <IconButton icon="arrow_forward" onClick={onNextPage} />
        </div>
    </div>
}