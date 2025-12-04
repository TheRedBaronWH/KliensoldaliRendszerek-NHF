import "./Reader.css";

import { TopBar } from "./Parts/TopBar";
import { PageReader } from "./Parts/PageReader";
import { useState } from "preact/hooks";

export function ChapterReader(
    { selectedManga, onBackClicked }: 
    { selectedManga: string, onBackClicked?: () => void }
) {
    let manga = loadManga(selectedManga);
    let [actualVolume, setActualVolume] = useState(1);
    const setVolume = (v: number) => {
        if(v < 1) return;
        setActualVolume(v);
    }
    let [actualChapter, setActualChapter] = useState(1);
    const setChapter = (c: number) => {
        if(c < 1) return;
        setActualChapter(c);
    }
    let [actualPage, setActualPage] = useState(1);
    const setPage = (p: number) => {
        if(p < 1) return;
        setActualPage(p);
    }

    return <div class="ChapterReader">
            <TopBar title={manga} volume={actualVolume.valueOf()} onBackClicked={onBackClicked} 
                onNextVolume={() => setVolume(actualVolume+1)}
                onPreviousVolume={() => setVolume(actualVolume-1)} />
            <PageReader 
                title={manga} chapter={actualChapter.valueOf()} page={actualPage.valueOf()}
                onNextChapter={() => setChapter(actualChapter+1)}
                onPreviousChapter={() => setChapter(actualChapter-1)}
                onNextPage={() => setPage(actualPage+1)}
                onPreviousPage={() => setPage(actualPage-1)}
                />
    </div>
}

function loadManga(selectedManga: string) {
    return selectedManga;
}