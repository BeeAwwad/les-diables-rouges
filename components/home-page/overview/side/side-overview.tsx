import dynamic from "next/dynamic";

const Chat = dynamic(() => import("./chat"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const SideOverview = () => {
  return (
    <div className="h-full w-full rounded-lg bg-white lg:w-[40%]">
      <Chat />
    </div>
  );
};

export default SideOverview;
