"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronsDown, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "../primitive/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../primitive/popover"

import { useState } from "react"
import { Button } from "../primitive/button"
import { Badge } from "../primitive/badge"
import { Checkbox } from "../primitive/checkbox"
import { Switch } from "../primitive/switch"

export type Option = {
    label: string
    value: string
    category?: string
    icon?: React.ReactNode
}




type SelectionType = "check" | "checkbox" | "switch" | "custom"
type SelectionPosition = "left" | "right"

interface MultiSelectProps {
    options: Option[]
    selected: Option[]
    onChange: (options: Option[]) => void

    // UI controls
    groupedView?: boolean
    searchable?: boolean
    disabled?: boolean
    maxHeight?: number
    placeholder?: string

    // Feedback
    informationText?: string
    warningText?: string
    errorText?: string

    // Custom rendering
    selectionType?: SelectionType
    selectionPosition?: SelectionPosition
    renderCustomSelection?: (selected: boolean, option: Option) => React.ReactNode
    renderOptionLabel?: (option: Option) => React.ReactNode
    renderSelectedBadge?: (option: Option) => React.ReactNode

    // Styling
    className?: string
    showBadge?: boolean
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    showIconsForOptions?: boolean
}

export function MultiSelect({
    options,
    selected,
    onChange,
    groupedView = false,
    searchable = true,
    disabled = false,
    maxHeight = 300,
    placeholder = "Select items...",
    informationText,
    warningText,
    errorText,
    selectionType = "switch",
    selectionPosition = "right",
    renderCustomSelection,
    renderOptionLabel,
    renderSelectedBadge,
    showBadge = false,
    startIcon,
    showIconsForOptions = false,
    endIcon,
    className,
}: MultiSelectProps) {
    const containerRef = React.useRef<HTMLDivElement>(null)

    const [visibleCount, setVisibleCount] = useState(selected.length)

    const [open, setOpen] = useState(false)

    const handleToggle = (option: Option, isSelected: boolean) => {
        if (disabled) return
        onChange(
            isSelected
                ? selected.filter((item) => item.value !== option.value)
                : [...selected, option],
        )
    }

    const groupedOptions = React.useMemo(() => {
        return options.reduce((acc, option) => {
            const category = option.category || "Uncategorized"
            if (!acc[category]) acc[category] = []
            acc[category].push(option)
            return acc
        }, {} as Record<string, Option[]>)
    }, [options])

    const getBorderRingClasses = () => {
        if (errorText) {
            // !ring-2 !ring-pink-500 !ring-offset-2
            return "!ring-3 !ring-red-300 !ring-offset-0 !border-red-500";
        }
        if (warningText) {
            return "!ring-2 !ring-yellow-300 !ring-offset-2 !border-yellow-500";
        }
        if (informationText) {
            return "ring-2 !ring-blue-300 !ring-offset-1 !border-blue-500";
        }
        return "border-gray-300 ring-0"; // default no ring
    }

    const renderSelectionControl = (isSelected: boolean, option: Option) => {
        const toggle = () => handleToggle(option, isSelected)

        switch (selectionType) {
            case "check":
                return (
                    <Check
                        className={cn("h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
                    />
                )
            case "checkbox":
                return (
                    <Checkbox
                        checked={isSelected}
                        onCheckedChange={toggle}
                    />
                )

            case "switch":
                return (
                    <Switch
                        checked={isSelected}
                        onCheckedChange={toggle}
                        className="h-4 w-7 [&_span]:!h-3 [&_span]:!w-3 [&_span]:data-[state=checked]:!translate-x-1.5"
                    />
                )

            case "custom":
                return renderCustomSelection?.(isSelected, option) ?? null

            default:
                return null
        }
    }


    const renderOption = (option: Option) => {
        const isSelected = selected.some((item) => item.value === option.value)
        const selection = renderSelectionControl(isSelected, option)

        return (
            <CommandItem
                key={option.value}
                onSelect={() => handleToggle(option, isSelected)}
                className="flex items-center justify-between gap-2"
            >
                {selectionPosition === "left" && selection}
                {showIconsForOptions && option.icon && (
                    <span className="mr-2 flex items-center">
                        {option.icon}
                    </span>
                )}
                <span className="flex-1 text-left">
                    {renderOptionLabel ? renderOptionLabel(option) : option.label}
                </span>
                {selectionPosition === "right" && selection}
            </CommandItem>
        )
    }

    React.useLayoutEffect(() => {
        const container = containerRef.current
        if (!container) return

        const resizeObserver = new ResizeObserver(() => calculateVisibleBadges())

        resizeObserver.observe(container)
        calculateVisibleBadges()

        return () => resizeObserver.disconnect()
    }, [selected])

    const calculateVisibleBadges = () => {
        const container = containerRef.current
        if (!container) return

        const badges = Array.from(container.children) as HTMLElement[]
        const containerWidth = container.offsetWidth

        let usedWidth = 0
        let count = 0

        for (let i = 0; i < badges.length; i++) {
            const badge = badges[i]
            const badgeWidth = badge.offsetWidth + 4 // include margin
            if (usedWidth + badgeWidth < containerWidth - 50) {
                usedWidth += badgeWidth
                count++
            } else {
                break
            }
        }

        setVisibleCount(count)
    }

    const visibleBadges = selected.slice(0, visibleCount)
    const hiddenCount = selected.length - visibleCount

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    aria-disabled={disabled}
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between !border-1",
                        getBorderRingClasses(),
                        disabled && "cursor-not-allowed bg-accent",
                        className
                    )}          >
                    {startIcon && <span className="mr-2 flex items-center">{startIcon}</span>}
                    <div
                        ref={containerRef}
                        className="flex flex-wrap gap-1 items-center overflow-hidden max-h-[2.5rem] flex-1"
                    >
                        {selected.length > 0 ? (
                            <>
                                {visibleBadges.map((option, index) =>
                                    renderSelectedBadge ? (
                                        <React.Fragment key={option.value}>
                                            {renderSelectedBadge(option)}
                                        </React.Fragment>
                                    ) : showBadge ? (
                                        <Badge key={option.value}>{option.label}</Badge>
                                    ) : (
                                        <span key={option.value} className="truncate">
                                            {option.label}
                                            {index < visibleBadges.length - 1 && ", "}
                                        </span>
                                    )
                                )}
                                {hiddenCount > 0 && (
                                    showBadge ? (
                                        <Badge
                                            variant="outline"
                                            className="text-muted-foreground max-w-[6rem] truncate"
                                            title={`+${hiddenCount} more`}
                                        >
                                            +{hiddenCount} more
                                        </Badge>
                                    ) : (
                                        <span
                                            className="text-muted-foreground max-w-[6rem] truncate"
                                            title={`+${hiddenCount} more`}
                                        >
                                            +{hiddenCount} more
                                        </span>
                                    )
                                )}

                            </>
                        ) : (
                            <span className="text-muted-foreground truncate">{placeholder}</span>
                        )}
                    </div>

                    {/* End Icon */}
                    {endIcon ? (
                        <span className="ml-2 flex items-center">{endIcon}</span>
                    ) : (
                        // fallback end icon (chevron) if no endIcon is provided
                        <ChevronDown
                            className={cn(
                                "ml-2 h-5 w-5 shrink-0 transition-transform duration-200 text-[#696969]",
                                open && "rotate-180"
                            )}
                        />
                    )}
                </Button>
            </PopoverTrigger>

            {
                informationText && (
                    <div className="text-muted text-sm mt-1">{informationText}</div>
                )
            }
            {
                warningText && (
                    <div className="text-yellow-500 text-sm mt-1">{warningText}</div>
                )
            }
            {
                errorText && (
                    <div className="text-red-500 text-sm mt-1">{errorText}</div>
                )
            }
            <PopoverContent
                align="start"
                className="p-0"
                style={{
                    width: "var(--radix-popover-trigger-width)",
                    maxHeight,
                }}
            >
                <Command className="w-full">
                    {searchable && (
                        <div className="p-2 [&_div:first-child]:rounded-lg [&_div:first-child]:!px-2 [&_div:first-child]:!border [&_div:first-child]:h-8 bg-white sticky top-0 z-10">
                            <CommandInput
                                placeholder="Search..."
                                className="h-8"
                            />
                        </div>
                    )}

                    <CommandList className="max-h-[calc(var(--popover-max-height,_300px)-2.5rem)] overflow-y-auto">
                        <CommandEmpty>No item found.</CommandEmpty>

                        {groupedView
                            ? Object.entries(groupedOptions).map(([category, items], i) => (
                                <React.Fragment key={category}>
                                    {i > 0 && <CommandSeparator />}
                                    <CommandGroup heading={category}>
                                        {items.map((option) => renderOption(option))}
                                    </CommandGroup>
                                </React.Fragment>
                            ))
                            : options.map((option) => renderOption(option))}
                    </CommandList>
                </Command>
            </PopoverContent>

        </Popover >
    )
}
