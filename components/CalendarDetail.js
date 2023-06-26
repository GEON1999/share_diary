import Image from "next/image";

const CalendarDetail = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-5">
      <div>
        <h3 className="text-gray-300">Today was the Best day ever!!!</h3>
      </div>
      <Image src="/smile.png" alt="emoji" width={50} height={50} />
      <div className="felx flex-col w-80">
        <div className="flex flex-col items-start space-y-2">
          <div className="flex text-sm space-x-2 items-center">
            <p className="rounded-2xl bg-gray-600 px-2 py-1 w-20 text-center">
              Title
            </p>
            <p>1st anniversary</p>
          </div>
          <div className="flex text-sm space-x-2 items-center ">
            <p className="rounded-2xl bg-gray-600 px-2 py-1 w-24 text-center">
              Content
            </p>
            <p>Just awesome day! Me and Biju went to Jeju</p>
          </div>
        </div>
      </div>
      {/*달력 상세 페이지 종료 버튼*/}
      <button
        onClick={() => setDetail(false)}
        className="px-2 py-1 rounded-full bg-gray-800 text-gray-100 hover:bg-gray-700 mt-5"
      >
        Close
      </button>
    </div>
  );
};

export default CalendarDetail;
