import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import useListenFriendRequests from "../hooks/useListenFriendRequests";

const Home = () => {
  useListenFriendRequests();
  
  return (
    <div className="flex flex-col w-full sm:max-w-screen-md mx-auto rounded-lg sm:h-[600px] overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Topbar />
      <div className="flex h-[75vh]">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};
export default Home;
