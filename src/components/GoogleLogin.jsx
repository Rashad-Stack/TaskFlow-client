import { Button } from "@headlessui/react";
import { useFetcher } from "react-router";
export default function GoogleLogin() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/google-login">
      <Button
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white cursor-pointer"
        type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="24px"
          height="24px">
          <path
            fill="#4285F4"
            d="M24 9.5c3.1 0 5.2 1.3 6.4 2.4l4.7-4.7C31.8 4.5 28.2 3 24 3 14.8 3 7.3 9.8 5.1 18.5l5.9 4.6C12.7 15.5 17.9 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.5 24.5c0-1.6-.1-2.8-.3-4.1H24v8.1h12.7c-.5 2.7-2 5-4.2 6.5l6.5 5.1c3.8-3.5 6-8.6 6-14.6z"
          />
          <path
            fill="#FBBC05"
            d="M10.9 28.1c-1.1-3.2-1.1-6.8 0-10l-5.9-4.6C2.1 17.1 1 20.4 1 24s1.1 6.9 3 9.9l6-4.6z"
          />
          <path
            fill="#EA4335"
            d="M24 46c5.4 0 9.9-1.8 13.2-4.9l-6.5-5.1c-1.8 1.2-4.1 1.9-6.7 1.9-6.1 0-11.3-4.1-13.1-9.7l-6 4.6C7.3 41.2 14.8 46 24 46z"
          />
          <path fill="none" d="M0 0h48v48H0z" />
        </svg>

        <span>Sign in with Google</span>
      </Button>
    </fetcher.Form>
  );
}
