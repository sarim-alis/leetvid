import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";

function MeetingRoom() {
    const router = useRouter();
    const [layout, setLayout] = useState<"grid" |"speaker">('speaker');
    // const { showParticipants, setShowParticipants } = useState(false);

    const { useCallCallingState } = useCallStateHooks();

    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) {
        return (
            <div className="h-screen flex items-center justify-center">
                <LoaderIcon className="size-8 animate-spin" />
            </div>
        );
    }

    return (
    <div className="h-[calc(100vh-4rem)]">
        <ResizablePanelGroup className="h-full flex flex-row" data-panel-group-direction="horizontal">
            <ResizablePanel defaultSize={35} minSize={25}>
                <div className="h-full flex items-start p-4">
                    <h1>Video will go here</h1>
                </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={65} minSize={25}>
                <div className="h-full flex items-start p-4">
                    <h1>Code editor will go here</h1>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
    );
}
export default MeetingRoom;