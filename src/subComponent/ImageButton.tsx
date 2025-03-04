import { useEditorStore } from '@/store/use-editor-store'
import React, { useState } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ImageIcon, SearchIcon, UploadIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



const ImageButton = () => {
    const { editor } = useEditorStore()
    const [imageUrl, setImageUrl] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
    }
    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl)
            }
        }
        input.click();
    }
    const handelImgUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    }


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
                        <ImageIcon className='size-4' />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className='size-4 mr-2' />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className='size-4 mr-2' />
                        Pase image Url

                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >


            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Insert image url</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder='Insert imageUrl'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handelImgUrlSubmit();
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handelImgUrlSubmit}>Insert</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </>
    )
}

export default ImageButton