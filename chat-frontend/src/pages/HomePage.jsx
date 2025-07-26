import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/chat/Sidebar';
import NoChatSelected from '../components/chat/NoChatSelected';
import ChatContainer from '../components/chat/ChatContainer';

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
<<<<<<< HEAD
    <div className="h-screen bg-gray-100 overflow-hidden pt-8">
      <div className="flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded shadow-xl w-full max-w-6xl h-[calc(100vh-4rem)]">
=======
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl h-[calc(100vh-4rem)]">
>>>>>>> dd7b13d81f6ea6ea8c4aa32e2a165477d03a39b6
          <div className="flex h-full rounded-2xl overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;