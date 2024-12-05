import PlayGround from "&/three/playground";
import ThreeCanvas from "&/three/canvas";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="to:from-[#fff] flex flex-grow flex-col items-center justify-center bg-gradient-to-b from-[#333] via-[#fff] to-[#fff] text-white dark:bg-gradient-to-b dark:from-[#333] dark:via-[#000] dark:to-[#000]">
        <div className="flex w-full flex-grow">
          <ThreeCanvas>
            <PlayGround />
          </ThreeCanvas>
        </div>
      </main>
    </HydrateClient>
  );
}
