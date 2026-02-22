"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SparklesIcon } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

function DasboardBtn() {
    const { isCandidate, isLoading } = useUserRole();

    if (isCandidate || isLoading) return null;

    return ( 
    <Link href={"/dashboard"}>
        <Button className="gap-2 font-medium bg-emerald-600 hover:bg-emerald-700 text-white" size={"sm"}>
            <SparklesIcon className="size-4" />
            Dashboard
        </Button>
    </Link>
    );
}
export default DasboardBtn;
