import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import Button from "../Button/Button";
import { ReactNode, useState } from "react";
import { DateTime } from "luxon";
import { Calendar, CalendarProps } from "../calendar";
import { DateLib, isDateRange, isDatesArray } from "react-day-picker";
// import { DayPickerProps as ReactDayPickerProps } from "react-day-picker";

type DatePickerProps = CalendarProps & {
  placeholder?: string;
};
const DatePicker: React.FC<DatePickerProps> = ({ placeholder, ...props }) => {
  const [open, setOpen] = useState(false);

  const renderDate = (): ReactNode => {
    let value: ReactNode =
      placeholder ?? DateTime.now().toFormat("LLL dd, yyyy");

    if (!props.mode) return value;

    if (!props.selected) return value;

    if (props.selected instanceof Date) {
      value = DateTime.fromJSDate(props.selected).toFormat("LLL dd, yyyy");
    }

    if (isDatesArray(props.selected, new DateLib())) {
      value = `${DateTime.fromJSDate(props.selected[0]).toFormat(
        "LLL dd, yyyy"
      )} - ${DateTime.fromJSDate(
        props.selected[props.selected.length - 1]
      ).toFormat("LLL dd, yyyy")}`;
    }

    if (isDateRange(props.selected)) {
      value = `${DateTime.fromJSDate(props.selected.from as Date).toFormat(
        "LLL dd, yyyy"
      )} - ${DateTime.fromJSDate(props.selected.to as Date).toFormat(
        "LLL dd, yyyy"
      )}`;
    }
    return <span className="">{value}</span>;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>{renderDate()}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar {...props} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
