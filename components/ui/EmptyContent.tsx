export default function EmptyContent({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-4 mt-16 grid grid-cols-1 place-items-center text-center text-gray-200 text-opacity-30">{children}</span>
  );
}
