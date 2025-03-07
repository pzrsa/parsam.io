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

export const SubscribeForm = () => {
  return (
    <>
      <p>Subscribe to get new posts in your inbox - spam-free, always.</p>

      <form
        action="https://buttondown.email/api/emails/embed-subscribe/parsam"
        method="post"
        target="_blank"
        className="flex gap-2"
      >
        <input
          type="email"
          name="email"
          placeholder="saul@bettercallsaul.com"
          required
          className="flex-1 px-2 py-1 border rounded-sm"
        />
        <button type="submit" className="px-3 py-1 border rounded-sm">
          Subscribe
        </button>
      </form>
    </>
  );
};
