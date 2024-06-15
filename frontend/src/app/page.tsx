import Chat from "@/components/Chat";

export default function Home() {
  return (
    <div className="container mx-auto">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <h1 className="mx-auto">OffdoutChat</h1>
      <Chat />
    </div>
  );
}
