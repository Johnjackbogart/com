import { ElevenLabsClient } from "elevenlabs";
import ThreeCanvas from "&/three/canvas";
import { TRPCReactProvider } from "@/trpc/react";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVEN, // Defaults to process.env.ELEVENLABS_API_KEY
});

const audio = await elevenlabs.generate({
  voice: "Sarah",
  text: "Hello! 你好! Hola! नमस्ते! Bonjour! こんにちは! مرحبا! 안녕하세요! Ciao! Cześć! Привіт! வணக்கம்!",
  model_id: "eleven_multilingual_v2",
});

export default async function Home() {
  const v = await elevenlabs.voices.getAll();
  console.log(v);
  return (
    <TRPCReactProvider>
      <main className="to:from-[#fff] flex flex-grow flex-col items-center justify-center bg-gradient-to-b from-[#333] via-[#fff] to-[#fff] text-white dark:bg-gradient-to-b dark:from-[#333] dark:via-[#000] dark:to-[#000]">
        <div className="flex w-full flex-grow">
          <ThreeCanvas />
        </div>
      </main>
    </TRPCReactProvider>
  );
}
