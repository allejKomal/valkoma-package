"use client";

import { cn } from "../lib/utils";
import { Loader as LoaderCircle } from "lucide-react";
import type React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../primitive";

export interface ButtonGroupItem {
    id: string;
    icon?: React.ReactNode;
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
    description?: string;
}

export interface ButtonGroupProps {
    items: ButtonGroupItem[];
    variant?: "default" | "rounded";
    size?: "sm" | "md" | "lg";
    className?: string;
    orientation?: "horizontal" | "vertical";
    showTooltip?: boolean;
    buttonClassName?: string;
    activeButtonClassName?: string;
    iconPosition?: "start" | "end";
    loadingIconPosition?: "start" | "end";
    colorScheme?: "gray" | "primary" | "secondary" | "danger";
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    loadingIcon?: React.ReactNode;
    renderItem?: (item: ButtonGroupItem, index: number) => React.ReactNode;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
    items,
    variant = "default",
    size = "md",
    className,
    orientation = "horizontal",
    showTooltip = false,
    buttonClassName,
    activeButtonClassName,
    iconPosition = "start",
    loadingIconPosition = "start",
    colorScheme = "white",
    disabled,
    loading,
    loadingIcon,
    loadingText,
    renderItem,
}) => {
    const baseClasses = "inline-flex";
    const orientationClasses =
        orientation === "horizontal" ? "flex-row" : "flex-col";

    const colorVariants: Record<string, string> = {
        gray: "bg-gray-100 hover:bg-gray-200 text-gray-800",
        primary: "bg-blue-100 hover:bg-blue-200 text-blue-800",
        secondary: "bg-purple-100 hover:bg-purple-200 text-purple-800",
        danger: "bg-red-100 hover:bg-red-200 text-red-800",
    };

    const containerClasses = cn(
        baseClasses,
        orientationClasses,
        variant === "rounded" ? "rounded-full" : "rounded-lg",
        "border border-muted shadow-sm",
        className
    );

    const sizeClasses: Record<string, string> = {
        sm: "px-2 py-1.5 text-sm",
        md: "px-3 py-2 text-base",
        lg: "px-4 py-3 text-lg",
    };

    const getButtonClasses = (
        index: number,
        isDisabled: boolean,
        isActive: boolean
    ) => {
        const baseButtonClasses = cn(
            "flex items-center justify-center transition-colors duration-200",
            colorVariants[colorScheme],
            sizeClasses[size],
            isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
            isActive && activeButtonClassName,
            buttonClassName
        );

        if (orientation === "horizontal") {
            if (items.length === 1) {
                return cn(
                    baseButtonClasses,
                    variant === "rounded" ? "rounded-full" : "rounded-lg"
                );
            } else if (index === 0) {
                return cn(
                    baseButtonClasses,
                    variant === "rounded" ? "rounded-l-full" : "rounded-l-lg",
                    "border-r border-gray-200"
                );
            } else if (index === items.length - 1) {
                return cn(
                    baseButtonClasses,
                    variant === "rounded" ? "rounded-r-full" : "rounded-r-lg"
                );
            } else {
                return cn(baseButtonClasses, "border-r border-gray-200");
            }
        } else {
            if (items.length === 1) {
                return cn(
                    baseButtonClasses,
                    variant === "rounded" ? "rounded-full" : "rounded-lg"
                );
            } else if (index === 0) {
                return cn(
                    baseButtonClasses,
                    variant === "rounded" ? "rounded-t-full" : "rounded-t-lg",
                    "border-b border-gray-200"
                );
            } else if (index === items.length - 1) {
                return cn(
                    baseButtonClasses,
                    variant === "rounded" ? "rounded-b-full" : "rounded-b-lg"
                );
            } else {
                return cn(baseButtonClasses, "border-b border-gray-200");
            }
        }
    };

    const renderButton = (item: ButtonGroupItem, index: number) => {
        const isActive = !!item.active;
        const isDisabled = disabled || !!item.disabled;
        const classes = getButtonClasses(index, isDisabled, isActive);

        // Custom render override
        if (renderItem) return renderItem(item, index);

        return (
            <button
                key={item.id}
                onClick={item.onClick}
                disabled={isDisabled}
                className={classes}
                title={item.label}
            >
                {/* Loading State */}
                {loading && loadingIconPosition === "start" && (
                    <span
                        className={cn(
                            "flex items-center justify-center",
                            item.label && "mr-2"
                        )}
                    >
                        {loadingIcon || <LoaderCircle className="animate-spin" />}
                    </span>
                )}

                {/* Icon before label */}
                {!loading && item.icon && iconPosition === "start" && (
                    <span
                        className={cn(
                            "flex items-center justify-center",
                            item.label && "mr-2"
                        )}
                    >
                        {item.icon}
                    </span>
                )}

                {/* Label / Loading text */}
                {loading ? (
                    <span>{loadingText || "Loading..."}</span>
                ) : (
                    item.label && <span>{item.label}</span>
                )}

                {/* Icon after label */}
                {!loading && item.icon && iconPosition === "end" && (
                    <span
                        className={cn(
                            "flex items-center justify-center",
                            item.label && "ml-2"
                        )}
                    >
                        {item.icon}
                    </span>
                )}

                {loading && loadingIconPosition === "end" && (
                    <span
                        className={cn(
                            "flex items-center justify-center",
                            item.label && "ml-2"
                        )}
                    >
                        {loadingIcon || <LoaderCircle className="animate-spin" />}
                    </span>
                )}
            </button>
        );
    };

    return (
        <div className={containerClasses} role="group">
            {items.map((item, index) =>
                showTooltip ? (
                    <Tooltip key={item.id}>
                        <TooltipTrigger asChild>{renderButton(item, index)}</TooltipTrigger>
                        <TooltipContent className="bg-white text-black border">
                            <p>{item.description}</p>
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    renderButton(item, index)
                )
            )}
        </div>
    );
};
