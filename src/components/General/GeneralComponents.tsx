import arrowIcon from '../../assets/BoxyArrowIcon.png'

export function workflow(image: string, text: string, arrow: boolean) {
    return (
      <div className="flex align-top">
        <div className="ml-5 mr-5">
          <img className="w-[12.5vw] mb-5 object-fill rounded-full" src={image}/>
          <h3 className="text-[15px] w-[12.5vw] text-center">{text}</h3>
        </div>
        {arrow ? <img className="w-[6.25vw] h-3 mt-[6.25vw] object-contain" src={arrowIcon.src}/> : <></>}
      </div>
    )
  }

export function service(image: string, title: string, text: string) {
    return (
      <div className="flex flex-col items-center mr-[4vw] ml-[4vw]">
        <img className="w-[25vw] h-[12.5vw] rounded-md" src={image}/>
        <h2 className="text-[25px] mt-7">{title}</h2>
        <h3 className="text-center w-[20vw]">{text}</h3>
      </div>
    )
  }

export function button(text: string, width_lg: string, width: string) {
    return (
        <button className={`h-[60px] w-[${width}] lg:w-[${width_lg}] ml-5 bg-bxBrand text-white rounded-3xl hover:bg-bxBrandLight transition ease-in duration-75`}>
            {text}
        </button>
    )
  }