export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#1a0505] border-r border-red-900/30 p-4 hidden md:block">
      <h2 className="text-xl font-bold text-red-500 mb-6">
        E-CELL
      </h2>

      <nav className="flex flex-col gap-3 text-sm">
        <a
          href="#"
          className="p-2 rounded bg-red-950/60 text-white font-medium"
        >
          Dashboard
        </a>

        <a
          href="#"
          className="p-2 rounded text-gray-400 hover:text-white"
        >
          Events
        </a>

        <a
          href="#"
          className="p-2 rounded text-gray-400 hover:text-white"
        >
          Certificates
        </a>

        <a
          href="#"
          className="p-2 rounded text-gray-400 hover:text-white"
        >
          Profile
        </a>
      </nav>
    </aside>
  );
}