import "./TopBar.css";

import { IconButton } from "../../Common/IconButton";

export function TopBar(
    { title, volume, onNextVolume, onPreviousVolume, onBackClicked }:
        { title: string, volume: string, onNextVolume?: () => void, onPreviousVolume?: () => void, onBackClicked?: () => void }
) {
    let volumeString = volume;
    if(volumeString === "none") {
        volumeString = "N/A";
    }

    return <div class="TopBar">
        <div class="BackButton">
            <IconButton icon="arrow_back" content="Go Back" onClick={onBackClicked} />
        </div>
        <div class="ChapterSelect">
            <IconButton icon="arrow_back" onClick={onPreviousVolume} />
            <h1>{title}: Volume {volumeString}</h1>
            <IconButton icon="arrow_forward" onClick={onNextVolume} />
        </div>
    </div>
}