import Image from "next/image";



export default function Hero() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 sm:p-20 relative">
      <div className="w-full flex justify-center">
                <p className=" relative -translate-y-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-white leading-tight max-w-4xl " style={{textShadow: '0 0 10px #ffffffff, 0 0 0px #fff'}}>
          Turning inspiration into seamless, brilliant execution.
        </p>
      </div>
    </div>
  );
}