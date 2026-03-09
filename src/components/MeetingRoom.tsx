import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="h-[calc(100vh-4rem)] flex">
        <div className="w-[35%] border-r border-gray-300 flex">
            <h1>Video will go here</h1>
        </div>
        
        <div className="w-[65%] flex">
            <h1>Code editor will go here</h1>
        </div>
    </div>
    );
}
export default MeetingRoom;