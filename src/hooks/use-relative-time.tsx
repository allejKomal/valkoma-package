import { useEffect, useState } from "react";

const getRelativeTime = (date: Date | string | number): string => {
    const now = new Date();
    const input = new Date(date);
    const diff = (now.getTime() - input.getTime()) / 1000;

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const units: [Intl.RelativeTimeFormatUnit, number][] = [
        ["year", 60 * 60 * 24 * 365],
        ["month", 60 * 60 * 24 * 30],
        ["week", 60 * 60 * 24 * 7],
        ["day", 60 * 60 * 24],
        ["hour", 60 * 60],
        ["minute", 60],
        ["second", 1],
    ];

    for (const [unit, secondsInUnit] of units) {
        const value = Math.floor(diff / secondsInUnit);
        if (Math.abs(value) >= 1) {
            return rtf.format(-value, unit);
        }
    }

    return "just now";
};

const getRelativeDateOnly = (date: Date | string | number): string => {
    const now = new Date();
    const input = new Date(date);
    const diff = (now.getTime() - input.getTime()) / 1000;

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const units: [Intl.RelativeTimeFormatUnit, number][] = [
        ["year", 60 * 60 * 24 * 365],
        ["month", 60 * 60 * 24 * 30],
        ["week", 60 * 60 * 24 * 7],
        ["day", 60 * 60 * 24],
    ];

    for (const [unit, secondsInUnit] of units) {
        const value = Math.floor(diff / secondsInUnit);
        if (Math.abs(value) >= 1) {
            return rtf.format(-value, unit);
        }
    }

    return "today";
};

const getAbsoluteTime = (date: Date) =>
    date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

export function useRelativeTime(date: Date | string | number) {
    const [relative, setRelative] = useState(() => getRelativeTime(date));
    const [relativeDateOnly, setRelativeDateOnly] = useState(() =>
        getRelativeDateOnly(date)
    );
    const [absolute] = useState(() => getAbsoluteTime(new Date(date)));
    const [iso] = useState(() => new Date(date).toISOString());

    useEffect(() => {
        const interval = setInterval(() => {
            setRelative(getRelativeTime(date));
            setRelativeDateOnly(getRelativeDateOnly(date));
        }, 10000);
        return () => clearInterval(interval);
    }, [date]);

    return {
        relative,          // "3 minutes ago"
        relativeDateOnly,  // "2 days ago"
        absolute,          // "Jul 31, 2025, 8:30 PM"
        iso,               // "2025-07-31T15:02:00.000Z"
    };
}
