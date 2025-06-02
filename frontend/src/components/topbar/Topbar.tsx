import useGetRequests from "../../hooks/useGetRequests";
import NewFriendSearch from "./NewFriendSearch";

const Topbar = () => {
	const {loading, requests} = useGetRequests(); 
	console.log(loading, " ", requests)
	return (
		<div className="bg-gray-700 h-16 flex flex-row items-center p-1 md:p-4 ">
            <NewFriendSearch/>
		</div>
	);
};

export default Topbar;
