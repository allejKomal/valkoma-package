import {
    Alert as AlertPrimitive,
    AlertDescription,
    AlertTitle,
} from "../primitive/alert";
import { Button } from "../primitive/button";
import {
    AlertTriangle,
    X,
    Info,
    AlertOctagon,
    CheckCircle,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import clsx from "clsx";

type AlertType = "warning" | "error" | "info" | "success";
type AlertVariant = "solid" | "outline" | "soft" | "bordered";
type ActionVariant = "right" | "right-bottom" | "right-justify";
type CloseButtonType = "icon" | "ghost-text" | "text" | 'outline';
type CloseButtonTextType = 'default' | 'underline';
type ConfirmButtonType = "ghost-text" | "primary-text" | 'outline';
type ConfirmButtonTextType = "default" | "underline"


export interface AlertProps {
    iconType?: 'default' | 'bordered';
    alertType?: AlertType;
    actionVariant?: ActionVariant;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    closeButton?: boolean;
    confirmationButtonText?: string;
    closeButtonTextType?: CloseButtonTextType;
    confirmButtonTextType?: ConfirmButtonTextType;
    onConfirm?: () => void;
    onClose?: () => void;
    open?: boolean;
    actions?: React.ReactNode;
    variant?: AlertVariant;
    dismissAfter?: number;
    closeButtonType?: CloseButtonType;
    confirmButtonType?: ConfirmButtonType;
    wrapperClassName?: string;
    iconWrapperClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    role?: string;
    ariaLabel?: string;
    ariaLive?: "polite" | "assertive";
}

export function Alert({
    iconType = 'default',
    alertType = "info",
    actionVariant = "right-justify",
    title = "",
    description = "",
    icon,
    closeButton = true,
    confirmationButtonText,
    onConfirm,
    onClose,
    open = true,
    actions,
    variant = "outline",
    dismissAfter,
    closeButtonType = "icon",
    confirmButtonType = "ghost-text",
    wrapperClassName,
    iconWrapperClassName,
    titleClassName,
    descriptionClassName,
    role = "alert",
    ariaLabel,
    ariaLive = "polite",
    closeButtonTextType = 'default',
    confirmButtonTextType = 'default'
}: AlertProps) {
    const [visible, setVisible] = useState(open);

    // Sync visible state with open prop changes
    useEffect(() => {
        setVisible(open);
    }, [open]);

    useEffect(() => {
        if (dismissAfter && visible) {
            const timer = setTimeout(() => {
                setVisible(false);
                onClose?.();
            }, dismissAfter);
            return () => clearTimeout(timer);
        }
    }, [dismissAfter, visible, onClose]);

    const defaultIcon = useMemo(() => {
        switch (alertType) {
            case "warning":
                return <AlertTriangle className="text-yellow-500" />;
            case "error":
                return <AlertOctagon className="text-red-500" />;
            case "success":
                return <CheckCircle className="text-green-500" />;
            case "info":
            default:
                return <Info className="text-blue-500" />;
        }
    }, [alertType]);

    const handleClose = () => {
        setVisible(false);
        onClose?.();
    };

    const handleConfirm = () => {
        onConfirm?.();
    };

    if (!visible) return null;

    const borderColorStyles: Record<AlertType, string> = {
        warning: "border-[#F97316]",
        error: "border-[#EF4444]",
        info: "border-blue-500",
        success: "border-[#22C55E]",
    };

    const variantStyles: Record<AlertVariant, string> = {
        solid: "bg-opacity-10 border-none bg-white dark:bg-black",
        outline: "border border-[#E5E5E5] bg-white dark:bg-black",
        soft: "bg-muted border border-gray-100",
        bordered: "border bg-white dark:bg-black",
    };




    const shouldShowActions = confirmationButtonText || actions || closeButton;

    const renderCloseButton = () => {
        if (!closeButton) return null;

        const isIcon = closeButtonType === "icon";
        const isText = closeButtonType === "text";
        const isUnderline = closeButtonTextType === 'underline';

        return (
            <Button
                className={clsx(isIcon && "!size-6", isText && "text-sm", isUnderline && "underline")}
                variant='ghost'
                size={isIcon ? "icon" : "default"}
                onClick={handleClose}
            >
                {isIcon ? <X className="text-[#575757]" /> : "Close"}
            </Button>
        );
    };

    const renderConfirmButton = () => {
        if (!confirmationButtonText) return null;

        const variant = confirmButtonType === "primary-text" ? "default" : "ghost";
        const isUnderline = confirmButtonTextType === 'underline';

        return (
            <Button
                className={clsx("text-sm p-2.5", isUnderline && "underline")}
                variant={variant}
                onClick={handleConfirm}
            >
                {confirmationButtonText}
            </Button>
        );
    };

    const renderActionsByVariant = () => {
        if (!shouldShowActions) return null;

        switch (actionVariant) {
            case "right-bottom":
                return (
                    <div className="flex flex-wrap gap-2 mt-2 items-center justify-end">
                        {renderConfirmButton()}
                        {actions}
                        {renderCloseButton()}
                    </div>
                );
            case "right":
                return (
                    <div className="flex flex-wrap gap-2 mt-2 items-center">
                        {renderConfirmButton()}
                        {actions}
                        {renderCloseButton()}
                    </div>
                );
            case "right-justify":
                return (
                    <div className="flex flex-col-reverse flex-wrap gap-2 items-end h-full">
                        {renderCloseButton()}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AlertPrimitive
            role={role}
            aria-live={ariaLive}
            aria-label={ariaLabel}
            className={clsx(
                "flex flex-col gap-3 p-4 rounded-md items-end w-full max-w-lg bg-black",
                variantStyles[variant],
                variant === "outline" || variant === "bordered" ? borderColorStyles[alertType] : "",
                wrapperClassName
            )}

        >
            <div className="flex gap-3 items-start w-full">
                <span
                    className={clsx(
                        "p-1 rounded-md [&>svg]:size-5",
                        iconWrapperClassName,
                        iconType === 'bordered' ? "border border-[#E5E5E5]" : "",
                    )}
                >
                    {icon || defaultIcon}
                </span>

                <div className="flex flex-col flex-1 gap-2 h-full">
                    <AlertTitle className={clsx("text-base font-semibold dark:text-white", titleClassName)}>
                        {title}
                    </AlertTitle>
                    <AlertDescription className={clsx("text-sm text-muted", descriptionClassName)}>
                        {description}
                    </AlertDescription>
                    {actionVariant === "right-bottom" && renderActionsByVariant()}
                </div>

                {["right", "right-justify"].includes(actionVariant) && renderActionsByVariant()}
            </div>

            {confirmationButtonText && actionVariant === "right-justify" && (
                <Button
                    className={clsx("text-sm underline p-2", confirmButtonTextType === 'underline' && "underline")}
                    variant="ghost"
                    onClick={handleConfirm}
                >
                    {confirmationButtonText}
                </Button>
            )}
        </AlertPrimitive>
    );
}