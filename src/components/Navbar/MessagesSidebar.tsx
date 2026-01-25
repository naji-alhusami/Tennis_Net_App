import { MessageCircle } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const MessagesSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="group ml-4 flex flex-row justify-center items-center cursor-pointer">
        <MessageCircle
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
      </SheetTrigger>
      <SheetContent className="flex flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="spacy-y-2.5 pr-6">
          <SheetTitle>Messages (0)</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MessagesSidebar;
