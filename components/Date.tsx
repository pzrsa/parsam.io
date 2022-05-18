import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface DateProps {
  dateString: string;
}

const Date: React.FC<DateProps> = ({ dateString }) => {
  dayjs.extend(customParseFormat);
  const date = dayjs(dateString).format("MMMM D, YYYY");
  return <time dateTime={dateString}>{date}</time>;
};

export default Date;
