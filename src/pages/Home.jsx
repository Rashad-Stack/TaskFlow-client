import { ScrollRestoration } from "react-router";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col my-2 lg:max-w-5xl mx-auto">
      <Header />
      <main className="flex-1">
        <ScrollRestoration />
      </main>
    </div>
  );
}
