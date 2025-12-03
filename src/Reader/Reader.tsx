import "./Reader.css";

import { TopBar } from "./Parts/TopBar";
import { PageReader } from "./Parts/PageReader";

export function ChapterReader({ selectedManga }: { selectedManga: number }) {
    let manga = loadManga(selectedManga);

    return <div class="ChapterReader">
        <div class="TopBar">
            <TopBar selectedManga={manga} />
        </div>
        <div class="PageReader">
            <PageReader />
        </div>
    </div>
}

function loadManga(selectedManga: number) {
    return selectedManga;
}