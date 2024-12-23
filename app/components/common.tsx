import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface DateProps {
  dateString: string;
  format: string;
}

export const ExternalLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      rel="prefetch noreferrer"
      target="_blank"
      className={className}
    >
      {children}
    </a>
  );
};

export const DateFormat: React.FC<DateProps> = ({ dateString, format }) => {
  dayjs.extend(customParseFormat);
  return <time dateTime={dateString}>{dayjs(dateString).format(format)}</time>;
};
