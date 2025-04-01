import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export type DateInput = string | number | Date | Dayjs;
export type TimezoneInput = "system" | number | string | undefined;

export { dayjs, Dayjs };

export const systemTimezone = "Asia/Taipei";

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const systemDate = (...args: Parameters<typeof dayjs>) => {
  return dayjs(...args).tz(systemTimezone);
};

export const getDate = (date: DateInput, timezone?: TimezoneInput) => {
  if (timezone === "system" || timezone === "unknown") {
    return systemDate(date);
  }

  if (typeof timezone === "number") {
    return dayjs(date).utcOffset(timezone);
  }

  if (typeof timezone === "string") {
    // 自動處理夏令時，更容易理解和維護，符合最佳實踐
    return dayjs(date).tz(timezone);
  }

  return dayjs(date);
};

export const systemNow = () => {
  return systemDate();
};

export const getTimezoneOffset = () => {
  return -(new Date().getTimezoneOffset() / 60);
};

export const format = (date: DateInput, timezone?: TimezoneInput, pattern: string = "MM/DD/YYYY, HH:mm:ss") => {
  return getDate(date, timezone).format(pattern);
};

export const isSameDay = (date1: DateInput, date2: DateInput, timezone?: TimezoneInput) => {
  return getDate(date1, timezone)
    .isSame(getDate(date2, timezone), "date");
};

export const isYesterday = (date: DateInput, timezone?: TimezoneInput) => {
  return isSameDay(date, systemNow().subtract(1, "day"), timezone);
};

export const isAfter = (date1: DateInput, date2: DateInput, timezone?: TimezoneInput) => {
  return getDate(date1, timezone)
    .isAfter(getDate(date2, timezone));
};

export const isBefore = (date1: DateInput, date2: DateInput, timezone?: TimezoneInput) => {
  return getDate(date1, timezone)
    .isBefore(getDate(date2, timezone));
};

export const endOfDay = (date: DateInput, timezone?: TimezoneInput) => {
  return getDate(date, timezone).endOf("day").format("MM/DD/YYYY, HH:mm:ss");
};

export const diffDate = (date1: DateInput, date2: DateInput, timezone?: TimezoneInput) => {
  return getDate(date1, timezone).startOf("day").diff(getDate(date2, timezone).startOf("day"), "day");
};

export const isToday = (date: DateInput, timezone?: TimezoneInput) => {
  return isSameDay(systemNow().toDate(), date, timezone);
};

export interface DateRange {
  start: Dayjs;
  end: Dayjs;
}

export const dateRange: Record<string, () => DateRange> = {
  today() {
    const date = systemNow();

    return {
      start: date.startOf("day"),
      end: date.endOf("day")
    };
  },
  yesterday() {
    const date = systemNow().startOf("day").subtract(1, "day");

    return {
      start: date,
      end: date.endOf("day")
    };
  },
  before_yesterday() {
    const date = systemNow().startOf("day").subtract(2, "day");

    return {
      start: date,
      end: date.endOf("day")
    };
  },
  week() {
    const date = systemNow().startOf("week");

    return {
      start: date,
      end: date.endOf("week")
    };
  },
  last_week() {
    const date = systemNow().startOf("week").subtract(1, "second").startOf("week");

    return {
      start: date,
      end: date.endOf("week")
    };
  },
  before_last_week() {
    const date = systemNow()
      .startOf("week").subtract(1, "second")
      .startOf("week").subtract(1, "second")
      .startOf("week");

    return {
      start: date,
      end: date.endOf("week")
    };
  },
  last_month() {
    const date = systemNow().startOf("month").subtract(1, "second").startOf("month");

    return {
      start: date,
      end: date.endOf("month")
    };
  },
  month_before_last() {
    const date = systemNow()
      .startOf("month").subtract(1, "second")
      .startOf("month").subtract(1, "second")
      .startOf("month");

    return {
      start: date,
      end: date.endOf("month")
    };
  }
};

export const formatDurationShort = (date: DateInput, locale: "zh-CN" | "en") => {
  const now = systemNow();
  const diff = now.diff(getDate(date), "minute");

  const days = Math.floor(diff / 1440);
  const hours = Math.floor((diff % 1440) / 60);
  const mins = diff % 60;

  const units = {
    "zh-CN": { d: " 天", h: " 小时", m: " 分钟" },
    "en": { d: "d", h: "h", m: "m" },
  };

  const unit = units[locale] || units["en"];

  if (days > 0) {
    return `${days}${unit.d}`;
  };
  if (hours > 0) {
    return `${hours}${unit.h}`;
  };
  if (mins > 0) {
    return `${mins}${unit.m}`;
  };

  return `0${unit.m}`;
};
