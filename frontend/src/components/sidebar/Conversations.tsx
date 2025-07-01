import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading } = useGetConversations();
  const { conversations } = useConversation();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations?.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};
export default Conversations;
