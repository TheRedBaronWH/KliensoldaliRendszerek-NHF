import "./TopBar.css";

import { IconButton } from "../../Common/IconButton";
import { VolumeSelector } from "./VolumeSelector";

export type TopBarProps = {
    title: string, volume: string,
    onNextVolume?: () => void, onPreviousVolume?: () => void,
    onBackClicked?: () => void,
    isSideBarOpen: boolean,
    onSideBarToggle?: () => void
}

export function TopBar({ title, volume, onNextVolume, onPreviousVolume, onBackClicked, isSideBarOpen, onSideBarToggle }: TopBarProps
) {
    let volumeString = volume;
    if (volumeString === "none") {
        volumeString = "N/A";
    }

    return <div class="TopBar">
        <div class="BackButton">
            <IconButton icon="arrow_back" content="Go Back" onClick={onBackClicked} />
        </div>
        <VolumeSelector title={title} volumeNum={volumeString} onNextVolume={onNextVolume} onPreviousVolume={onPreviousVolume} />
        <div class="SideBarButton">
            <IconButton icon={isSideBarOpen ? "arrow_forward" : "arrow_back"}
                content={isSideBarOpen ? "Hide SideBar" : "Show SideBar"}
                contentPosition={isSideBarOpen ? "left" : "right"}
                onClick={onSideBarToggle} />
        </div>
    </div>
}

export function LoadingTopBar({ onBackClicked }: { onBackClicked: () => void }) {
    return <div class="TopBar">
        <div class="BackButton">
            <IconButton icon="arrow_back" content="Go Back" onClick={onBackClicked} />
        </div>
    </div>
}