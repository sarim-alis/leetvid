"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { format } from "date-fns";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UserIcon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { getMeetingStatus } from "@/lib/utils";
import useMeetingActions from "@/hooks/useMeetingActions";
import UserInfo from "@/components/UserInfo";

export default function InterviewDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { joinMeeting } = useMeetingActions();
  
  const interview = useQuery(api.interviews.getInterviewById, {
    id: params.id as Id<"interviews">,
  });
  
  const users = useQuery(api.users.getUsers) ?? [];

  if (interview === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (interview === null) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Interview Not Found</h2>
          <p className="text-muted-foreground mb-4">The interview you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/schedule")}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Schedule
          </Button>
        </div>
      </div>
    );
  }

  const status = getMeetingStatus(interview);
  const formattedDate = format(new Date(interview.startTime), "EEEE, MMMM d, yyyy");
  const formattedTime = format(new Date(interview.startTime), "h:mm a");
  
  const candidate = users.find((u) => u.clerkId === interview.candidateId);
  const interviewers = users.filter((u) => interview.interviewerIds.includes(u.clerkId));

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{interview.title}</h1>
          <p className="text-muted-foreground mt-1">Interview Details</p>
        </div>
        <Badge
          variant={
            status === "live" ? "default" : status === "upcoming" ? "secondary" : "outline"
          }
        >
          {status === "live" ? "Live Now" : status === "upcoming" ? "Upcoming" : "Completed"}
        </Badge>
      </div>

      {/* Main Content */}
      <div className="grid gap-6">
        {/* Description Card */}
        {interview.description && (
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{interview.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Date & Time Card */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{formattedDate}</p>
                <p className="text-sm text-muted-foreground">Date</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{formattedTime}</p>
                <p className="text-sm text-muted-foreground">Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participants Card */}
        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Candidate */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Candidate</p>
              {candidate ? (
                <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <UserInfo user={candidate} />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No candidate assigned</p>
              )}
            </div>

            {/* Interviewers */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Interviewers ({interviewers.length})
              </p>
              <div className="space-y-2">
                {interviewers.map((interviewer) => (
                  <div key={interviewer.clerkId} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                    <UserInfo user={interviewer} />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            {status === "live" && (
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" 
                size="lg"
                onClick={() => joinMeeting(interview.streamCallId)}
              >
                <VideoIcon className="mr-2 h-5 w-5" />
                Join Meeting
              </Button>
            )}

            {status === "upcoming" && (
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" size="lg" disabled>
                <ClockIcon className="mr-2 h-5 w-5" />
                Waiting to Start
              </Button>
            )}

            {status === "completed" && (
              <Button variant="outline" className="w-full" size="lg" disabled>
                Interview Completed
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
