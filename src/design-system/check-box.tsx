"use client";

import { cn } from "../lib/utils";
import { Info } from "lucide-react";
import type React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../primitive/tooltip";
import { Checkbox as PrimitiveCheckbox } from "../primitive/checkbox";

export interface SingleCheckboxProps {
    id: string;
    label: string;
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    description?: string;
    info?: string;
    badge?: {
        text: string;
        variant?: "new" | "beta" | "custom";
        color?: string;
    };
    indeterminate?: boolean;
    className?: string;
    checkboxClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    onChange?: (checked: boolean) => void;
}

// ===== SINGLE CHECKBOX COMPONENT =====
const Checkbox: React.FC<SingleCheckboxProps> = ({
    id,
    label,
    checked = false,
    disabled = false,
    required = false,
    description,
    info,
    badge,
    indeterminate = false,
    className,
    checkboxClassName,
    labelClassName,
    descriptionClassName,
    onChange,
}) => {
    const badgeVariants = {
        new: "bg-green-100 text-green-800 border-green-200",
        beta: "bg-blue-100 text-blue-800 border-blue-200",
        custom: "bg-gray-100 text-gray-800 border-gray-200",
    };

    const handleChange = (checked: boolean) => {
        if (!disabled && onChange) {
            onChange(checked);
        }
    };

    const handleFocus = (event: React.FocusEvent) => {
        // Prevent scroll on focus
        event.target.scrollIntoView = () => { };
    };

    return (
        <div
            className={cn("flex items-start", className)}
            style={{ scrollMarginTop: 0 }}
        >
            <PrimitiveCheckbox
                id={id}
                checked={indeterminate ? "indeterminate" : checked}
                disabled={disabled}
                onCheckedChange={handleChange}
                onFocus={handleFocus}
                className={cn("!mr-2 !mt-[2px]", checkboxClassName)}
                style={{ scrollMarginTop: 0 }}
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                    <label
                        htmlFor={id}
                        className={cn(
                            "text-sm font-medium cursor-pointer select-none",
                            disabled && "cursor-not-allowed opacity-50",
                            labelClassName
                        )}
                    >
                        {label}
                    </label>

                    {required && <span className="text-red-500 text-sm">*</span>}

                    {info && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-white text-black border max-w-xs text-sm">
                                <p>{info}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}

                    {badge && (
                        <span
                            className={cn(
                                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                                badge.color || badgeVariants[badge.variant || "custom"]
                            )}
                        >
                            {badge.variant === "new" && (
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                            )}
                            {badge.text}
                        </span>
                    )}
                </div>

                {description && (
                    <p
                        className={cn(
                            "mt-1 text-sm text-muted-foreground",
                            descriptionClassName
                        )}
                    >
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

// Export the single checkbox component for standalone use
export { Checkbox };
