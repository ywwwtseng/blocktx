export const TimeUnitMsMap = new Map([
  [/^(\d+)d$/, (match: RegExpExecArray) => parseInt(match[1], 10) * 24 * 60 * 60 * 1000],
  [/^(\d+)h$/, (match: RegExpExecArray) => parseInt(match[1], 10) * 60 * 60 * 1000],
  [/^(\d+)m$/, (match: RegExpExecArray) => parseInt(match[1], 10) * 60 * 1000],
  [/^(\d+)s$/, (match: RegExpExecArray) => parseInt(match[1], 10) * 1000],
]);

export const ms = (input: string) => {
  for (const [regex, calc] of TimeUnitMsMap) {
    const match = regex.exec(input);
    if (match) {
      return calc(match);
    }
  }

  throw new Error('No match any time format.');
}

export const slot = (date: Date | number, interval = ms('15m')) => {
  date = typeof date === 'number' ? new Date(date) : date;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const totalMilliseconds = 
    (hours * 60 * 60 * 1000) +
    (minutes * 60 * 1000) +
    (seconds * 1000) +
    milliseconds;

  const slot = Math.floor(totalMilliseconds / interval);

  const startOfSlotMilliseconds = slot * interval;
  const endOfSlotMilliseconds = (slot + 1) * interval;

  const startTimestamp = date.setHours(0, 0, 0, 0) + startOfSlotMilliseconds;
  const endTimestamp = date.setHours(0, 0, 0, 0) + endOfSlotMilliseconds;
  const time = startTimestamp + ((endTimestamp - startTimestamp) / 2);

  return {
    start: startTimestamp,
    end: endTimestamp,
    time,
  };
}