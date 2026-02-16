const Loader = ({ page }: { page?: string }) => {
  return (
    <div className="flex cursor-wait items-center justify-center gap-3.5 rounded-md bg-white px-4 py-2 w-fit shadow-sm z-10">
      <span>loading {page ? page : ""}</span>
      <div className="border-t-primary-300 size-7 animate-spin rounded-full border-4 border-gray-300"></div>
    </div>
  );
};

export default Loader;
