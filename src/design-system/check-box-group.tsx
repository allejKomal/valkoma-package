"use client";

import { cn } from "../lib/utils";
import type React from "react";
import { useState } from "react";
import { Checkbox } from "./check-box";

// ===== CHECKBOX GROUP INTERFACES =====
export interface CheckboxGroupItem {
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
}

export interface CheckboxGroupProps {
    items: CheckboxGroupItem[];
    className?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    disabled?: boolean;
    onSelectionChange?: (selectedItems: string[]) => void;
}

// ===== CHECKBOX GROUP COMPONENT =====
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    items,
    className,
    labelClassName,
    descriptionClassName,
    disabled,
    onSelectionChange,
}) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(
        items.filter((item) => item.checked).map((item) => item.id)
    );

    const handleSelectionChange = (newSelectedItems: string[]) => {
        setSelectedItems(newSelectedItems);
        onSelectionChange?.(newSelectedItems);
    };

    return (
        <div className={cn("space-y-4", className)} role="group">
            {items.map((item) => (
                <Checkbox
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    checked={selectedItems.includes(item.id)}
                    disabled={disabled || item.disabled}
                    required={item.required}
                    description={item.description}
                    info={item.info}
                    badge={item.badge}
                    className={className}
                    labelClassName={labelClassName}
                    descriptionClassName={descriptionClassName}
                    onChange={(checked) => {
                        const newSelectedItems = checked
                            ? [...selectedItems, item.id]
                            : selectedItems.filter((id) => id !== item.id);
                        handleSelectionChange(newSelectedItems);
                    }}
                />
            ))}
        </div>
    );
};
