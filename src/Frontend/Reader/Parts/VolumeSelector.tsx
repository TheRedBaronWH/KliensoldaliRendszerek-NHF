import { IconButton } from "../../Common/IconButton"
import "./VolumeSelector.css";

export type VolumeSelectorProps = {
    title: string,
    volumeNum: string,
    onNextVolume?: () => void,
    onPreviousVolume?: () => void
}

export function VolumeSelector({ title, volumeNum, onNextVolume, onPreviousVolume }: VolumeSelectorProps) {
    return <div class="VolumeSelector">
        <IconButton icon="arrow_back" onClick={onPreviousVolume} />
        <h1>{title}: Volume {volumeNum}</h1>
        <IconButton icon="arrow_forward" onClick={onNextVolume} />
    </div>
}