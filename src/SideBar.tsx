import { IconButton } from "./IconButton";

export function SideBar() {
    return <div>
        <h1>SideBar</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
            <IconButton icon="arrow_back" />
            <IconButton icon="arrow_forward" />
        </div>
    </div>
}