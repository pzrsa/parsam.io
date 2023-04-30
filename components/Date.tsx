import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface DateProps {
  dateString: string;
  format: string;
}

const Date: React.FC<DateProps> = ({ dateString, format }) => {
  dayjs.extend(customParseFormat);
  return <time dateTime={dateString}>{dayjs(dateString).format(format)}</time>;
};

export default Date;
