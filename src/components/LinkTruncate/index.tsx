import { useEffect, useState } from "react";

export default function LinkTruncate({
  name,
  link,
}: {
  name: string;
  link: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile(); // primeira verificação
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const texto = isMobile
    ? name.slice(0, 40) + (name.length > 40 ? "..." : "")
    : name;

  return (
    <a
      href={link}
      target="_blank"
      className="text-lg sm:text-2xl hover:text-slate-900 transition duration-200 pr-28"
    >
      {texto}
    </a>
  );
}
