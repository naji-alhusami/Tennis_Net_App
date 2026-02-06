// import ChatRightSide from "@/components/Chat/ChatRightSide";
// import ConversationsLeftSide from "@/components/Chat/ConversationsLeftSide";

// export default function ConversationsPage() {
//     return <div className="flex flex-row">
//         <div>
//             <ConversationsLeftSide />
//         </div>
//         <div className="">
//             <ChatRightSide />
//         </div>
//     </div>

// }
import ChatRightSide from "@/components/Chat/ChatRightSide";

export default function ConversationsPage() {
    // This is the RIGHT pane content for the index route.
    // On mobile it is hidden by the layout, on desktop it is shown.
    return <ChatRightSide />;
}