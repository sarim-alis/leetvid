import { CallingState, CallParticipantsList, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";

function MeetingRoom() {
    const router = useRouter();
    const [layout, setLayout] = useState<"grid" |"speaker">('speaker');
    const [showParticipants, setShowParticipants] = useState(false);
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
    <div className="h-[calc(100vh-4rem-1px)]">
        <ResizablePanelGroup className="h-full flex flex-row" data-panel-group-direction="horizontal">
            <ResizablePanel defaultSize={35} minSize={25} maxSize={100} className="relative">
                {/* Video Layout */}
                <div className="h-full flex items-start p-4 absolute inset-0">
                    {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}

                    {/* Participants List Overlay */}
                    {showParticipants && (
                      <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <CallParticipantsList onClose={() => setShowParticipants(false)} />
                      </div>
                    )}
                        
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