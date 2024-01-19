
export default function CardGroup({ items, selected, setSelected }: any) {
      const createCard = (i: number, text: string) => {
        return (
          <button
            onClick={() => {
              const newSelected = [...selected];
              newSelected[i] = !selected[i];
              setSelected(newSelected);
            }}
            className={`h-[80px] w-[100%] ${
              selected[i] ? "bg-gray-400" : "bg-[#F8F8F8]"
            } hover:bg-gray-400 active:bg-gray-500 rounded-md`}
            key={i}
          >
            {text}
          </button>
        );
      };

      return (
        <div className="grid gap-y-5 gap-x-5 grid-cols-3">
          {items.map((item: any, i: number) => createCard(i, item))}
        </div>
      );
}