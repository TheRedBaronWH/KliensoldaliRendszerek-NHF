import "./TopBar.css";

import { IconButton } from "../../Common/IconButton";

export function TopBar(
    {title, volume, onNextVolume, onPreviousVolume, onBackClicked}: 
    {title: string, volume: number, onNextVolume?: () => void, onPreviousVolume?: () => void, onBackClicked?: () => void}) 
{
    return <div class="TopBar">
        <div class="BackButton">
            <IconButton icon="arrow_back" content="Go Back" onClick={onBackClicked} />
        </div>
        <div class="ChapterSelect">
            <IconButton icon="arrow_back" onClick={onPreviousVolume} />
            <h1>{title}: Volume {volume}</h1>
            <IconButton icon="arrow_forward" onClick={onNextVolume} />
        </div>
    </div>
}