import { useEffect } from "react";

type ShortcutOptions = {
    key: string;
    modifier?: "ctrl" | "alt" | "meta" | "shift";
    callback: () => void;
    target?: HTMLElement | Window;
};

export function useKeyboardShortcuts(shortcuts: ShortcutOptions[]) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            for (const { key, modifier, callback, target = window } of shortcuts) {
                const eventTarget = event.target as Node | null;

                const isTarget =
                    target === window ||
                    (target instanceof HTMLElement && eventTarget && target.contains(eventTarget));

                if (!isTarget) continue;

                const modMatch =
                    !modifier ||
                    (modifier === "ctrl" && event.ctrlKey) ||
                    (modifier === "alt" && event.altKey) ||
                    (modifier === "meta" && event.metaKey) ||
                    (modifier === "shift" && event.shiftKey);

                if (modMatch && event.key.toLowerCase() === key.toLowerCase()) {
                    event.preventDefault();
                    callback();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [shortcuts]);
}
