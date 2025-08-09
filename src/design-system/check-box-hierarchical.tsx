"use client";

import { cn } from "../lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Checkbox } from "./check-box";

// ===== HIERARCHICAL CHECKBOX INTERFACES =====
export interface HierarchicalCheckboxItem {
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
    children?: HierarchicalCheckboxItem[];
    indeterminate?: boolean;
}

export interface CheckboxHierarchicalProps {
    items: HierarchicalCheckboxItem[];
    className?: string;
    checkboxClassName?: string;
    collapsible?: boolean;
    defaultExpanded?: boolean;
    onSelectionChange?: (selectedItems: string[]) => void;
}

const HierarchicalCheckbox: React.FC<{
    item: HierarchicalCheckboxItem;
    onSelectionChange: (selectedItems: string[]) => void;
    selectedItems: string[];
    collapsible?: boolean;
    defaultExpanded?: boolean;
    checkboxClassName?: string;
}> = ({
    item,
    onSelectionChange,
    selectedItems,
    collapsible = false,
    defaultExpanded = true,
    checkboxClassName,
}) => {
        const [expanded, setExpanded] = useState(defaultExpanded);
        const hasChildren = item.children && item.children.length > 0;

        const isChecked = hasChildren
            ? selectedItems.some((id) =>
                item.children?.every((child) => child.id === id)
            )
            : selectedItems.includes(item.id);
        const childItems = item.children || [];

        // Recursively count all children and checked children
        const getAllChildren = (
            children: HierarchicalCheckboxItem[]
        ): HierarchicalCheckboxItem[] => {
            let allChildren: HierarchicalCheckboxItem[] = [];
            children.forEach((child) => {
                allChildren.push(child);
                if (child.children && child.children.length > 0) {
                    allChildren = allChildren.concat(getAllChildren(child.children));
                }
            });
            return allChildren;
        };

        const allChildren = getAllChildren(childItems);
        const checkedChildren = allChildren.filter((child) =>
            selectedItems.includes(child.id)
        );

        // Fix: Proper indeterminate calculation
        const isIndeterminate =
            checkedChildren.length > 0 && checkedChildren.length < allChildren.length;

        const handleCheckboxChange = (checked: boolean) => {
            let newSelectedItems = [...selectedItems];

            if (checked) {
                // Add this item and all its children recursively
                if (!newSelectedItems.includes(item.id)) {
                    newSelectedItems.push(item.id);
                }

                // Recursively add all children
                const addAllChildren = (children: HierarchicalCheckboxItem[]) => {
                    children.forEach((child) => {
                        if (!newSelectedItems.includes(child.id)) {
                            newSelectedItems.push(child.id);
                        }
                        if (child.children && child.children.length > 0) {
                            addAllChildren(child.children);
                        }
                    });
                };

                addAllChildren(childItems);
            } else {
                // Remove this item and all its children recursively
                newSelectedItems = newSelectedItems.filter((id) => id !== item.id);

                // Recursively remove all children
                const removeAllChildren = (children: HierarchicalCheckboxItem[]) => {
                    children.forEach((child) => {
                        newSelectedItems = newSelectedItems.filter((id) => id !== child.id);
                        if (child.children && child.children.length > 0) {
                            removeAllChildren(child.children);
                        }
                    });
                };

                removeAllChildren(childItems);
            }

            // Call the parent's onSelectionChange to update the state
            onSelectionChange(newSelectedItems);
        };

        return (
            <div className="space-y-2">
                <div className="flex items-start space-x-2">
                    {hasChildren && collapsible && (
                        <button
                            type="button"
                            onClick={() => setExpanded(!expanded)}
                            className="mt-1 p-0.5 hover:bg-gray-100 rounded transition-colors"
                        >
                            {expanded ? (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                        </button>
                    )}

                    <div className="flex-1">
                        <Checkbox
                            id={item.id}
                            label={item.label}
                            checked={isChecked}
                            disabled={item.disabled}
                            required={item.required}
                            description={item.description}
                            info={item.info}
                            badge={item.badge}
                            indeterminate={isIndeterminate}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                </div>

                {hasChildren && expanded && (
                    <div
                        className={cn(
                            "ml-6 space-y-2 border-l border-gray-200 pl-4",
                            collapsible && "ml-8",
                            checkboxClassName
                        )}
                    >
                        {childItems.map((child) => (
                            <HierarchicalCheckbox
                                key={child.id}
                                item={child}
                                onSelectionChange={onSelectionChange}
                                selectedItems={selectedItems}
                                collapsible={collapsible}
                                defaultExpanded={defaultExpanded}
                                checkboxClassName={checkboxClassName}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

export const CheckboxHierarchical: React.FC<CheckboxHierarchicalProps> = ({
    items,
    className,
    checkboxClassName,
    collapsible = false,
    defaultExpanded = true,
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
                <HierarchicalCheckbox
                    key={item.id}
                    item={item}
                    onSelectionChange={handleSelectionChange}
                    selectedItems={selectedItems}
                    collapsible={collapsible}
                    defaultExpanded={defaultExpanded}
                    checkboxClassName={checkboxClassName}
                />
            ))}
        </div>
    );
};
