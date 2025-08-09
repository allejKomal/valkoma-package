import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
import { Copy } from "lucide-react"
import { cn } from "../lib/utils"
import { Separator } from "../primitive/separator"
import { Button } from "../primitive/button"
import { useToast } from "../hooks/use-toast"

interface MarkdownProps {
    markdown: string
    customComponents?: any
    customHighlightKeywords?: Record<string, string[]>
    overrideHighlightCode?: (code: string, language: string) => string
    markdownClassName?: string
    noContextText?: string
}

export const Markdown: React.FC<MarkdownProps> = ({
    markdown,
    customComponents = {},
    customHighlightKeywords = {},
    overrideHighlightCode,
    markdownClassName,
    noContextText = "*No content to preview*"
}) => {
    const { toast } = useToast()

    const baseKeywords: Record<string, string[]> = {
        javascript: ["function", "const", "let", "var", "if", "else", "for", "while", "return", "class", "import", "export", "async", "await", "try", "catch", "finally", "new", "this"],
        typescript: ["function", "const", "let", "var", "if", "else", "for", "while", "return", "class", "import", "export", "async", "await", "try", "catch", "finally", "new", "this", "interface", "type", "enum", "implements", "readonly", "public", "private", "protected", "as", "typeof"],
        python: ["def", "class", "if", "else", "elif", "for", "while", "return", "import", "from", "as", "try", "except", "with", "lambda", "yield", "self"],
        java: ["public", "private", "protected", "class", "interface", "if", "else", "for", "while", "return", "import", "package", "static", "final", "void", "new", "extends", "implements"],
        css: ["color", "background", "margin", "padding", "border", "width", "height", "display", "position", "flex", "grid", "align", "justify", "z-index", "font", "text", "line-height"],
        html: ["div", "span", "p", "h1", "h2", "h3", "body", "head", "html", "script", "style", "link", "meta", "title", "input", "form", "button"],
        bash: ["cd", "ls", "mkdir", "rm", "touch", "echo", "cat", "pwd", "chmod", "chown", "sudo", "apt", "brew", "mv", "cp", "kill", "grep", "tail", "head", "export", "source"],
        git: ["git", "clone", "commit", "push", "pull", "status", "checkout", "merge", "rebase", "branch", "log", "diff", "add", "init", "remote", "fetch", "tag", "stash", "reset"],
        terminal: ["$", "#", "~", ">", "./", "../", "bash", "zsh", "sh", "node", "npm", "yarn", "pnpm"],
    }

    const highlightCode = (code: string, language: string): string => {
        const allKeywords = {
            ...baseKeywords,
            ...customHighlightKeywords,
        }

        let highlightedCode = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")

        const langKeywords = allKeywords[language.toLowerCase()] || []

        highlightedCode = highlightedCode.replace(/(`[^`]*`|"[^"]*"|'[^']*')/g, '<span class="code-string">$1</span>')

        highlightedCode = highlightedCode.replace(
            /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)/g,
            '<span class="code-comment">$1</span>',
        )

        highlightedCode = highlightedCode.replace(
            /(?<!<span class="code-[^"]*">.*)\b(\d+\.?\d*)\b(?![^<]*<\/span>)/g,
            '<span class="code-number">$1</span>',
        )

        langKeywords.forEach((keyword) => {
            const regex = new RegExp(`(?<!<span class="code-[^"]*">.*?)\\b(${keyword})\\b(?![^<]*</span>)`, "g")
            highlightedCode = highlightedCode.replace(regex, '<span class="code-keyword">$1</span>')
        })

        return highlightedCode
    }

    const baseComponents = {
        code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "")
            const language = match ? match[1] : "text"

            if (!inline && match) {
                const codeString = String(children).replace(/\n$/, "")
                const highlighted = overrideHighlightCode
                    ? overrideHighlightCode(codeString, language)
                    : highlightCode(codeString, language)

                return (
                    <div className="code-block-container">
                        <div className="code-block-header">
                            <span className="code-language">{language}</span>
                            <button
                                className="code-copy-btn"
                                onClick={() => {
                                    navigator.clipboard.writeText(codeString)
                                    toast({ title: "Code copied!", description: "Code block copied to clipboard." })
                                }}
                            >
                                <Copy className="w-3 h-3" />
                            </button>
                        </div>
                        <pre className="code-block">
                            <code
                                dangerouslySetInnerHTML={{ __html: highlighted }}
                                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                            />
                        </pre>
                    </div>
                )
            }

            return (
                <code className="inline-code" {...props}>
                    {children}
                </code>
            )
        },

        h1: ({ children }: any) => <span className="text-3xl font-bold mb-4 text-foreground pb-2">{children}</span>,
        h2: ({ children }: any) => <span className="text-2xl font-semibold mb-3 text-foreground">{children}</span>,
        h3: ({ children }: any) => <span className="text-xl font-medium mb-2 text-foreground">{children}</span>,
        blockquote: ({ children }: any) => (
            <blockquote className="!border-l-4 !border-primary [&>p]:!my-2 !pl-4 !italic !my-4 !text-muted-foreground bg-muted !py-2 !rounded-r">
                {children}
            </blockquote>
        ),
        table: ({ children }: any) => (
            <div className="overflow-x-auto my-4">
                <table className="!min-w-full !border-collapse !border !border-border !rounded-lg !overflow-hidden">
                    {children}
                </table>
            </div>
        ),
        th: ({ children }: any) => <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">{children}</th>,
        tr: ({ children }: any) => <tr className="hover:bg-muted transition-colors duration-200">{children}</tr>,
        td: ({ children }: any) => <td className="border border-border px-4 py-2">{children}</td>,
        ul: ({ children }: any) => <ul className="!list-disc !list-inside !my-4 !space-y-1">{children}</ul>,
        ol: ({ children }: any) => <ol className="!list-decimal !list-inside !my-4 !space-y-1">{children}</ol>,
        li: ({ children }: any) => <li className="!ml-4 !mb-2">{children}</li>,
        a: ({ children, href }: any) => (
            <a href={href} className="!text-primary !hover:underline !font-medium" target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ),
        p: ({ children }: any) => <p className="!mb-4 !leading-relaxed">{children}</p>,
        hr: () => <Separator className="my-4" />,
    }

    const mergedComponents = {
        ...baseComponents,
        ...customComponents,
    }

    return (
        <div className={cn(markdownClassName)}>
            <ErrorBoundary>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                    components={mergedComponents}
                >
                    {markdown || noContextText}
                </ReactMarkdown>
            </ErrorBoundary>
        </div>
    )

}


class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: Error }> {
    constructor(props: { children: React.ReactNode }) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Markdown rendering error:", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 border border-destructive rounded-md bg-destructive/10">
                    <h3 className="font-semibold text-destructive mb-2">Rendering Error</h3>
                    <p className="text-sm text-muted-foreground">
                        There was an error rendering the markdown content. Please check your syntax.
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try Again
                    </Button>
                </div>
            )
        }

        return this.props.children
    }
}