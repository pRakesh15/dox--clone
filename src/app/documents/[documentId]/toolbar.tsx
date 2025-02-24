'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { FontFamilyButton } from '@/subComponent/FontFamilyButton';
import { HeadingLevelButton } from '@/subComponent/HeadingLevelButton';
import TextColorButton from '@/subComponent/TextColorButton';
import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-react';

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

//create a component for headinf Lavel button


//create a component for fontfamily button


//create a ToolBar Button Component

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
}: ToolbarButtonProps) => {
    //here i  use cn instate of ternary operator bcz cn handel the tailwind error
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon className='size-4 ' />
        </button>
    )
}

function Toolbar() {
    const { editor } = useEditorStore()
    // console.log(editor)
    const sections: {
        label: string,
        icon: LucideIcon,
        onClick: () => void,
        isActive?: boolean;
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print(),
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                    }
                }
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                },
                {
                    label: "UnderLine",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                },
            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    isActive: false,
                    onClick: () => console.log("Comment")
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    isActive: editor?.isActive("taskList"),
                    onClick: () => editor?.chain().focus().toggleTaskList().run()
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    isActive: editor?.isActive("taskList"),
                    onClick: () => editor?.chain().focus().unsetAllMarks().run()
                },
            ]
        ]
    return (
        <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[14px] min-h-[40px] flex items-center gap-x-0.5 overflow-auto'>
            {
                sections[0].map((item) => (
                    <ToolbarButton key={item.label} {...item} />
                ))
            }
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            <FontFamilyButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            <HeadingLevelButton/>
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {/* font size */}
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {
                sections[1].map((item) => (
                    <ToolbarButton key={item.label} {...item} />
                ))
            }
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />

            <TextColorButton/>
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {
                sections[2].map((item) => (
                    <ToolbarButton key={item.label} {...item} />
                ))
            }
        </div>
    )
}

export default Toolbar