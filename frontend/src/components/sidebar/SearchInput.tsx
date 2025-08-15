import { Search } from "lucide-react";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useConversation();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long")
		}

		const conversation = conversations?.find((c: ConversationType) => {
			return c.fullName.toLowerCase().includes(search.toLowerCase());
		});

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("")
		} else toast.error("No such user found!")
	};

	return (
		<form className='flex items-center gap-3' onSubmit={handleSubmit}>
			<div className="relative flex-1">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
				<input
					type='text'
					placeholder='Search conversations...'
					className='w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<button 
				type='submit' 
				className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-xl shadow-lg' 
			>
				<Search className='w-4 h-4' />
			</button>
		</form>
	);
};

export default SearchInput;
