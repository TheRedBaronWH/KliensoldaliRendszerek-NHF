import "./Reader.css";

import { TopBar } from "./Parts/TopBar";
import { PageReader } from "./Parts/PageReader";

export function ChapterReader() {
    return <div class="ChapterReader">
        <div class="TopBar">
            <TopBar></TopBar>
        </div>
        <div class="PageReader">
            <PageReader></PageReader>
        </div>
    </div>
}