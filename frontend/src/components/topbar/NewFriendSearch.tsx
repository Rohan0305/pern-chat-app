import { useState } from "react";
import toast from "react-hot-toast";
import { Search, UserPlus } from "lucide-react";
import useSendFriendRequest from "../../hooks/useSendFriendRequest";

const NewFriendSearch = () => {
	const [search, setSearch] = useState("");
	const { sendFriendRequest, loading } = useSendFriendRequest();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long")
		}

		await sendFriendRequest(search);
	};

	return (
		<form className='flex items-center gap-3' onSubmit={handleSubmit}>
			<div className="relative flex-1">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
				<input
					type='text'
					placeholder='Search for users...'
					className='w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					disabled={loading}
				/>
			</div>
			<button 
				type="submit"
				disabled={loading || !search.trim()}
				className="bg-gradient-to-r from-green-500 to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 shadow-lg"
			>
				<UserPlus className="w-4 h-4" />
				{loading ? "Sending..." : "Add Friend"}
			</button>
		</form>
	);
};

export default NewFriendSearch;
