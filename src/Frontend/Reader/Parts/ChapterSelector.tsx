import { IconButton } from "../../Common/IconButton";
import "./ChapterSelector.css";

export type ChapterSelectorProps = {
    chapterTitle: string,
    chapterNum: string,
    onNextChapter?: () => void, onPreviousChapter?: () => void
}

export function ChapterSelector({ chapterTitle, chapterNum, onNextChapter, onPreviousChapter }: ChapterSelectorProps) {
    return <div class="ChapterSelector">
        <h1>Chapter {chapterNum}</h1>
        <h1>{chapterTitle}</h1>
        <div class="ChapterControls">
            <IconButton icon="arrow_back" content="Last Chapter" contentPosition="right" onClick={onPreviousChapter} />
            <IconButton icon="arrow_forward" content="Next Chapter" contentPosition="left" onClick={onNextChapter} />
        </div>
    </div>
}