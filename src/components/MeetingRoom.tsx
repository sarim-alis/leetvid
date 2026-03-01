import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResizablePanel, ResizablePanelGroup } from "./ui/resizable";

function MeetingRoom() {
    const router = useRouter();
    const [layout, setLayout] = useState<"grid" |"speaker">('speaker');
    // const { showParticipants, setShowParticipants } = useState(false);

    const { useCallCallingState } = useCallStateHooks();

    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) {
        return (
            <div className="h-96 flex items-center justify-center">
                <LoaderIcon className="size-8 animate-spin" />
            </div>
        );
    }

    return (
    <ResizablePanelGroup>
        <ResizablePanel defaultSize={35} minSize={25} maxSize={100} className="relative">
            <h1>Video will go here</h1>
        </ResizablePanel>
        


        <ResizablePanel defaultSize={65} minSize={25}>
            <h1>Code editor will go here</h1>
        </ResizablePanel>
    </ResizablePanelGroup>
    );
}
export default MeetingRoom;