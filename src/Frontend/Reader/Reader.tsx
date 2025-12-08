import "./Reader.css";

import { LoadingTopBar, TopBar } from "./Parts/TopBar";
import { PageReader } from "./Parts/PageReader";
import { useState } from "preact/hooks";
import { ChapterModel, MangaModel } from "../../Backend/Model/Model";
import { loadChapter } from "../../Backend/Api/ChapterLoader";
import { isDataSaver, isReaderLogging } from "../..";

export function ChapterReader(
    { selectedManga, onBackClicked }:
        { selectedManga: MangaModel, onBackClicked?: () => void }
) {
    let [actualVolume, setActualVolume] = useState(0);
    const setVolume = (v: number) => {
        if (isReaderLogging()) console.log(`Trying to set volume from ${actualVolume} to ${v}; max ${selectedManga.volumes.length}`);
        if (v < 0) return;
        if (v >= selectedManga.volumes.length) return;

        setActualChapter(null);

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
        if (isReaderLogging()) console.log(`Trying to set chapter from ${actualChapterNumber} to ${c}; max ${getVolume().chapterIds.length}`);

        if (c < 0) {
            setVolume(actualVolume - 1);
            return;
        }
        if (c >= getVolume().chapterIds.length) {
            setVolume(actualVolume + 1);
            return;
        }

        setActualChapterNumber(c);
        setActualChapter(await getActualChapter(c));
        setPage(0);
    }
    async function getActualChapter(chapterNumber: number) {
        try {
            const chapterId = getVolume().chapterIds[chapterNumber];
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
        if (isReaderLogging()) console.log(`Trying to set page from ${actualPageNumber} to ${p}; max ${actualChapter?.pageIds.length}`);

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
        if (isReaderLogging()) console.log(`Page src: ${src}`);
        return src;
    }
    const getPageSourceDataSaver = () => {
        let src = actualChapter.baseUrl + "/data-saver/" + actualChapter.hash + "/" + actualChapter.dataSaverPageIds[actualPageNumber.valueOf()];
        if (isReaderLogging()) console.log(`Page src: ${src}`);
        return src;
    }


    if (actualChapter) {
        return <div class="ChapterReader">
            <TopBar title={selectedManga.title} volume={getVolume().volumeNumber.toString()} onBackClicked={onBackClicked}
                onNextVolume={() => setVolume(actualVolume + 1)}
                onPreviousVolume={() => setVolume(actualVolume - 1)} />
            <PageReader
                chapter={actualChapter}
                pageNumber={actualPageNumber + 1} pageSrc={isDataSaver() ? getPageSourceDataSaver() : getPageSource()}
                onNextChapter={() => setChapter(actualChapterNumber + 1)}
                onPreviousChapter={() => setChapter(actualChapterNumber - 1)}
                onNextPage={() => setPage(actualPageNumber + 1)}
                onPreviousPage={() => setPage(actualPageNumber - 1)}
            />
        </div>
    } else {
        setChapter(0);
        return <div class="ChapterReader">
            <LoadingTopBar onBackClicked={onBackClicked} />
            <div class = "LoadingMessage">
                Loading...
            </div>
        </div>;
    }
}