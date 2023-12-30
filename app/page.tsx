"use client";
import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, BotIcon, SendIcon, Loader } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);

  const handleLoading = () => setLoading((prev) => !prev);

  const handleSubmit = async (event: any) => {
    if (!loading) {
      handleLoading();
      event.preventDefault();
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const { answer } = await res.json();
      console.log(answer);
      setResponses([...responses, { query: userInput, answer }] as any);
      setUserInput("");
      handleLoading();
    }
  };

  const renderMessage = (Icon: ReactNode, value: string) => (
    <div className="flex items-start gap-3 mb-3">
      <div className="p-2 rounded-full bg-zinc-600">{Icon}</div>
      <p className="text-white text-justify items-center">{value}</p>
    </div>
  );

  return (
    <div className="w-full h-[100vh] flex flex-col items-center p-5 gap-4 bg-black">
      <div className="rounded-md bg-rose-50x p-4 flex-1 overflow-y-auto">
        {responses.map((res: any, index) => (
          <div className="font-bold text-lg" key={index}>
            {renderMessage(<User color="#fff" />, res?.query)}
            {renderMessage(<BotIcon color="#fff" />, res?.answer)}
          </div>
        ))}
      </div>
      <form
        className="w-full flex gap-4 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          value={userInput}
          className="w-1/2"
          placeholder="ask any question"
          onChange={(e: any) => setUserInput(e.target.value)}
        />
        <Button className="px-4 py-4 bg-blue-600" type="submit">
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              Send
              <SendIcon className="ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
