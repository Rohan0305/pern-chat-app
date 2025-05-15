import { useGetMessages } from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const {loading, messages} = useGetMessages();
	useListenMessages();
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{messages.length >= 0 && messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	);
};
export default Messages;
