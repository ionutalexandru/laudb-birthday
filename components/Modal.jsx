import { MDXRemote } from "next-mdx-remote";
import * as React from "react";

const Bike = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6 ml-2 inline-block hover:no-underline"
  >
    <path
      d="M5 20.5A3.5 3.5 0 0 1 1.5 17A3.5 3.5 0 0 1 5 13.5A3.5 3.5 0 0 1 8.5 17A3.5 3.5 0 0 1 5 20.5M5 12a5 5 0 0 0-5 5a5 5 0 0 0 5 5a5 5 0 0 0 5-5a5 5 0 0 0-5-5m9.8-2H19V8.2h-3.2l-1.94-3.27c-.29-.5-.86-.83-1.46-.83c-.47 0-.9.19-1.2.5L7.5 8.29C7.19 8.6 7 9 7 9.5c0 .63.33 1.16.85 1.47L11.2 13v5H13v-6.5l-2.25-1.65l2.32-2.35m5.93 13a3.5 3.5 0 0 1-3.5-3.5a3.5 3.5 0 0 1 3.5-3.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m0-8.5a5 5 0 0 0-5 5a5 5 0 0 0 5 5a5 5 0 0 0 5-5a5 5 0 0 0-5-5m-3-7.2c1 0 1.8-.8 1.8-1.8S17 1.2 16 1.2S14.2 2 14.2 3S15 4.8 16 4.8z"
      fill="currentColor"
    ></path>
  </svg>
);

export default function Modal({
  title = null,
  content = null,
  imageSrc = "sample_image.png",
  isOpen = false,
  onClose = null,
  position = [],
}) {
  if (!isOpen) return null;
  const modalContentRef = React.useRef(null);
  const onClickModal = ({ target, code }) => {
    if (target !== modalContentRef.current || code === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", ({ code }) => {
      if (code === "Escape") onClose();
    });
  }, []);

  return (
    <div
      onClick={onClickModal}
      className="absolute bg-black bg-opacity-30 h-screen w-screen z-10"
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <div className="relative text-left antialiased w-full md:max-w-screen-md h-full md:md:h-4/5 shadow-2xl">
          <div className="absolute z-40 top-4 md:-top-4 right-4 md:-right-4">
            <button className="rounded-full bg-white p-2" onClick={onClose}>
              <svg
                className="inline-block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <line
                  x1={2}
                  y1={2}
                  x2={18}
                  y2={18}
                  stroke="black"
                  strokeWidth={4}
                  strokeLinecap="round"
                />
                <line
                  x1={18}
                  y1={2}
                  x2={2}
                  y2={18}
                  stroke="black"
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div
            className="relative w-full h-full overflow-auto bg-black md:rounded-lg"
            ref={modalContentRef}
          >
            <div className="absolute md:rounded-lg inset-0 z-20 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
            <div className="flex flex-col h-full max-w-screen-md text-white">
              <div className="relative w-full h-1/2">
                <img
                  src={imageSrc}
                  className="md:rounded-r-lg object-cover h-full w-full"
                />
                <div className="absolute bottom-0 text-white font-bold z-40 p-8">
                  <h1 className="text-4xl pb-3">{title}</h1>
                  <a
                    href={`https://www.google.com/maps?saddr=My+Location&daddr=${position.join(
                      ","
                    )}`}
                    target="_blank"
                    className="text-xl font-medium hover:underline"
                  >
                    <span>Oye, Laura, llévame en tu</span>
                    <Bike />
                  </a>
                </div>
              </div>
              <div className="w-full z-30 flex-auto p-8">
                <div className="place-description">
                  {!content ? null : <MDXRemote {...content} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
