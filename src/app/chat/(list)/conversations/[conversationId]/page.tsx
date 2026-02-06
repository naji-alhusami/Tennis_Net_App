type ConversationParams = Promise<{ conversationId: string }>

export default async function ConversationPage({
    params,
}: {
    params: ConversationParams
}) {
    const { conversationId } = await params
    console.log("conversationId:", conversationId)
    return <div>ConversationPage {conversationId}</div>
}