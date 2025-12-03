import "./TopBar.css";

import { IconButton } from "../../Common/IconButton";

export function TopBar({selectedManga}: {selectedManga: number}) {
    return <div class="TopBar">
        <div class="Back Button">
            <IconButton icon="arrow_back" content="Go Back" />
        </div>
        <div class="ChapterSelect">
            <IconButton icon="arrow_back" />
            <h1>Chapter {selectedManga}</h1>
            <IconButton icon="arrow_forward" />
        </div>
    </div>
}