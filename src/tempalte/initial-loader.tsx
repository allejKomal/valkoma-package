"use client";
import { cn } from "../lib/utils";
import { MultiStepLoader } from "../primitive/multi-step-loader";
import { useState, useEffect } from "react";

const loadingStates = [
    {
        text: "Welcome to alleJKomal",
    },
];

export function IntialLoader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={cn(loading && "w-full h-[60vh] flex items-center justify-center")}>
            <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={2000} />
        </div>
    );
}
