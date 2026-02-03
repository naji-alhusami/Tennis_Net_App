import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/ui/wrapper";
import { CirclePlus, Search, X } from "lucide-react";

export default function ChatPage() {

    return (
        // <div className="bg-gray-200 py-2">
        <Wrapper>
            <div className="py-5 pr-2">
                <div className="bg-white">
                    <div className="flex flex-row justify-between items-center pb-3">
                        <h1 className="text-2xl font-bold">Conversations</h1>
                        <CirclePlus className="bg-green-500 text-white rounded-xl" />
                    </div>
                    {/* Search By Email Or Name */}
                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            // value={nameOrEmailParam}
                            // onChange={(e) => setParamsHandler("q", e.target.value)}
                            placeholder="Search by name …"
                            className="pl-9 bg-muted/30 border border-border/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-primary/25"
                        />
                        {/* {nameOrEmailParam && ( */}
                        <Button
                            type="button"
                            variant="link"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
                            // onClick={() => setParamsHandler("q", "")}
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        {/* )} */}
                    </div>
                </div>
            </div>
        </Wrapper>
        // </div>
    )
}