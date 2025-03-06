export const calculateTimeLapsed = (startTime: Date): number => {
  const now = new Date();
  if (now < startTime) return 0;
  return now.getTime() - startTime.getTime();
};

export const calculateBalanceTime = (endTime: Date): number => {
  const now = new Date();
  if (now > endTime) return 0;
  return endTime.getTime() - now.getTime();
};
