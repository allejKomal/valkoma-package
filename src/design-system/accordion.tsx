import {
    Accordion as AccordionPrimitive,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../primitive";
import * as React from "react";
import { cn } from "../lib/utils";

function getAccordionVariantClasses(variant: string) {
    let variantClass = "";
    switch (variant) {
        case "bottom-border":
            variantClass = "";
            break;
        case "bordered":
            variantClass = "border border-[#E5E5E5] rounded-md  hover:bg-[#F5F5F5]";
            break;
        default:
            variantClass = "border-none";
            break;
    }
    return { variantClass };
}

export interface AccordionProps {
    variant?: "default" | "bordered" | "bottom-border";
    triggerPosition?: "left" | "right";
    title: string | React.ReactNode;
    titleIcon?: React.ReactNode;
    content: string | React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    titleClassName?: string;
    contentClassName?: string;
    className?: string;
    itemValue?: string;
    id?: string;
    disabled?: boolean;
    triggerProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    [key: string]: unknown;
}

export function Accordion({
    variant = "default",
    triggerPosition = "right",
    title = "Accordion Title",
    titleIcon,
    content = "Accordion Content",
    open,
    defaultOpen = false,
    onOpenChange,
    titleClassName,
    contentClassName,
    className,
    itemValue = "item-1",
    id,
    disabled = false,
    triggerProps = {},
    ...rest
}: AccordionProps) {
    const isControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const variantClass = getAccordionVariantClasses(variant);
    console.log(variantClass);

    const handleValueChange = (value: string | undefined) => {
        const isOpen = value === itemValue;
        if (!isControlled) {
            setInternalOpen(isOpen);
        }
        onOpenChange?.(isOpen);
    };

    const currentValue = isControlled
        ? open
            ? itemValue
            : undefined
        : internalOpen
            ? itemValue
            : undefined;

    const triggerId = id ?? `accordion-trigger-${itemValue}`;
    const contentId = `accordion-content-${itemValue}`;

    return (
        <AccordionPrimitive
            type="single"
            id={id}
            collapsible
            value={currentValue}
            onValueChange={handleValueChange}
            className={cn("w-full", variantClass.variantClass, className)}
            defaultValue={defaultOpen ? itemValue : undefined}
            {...rest}
        >
            <AccordionItem value={itemValue} disabled={disabled}>
                <AccordionTrigger
                    className={cn(
                        "w-full transition-all flex items-center bg-white dark:bg-black [&_svg]:text-[#767676]",
                        triggerPosition === "right" && "p-4",
                        variant === "bordered" && "p-4",
                        titleClassName
                    )}
                    id={triggerId}
                    aria-expanded={currentValue === itemValue}
                    aria-controls={contentId}
                    {...triggerProps}
                >
                    <div
                        className={cn(
                            "flex hover:no-underline tracking-wide",
                            titleClassName
                        )}
                    >
                        {triggerPosition !== "left" && titleIcon && (
                            <span className="mr-2">{titleIcon}</span>
                        )}
                        <span>{title}</span>
                    </div>
                </AccordionTrigger>

                <AccordionContent
                    id={contentId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={cn("flex flex-col gap-4 text-balance p-4 bg-white dark:bg-black", contentClassName)}
                >
                    {content}
                </AccordionContent>
            </AccordionItem>
        </AccordionPrimitive>
    );
}

Accordion.displayName = "Accordion";