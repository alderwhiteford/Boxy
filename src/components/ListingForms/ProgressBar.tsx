export default function ProgressBar({
  currentForm,
  setCurrentForm,
  createListing,
  forms,
  validate,
}: any) {
  return (
    <div className="absolute bottom-0 pb-10 w-[80%] ">
      <div className="flex justify-between">
        <div>
          {currentForm !== 0 ? (
            <button
              className="border border-solid border-black h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-black"
              onClick={() =>
                setCurrentForm(
                  currentForm !== 0 ? currentForm - 1 : currentForm
                )
              }
            >
              Back
            </button>
          ) : (
            <div />
          )}
        </div>
        <div>
          {currentForm === 5 ? (
            <button
              className="bg-[#7C7C7C] hover:bg-[#097275] transition:color h-[40px] w-[8vw] mb-7 ml-auto right-2 rounded-full text-white"
              onClick={createListing}
            >
              Submit
            </button>
          ) : (
            <button
              className="bg-[#097275] h-[40px] w-[8vw] mb-7 right-2 rounded-full text-white"
              onClick={() => {
                validate() &&
                  setCurrentForm(
                    currentForm !== 5 ? currentForm + 1 : currentForm
                  );
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div id="progress-bar" className="h-[6px] bg-bxBoxLight grid grid-cols-6 gap-1 rounded-full">
        {forms.slice(0, currentForm + 1).map((_: any, i: number) => {
          return <div className="bg-[#B3B3B3] rounded-full" key={i} />;
        })}
      </div>
    </div>
  );
}
