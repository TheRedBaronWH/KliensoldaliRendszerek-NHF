import "./Reader.css";

import { TopBar } from "./Parts/TopBar";
import { PageReader } from "./Parts/PageReader";
import { useState } from "preact/hooks";
import { ChapterModel, MangaModel } from "../../Backend/Model/Model";
import { loadChapter } from "../../Backend/Api/ChapterLoader";

export function ChapterReader(
    { selectedManga, onBackClicked }:
        { selectedManga: MangaModel, onBackClicked?: () => void }
) {
    let [actualVolume, setActualVolume] = useState(0);
    const setVolume = (v: number) => {
        console.log("setVolume", actualVolume, v, selectedManga.volumes.length);
        if (v < 0) return;
        if (v >= selectedManga.volumes.length) return;
        setActualVolume(v);
        setChapter(0);
        setPage(0);
    }
    const getVolume = () => {
        return selectedManga.volumes[actualVolume.valueOf()];
    }

    let [actualChapterNumber, setActualChapterNumber] = useState(0);
    let [actualChapter, setActualChapter] = useState<ChapterModel | null>(null);
    const setChapter = async (c: number) => {
        console.log("setChapter", actualChapterNumber, c, getVolume().chapterIds.length);
        if (c < 0) {
            setVolume(actualVolume - 1);
            return;
        }
        if (c >= getVolume().chapterIds.length) {
            setVolume(actualVolume + 1);
            return;
        }
        setActualChapterNumber(c);
        setActualChapter(await getActualChapter());
        setPage(0);
    }
    async function getActualChapter() {
        try {
            const chapterId = getVolume().chapterIds[actualChapterNumber.valueOf()];
            const chapter = await loadChapter(chapterId);
            if (chapter) {
                return chapter;
            }
        } catch (error) {
            console.error("Failed to load chapter:", error);
        }
    }

    let [actualPageNumber, setActualPageNumber] = useState(0);
    const setPage = (p: number) => {
        console.log("setPage", actualPageNumber, p, actualChapter?.pageIds.length);
        if (p < 0) {
            setChapter(actualChapterNumber - 1);
            return;
        }
        if (p >= actualChapter?.pageIds.length) {
            setChapter(actualChapterNumber + 1);
            return;
        }
        setActualPageNumber(p);
    }
    const getPageSource = () => {
        let src = actualChapter.baseUrl + "/data/" + actualChapter.hash + "/" + actualChapter.pageIds[actualPageNumber.valueOf()];
        //console.log("Page src:", src);
        return src;
    }


    if (actualChapter) {
        return <div class="ChapterReader">
            <TopBar title={selectedManga.title} volume={getVolume().volumeNumber.toString()} onBackClicked={onBackClicked}
                onNextVolume={() => setVolume(actualVolume + 1)}
                onPreviousVolume={() => setVolume(actualVolume - 1)} />
            <PageReader
                title={actualChapter.title} chapter={actualChapter.chapterNumber}
                page={actualPageNumber + 1} pageSrc={getPageSource()}
                onNextChapter={() => setChapter(actualChapterNumber + 1)}
                onPreviousChapter={() => setChapter(actualChapterNumber - 1)}
                onNextPage={() => setPage(actualPageNumber + 1)}
                onPreviousPage={() => setPage(actualPageNumber - 1)}
            />
        </div>
    } else {
        setChapter(0);
        return <div>Loading...</div>;
    }
}