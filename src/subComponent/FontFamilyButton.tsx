import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ChevronDownIcon } from "lucide-react";
export const FontFamilyButton = () => {
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