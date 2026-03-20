import { CallControls, CallingState, CallParticipantsList, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { LayoutListIcon, LoaderIcon, UsersIcon } from "lucide-react";
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
        {/* Left Sidebar: Video + Problem Description */}
        <div className="w-[60%] flex flex-col border-r">
            {/* Video Panel */}
            <div className="h-[60%] relative bg-muted/30 border-b p-0 -ml-4">
                {/* Video Layout */}
                <div className="h-full flex items-start justify-start p-0 -ml-4">
                    {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}

                    {/* Participants List Overlay */}
                    {showParticipants && (
                      <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
                        <CallParticipantsList onClose={() => setShowParticipants(false)} />
                      </div>
                    )}
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-2 left-2 z-40">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-1">
                      <CallControls onLeave={() => router.push("/")} />
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="size-6" onClick={() => setLayout(layout === "grid" ? "speaker" : "grid")}>
                              <LayoutListIcon className="size-2.5" />
                            </Button>

                            <Button variant="outline" size="icon" className="size-6" onClick={() => setShowParticipants(!showParticipants)}>
                              <UsersIcon className="size-2.5" />
                            </Button>
                            <EndCallButton /> 
                        </div>
                    </div>
                  </div>
                </div>
            </div>

            {/* Problem Description Panel */}
            <div className="h-[40%] overflow-hidden mt-4">
                <CodeEditor showOnlyProblem />
            </div>
        </div>

        {/* Code Editor Panel */}
        <div className="w-[40%]">
            <CodeEditor showOnlyEditor />
        </div>
    </div>
    );
}
export default MeetingRoom;