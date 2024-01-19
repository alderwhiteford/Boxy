import arrowIcon from "src/assets/BoxyArrowIcon.png";

export default function Workflow(props: any) {
  return (
    <div className="flex align-top">
      <div className="ml-5 mr-5">
        <img
          className="w-[12.5vw] mb-5 object-fill rounded-full"
          src={props.image}
        />
        <h3 className="text-[15px] w-[12.5vw] text-center">{props.text}</h3>
      </div>
      {props.arrow ? (
        <img
          className="w-[6.25vw] h-3 mt-[6.25vw] object-contain"
          src={arrowIcon.src}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
