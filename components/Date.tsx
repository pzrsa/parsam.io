import { format, parseISO } from "date-fns";

interface DateProps {
  dateString: string;
}

const Date: React.FC<DateProps> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};

export default Date;
