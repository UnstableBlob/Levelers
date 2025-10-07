import Image from "next/image";
import { useRouter } from "next/navigation";



export default function AboutUs()
{
    const router = useRouter();
    return(
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">


              <p className="relative">
                <button
        onClick={() => router.push("/test")}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "2rem"
        }}
      >          
      test
        </button>
                
              </p>
    </div>
    )
}