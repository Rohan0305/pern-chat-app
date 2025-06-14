import { useState } from "react";
import toast from "react-hot-toast";
import useSendFriendRequest from "../../hooks/useSendFriendRequest";

const NewFriendSearch = () => {
	const [search, setSearch] = useState("");
	const {sendFriendRequest} = useSendFriendRequest();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long")
		}

		await sendFriendRequest(search);

	};

	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Search…'
				className='input-sm md:input input-bordered rounded-full sm:rounded-full w-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button className="bg-green-400 hover:bg-green-300 h-10 w-24 px-4 py-2 rounded flex text-white text-center text-sm items-center justify-center">Add Friend</button>
		</form>
	);
};
export default NewFriendSearch;
