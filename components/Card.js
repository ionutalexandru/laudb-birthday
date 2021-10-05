import { MDXRemote } from "next-mdx-remote";

export default function Card({ title, position, source }) {
  return (
    <div className="text-left py-4 px-8 bg-white shadow-2xl md:rounded-lg w-full h-full overflow-auto">
      <div>
        <h1 className="text-gray-800 text-4xl font-semibold">{title}</h1>
        <div className="mt-2 text-gray-600 place-description">
          <MDXRemote {...source} />
        </div>
      </div>
      <div className="flex justify-end my-4">
        <a
          href={`https://www.google.com/maps?saddr=My+Location&daddr=${position.join(
            ","
          )}`}
          target="_blank"
          className="text-xl font-medium text-indigo-500"
        >
          Google Maps
        </a>
      </div>
    </div>
  );
}
