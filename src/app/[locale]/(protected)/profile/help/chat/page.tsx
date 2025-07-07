import ChatBody from "./_components/ChatBody";

const LiveChatPage = () => {
  return (
    <div className="flex w-full max-lg:justify-center">
      <div className="w-full max-w-2xl border-x lg:border-r lg:border-l-0">
        <div className="w-full border-b p-4">
          <h2 className="text-3xl font-bold">Live Chat</h2>
          <p className="text-muted-foreground mt-2">
            Connect with one of our support agents for immediate assistance.
          </p>
        </div>
        <ChatBody />
      </div>
    </div>
  );
};

export default LiveChatPage;
