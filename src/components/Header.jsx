import Avatar, { genConfig } from "react-nice-avatar";
import { Link } from "react-router";
import Logout from "./Logout";

export default function Header() {
  const config = genConfig();

  return (
    <header>
      <div className="flex justify-between items-center py-4 px-8">
        <Link to="/">
          <h1 className="text-2xl lg:text-4xl font-bold">TaskFlow</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10" {...config} />
          <Logout />
        </div>
      </div>
    </header>
  );
}
