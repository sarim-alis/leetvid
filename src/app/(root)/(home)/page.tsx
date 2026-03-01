"use client";

import { useUserRole } from "@/hooks/useUserRole";

export default function Home() {
  const { isInterviewer, isCandidate } = useUserRole();

  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* Welcome Section */}
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>

      {isInterviewer ? (
        <>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          Show sth here
        </div>
        </>
      ) : (
        <>
        <div>Candidate view goes here</div>
        </>
      )}
    </div>
  );
}
