import { IconButton } from "../../Common/IconButton";
import "./PageSelector.css";

export type PageSelectorProps = {
    pageNum: number,
    onNextPage?: () => void, onPreviousPage?: () => void
}

export function PageSelector(
    { pageNum, onNextPage, onPreviousPage }: PageSelectorProps
) {
    return <div class="PageSelector">
        <IconButton icon="arrow_back" onClick={onPreviousPage} />
        <h1>Page {pageNum}</h1>
        <IconButton icon="arrow_forward" onClick={onNextPage} />
    </div>
}