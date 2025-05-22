interface NotCheckworthyBadgeProps {
  text?: string;
}

export default function NotCheckworthyBadge({
  text,
}: NotCheckworthyBadgeProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
      {text || "Not Checkworthy"}
    </span>
  );
}
