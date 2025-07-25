import { IoIosSearch } from "react-icons/io";

type SearchStockInputProps = {
  //children: React.ReactNode;
};

function SearchStockInput(_props: SearchStockInputProps) {
  return (
    <div className="flex items-center space-x-1 border rounded-full px-2 py-1 border-on-surface w-xs">
      <IoIosSearch />
      <input
        className="text-xs outline-none w-full"
        type="text"
        placeholder="Company or stock symbol..."
      />
    </div>
  );
}

export default SearchStockInput;
