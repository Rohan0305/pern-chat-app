// import MessageContainer from "../components/messages/MessageContainer";
// import Sidebar from "../components/sidebar/Sidebar";
// import Topbar from "../components/topbar/Topbar";

// const Home = () => {
//   return (
//     <div className="flex flex-col h-[90vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//       <div className="h-[10vh]">
//         <Topbar />
//       </div>
//       <div className="flex flex-row flex-1">
//         <Sidebar />
//         <MessageContainer />
//       </div>
//     </div>
//   );
// };
// export default Home;

import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

const Home = () => {
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
