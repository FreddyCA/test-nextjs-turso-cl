import InputMessages from "./ui/inputMessages";
import ListMessages from "./ui/listMessages";

// export const runtime = "edge";

export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-center  py-16 bg-slate-200">
      <div className="w-[50%] h-full overflow-hidden flex gap-5 flex-col">
        <InputMessages />
        <ListMessages />
      </div>
    </div>
  );
}
