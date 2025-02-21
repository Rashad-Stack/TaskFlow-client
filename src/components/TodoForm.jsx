import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useFetcher, useSearchParams } from "react-router";

export default function TodoForm() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const dialog = searchParams.get("dialog");
  const fetcher = useFetcher();
  return (
    <>
      <div className="w-full max-w-lg px-4">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <fetcher.Form
            action={`/${dialog}/?dialog=${dialog}&category=${categoryParam}`}
            method="POST"
            className="space-y-6">
            <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
              <Legend className="text-base/7 font-semibold">
                Task Details
              </Legend>
              <Field>
                <Label className="text-sm/6 font-medium">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className={clsx(
                    "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                />
              </Field>

              <Field>
                <Label className="text-sm/6 font-medium">Description</Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  required
                  className={clsx(
                    "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                />
              </Field>

              <Field>
                <Label className="text-sm/6 font-medium">Category</Label>
                <div className="relative">
                  <Select
                    id="category"
                    name="category"
                    required
                    className={clsx(
                      "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}>
                    {categories.map((category) => (
                      <option
                        selected={categoryParam === category}
                        key={category}
                        value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                  <ChevronDownIcon
                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                    aria-hidden="true"
                  />
                </div>
              </Field>

              <Button
                type="submit"
                disabled={fetcher.state === "submitting"}
                className="flex w-full justify-center rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                {fetcher.state === "submitting" ? "Adding..." : "Add"}
              </Button>
            </Fieldset>
          </fetcher.Form>
        </div>
      </div>
    </>
  );
}

const categories = ["To-Do", "In Progress", "Done"];
