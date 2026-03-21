import useMeetingActions from "@/hooks/useMeetingActions";
import { Doc } from "../../convex/_generated/dataModel";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalendarIcon, EyeIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Interview = Doc<"interviews">;

function MeetingCard({ interview }: { interview: Interview }) {
  const { joinMeeting } = useMeetingActions();
  const router = useRouter();

  const status = getMeetingStatus(interview);
  const formattedDate = format(new Date(interview.startTime), "EEEE, MMMM d · h:mm a");

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            {formattedDate}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                router.push(`/interviews/${interview._id}`);
              }}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
            
            <Badge
              variant={
                status === "live" ? "default" : status === "upcoming" ? "secondary" : "outline"
              }
            >
              {status === "live" ? "Live Now" : status === "upcoming" ? "Upcoming" : "Completed"}
            </Badge>
          </div>
        </div>

        <CardTitle>{interview.title}</CardTitle>

        {interview.description && (
          <CardDescription className="line-clamp-2">{interview.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        {status === "live" && (
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => joinMeeting(interview.streamCallId)}>
            Join Meeting
          </Button>
        )}

        {status === "upcoming" && (
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled>
            Waiting to Start
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
export default MeetingCard;