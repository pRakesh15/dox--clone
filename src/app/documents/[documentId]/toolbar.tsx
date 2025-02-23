'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { Level } from '@tiptap/extension-heading';
import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-react';

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

//create a component for headinf Lavel button
const HeadingLevelButton = () => {
    const { editor } = useEditorStore();

    const headings = [
        { label: "Normal Text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "28px" },
        { label: "Heading 3", value: 3, fontSize: "24px" },
        { label: "Heading 4", value: 4, fontSize: "20px" },
        { label: "Heading 5", value: 5, fontSize: "18px" },
        { label: "Heading 6", value: 6, fontSize: "16px" }
    ];
    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`
            }
        }
        return "Normal text";
    }



    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
                    <span className='truncate'>
                        {getCurrentHeading()}
                        <ChevronDownIcon className='ml-2 size-4 shrink-0' />
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {
                    headings.map(({ label, value, fontSize }) => (
                        <button
                        onClick={()=>{
                            if(value===0){
                                editor?.chain().focus().setParagraph().run();
                            }else{
                                editor?.chain().focus().toggleHeading({level:value as Level}).run();
                            }
                        }}
                        key={value}
                        style={{ fontSize }}
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            (value===0 && !editor?.isActive("heading"))||editor?.isActive("heading",{level:value}) && "bg-neutral-200/80"
                        )}
                     
                    >
                        <span className='text-sm'>{label}</span>
                    </button>
                    ))
                }

            </DropdownMenuContent>
        </DropdownMenu>
    )
}


//create a component for fontfamily button
const FontFamilyButton = () => {
    const { editor } = useEditorStore();

    const font = [
        { label: "Arial", value: "Arial" },
        { label: "Verdana", value: "Verdana" },
        { label: "Tahoma", value: "Tahoma" },
        { label: "Trebuchet MS", value: "Trebuchet MS" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
                    <span className='truncate'>
                        {editor?.getAttributes("textStyle").fontfamily || "Arial"}
                        <ChevronDownIcon className='ml-2 size-4 shrink-0' />
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {
                    font.map(({ label, value }) => (
                        <button
                            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                            key={value}
                            className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                editor?.getAttributes("textStyle").fontfamily === value && "bg-neutral-200/80"
                            )}
                            style={{ fontFamily: value }}
                        >
                            <span className='text-sm'>{label}</span>
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

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
            {
                sections[2].map((item) => (
                    <ToolbarButton key={item.label} {...item} />
                ))
            }
        </div>
    )
}

export default Toolbar