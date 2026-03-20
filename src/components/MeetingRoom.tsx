import { CallControls, CallingState, CallParticipantsList, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { GripVertical, LayoutListIcon, LoaderIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import EndCallButton from "./EndCallButton";
import CodeEditor from "./CodeEditor";

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
    <div className="h-[calc(100vh-4rem-1px)] flex">
        {/* Video Panel */}
        <div className="w-1/2 relative">
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

            {/* Video Controls */}
            <div className="absolute bottom-4 left-0 right-0">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 flex-wrap justify-center px-4">
                  <CallControls onLeave={() => router.push("/")} />
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="size-10">
                          <LayoutListIcon className="size-4" />
                        </Button>

                        <Button variant="outline" size="icon" className="size-10" onClick={() => setShowParticipants(!showParticipants)}>
                          <UsersIcon className="size-4" />
                        </Button>
                        <EndCallButton /> 
                    </div>
                </div>
              </div>
            </div>
        </div>
        
        {/* Divider */}
        <div className="w-px bg-border relative">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-sm border bg-border">
                <GripVertical className="h-6 w-6" />
            </div>
        </div>
        
        {/* Code Editor Panel - 50% */}
        <div className="w-1/2">
            <div className="h-full flex items-start p-4">
                <h1>Code editor will go here</h1>
            </div>
        </div>
    </div>
    );
}
export default MeetingRoom;