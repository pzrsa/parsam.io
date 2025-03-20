import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ReactNode } from "react";

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
        className="flex flex-col sm:flex-row gap-4 mt-2"
      >
        <input
          type="email"
          name="email"
          placeholder="saul@bettercallsaul.com"
          required
          className="flex-1 px-4 py-2 border-2 border-black focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white uppercase font-bold tracking-wider border-2 border-black hover:bg-white hover:text-black transition-colors"
        >
          Subscribe
        </button>
      </form>
    </>
  );
};
