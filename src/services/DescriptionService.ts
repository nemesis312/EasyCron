export function generateCronDescription(
  minute: string, 
  hour: string, 
  dayOfMonth: string, 
  month: string, 
  dayOfWeek: string
): string {
  let description = "The cron job will execute ";

  // Handling minute
  if (minute === '*') {
    description += "every minute";
  } else if (minute.includes('/')) {
    const interval = minute.split('/')[1];
    description += `every ${interval} minutes`;
  } else {
    description += `at minute ${minute}`;
  }

  // Handling hour
  if (hour === '*') {
    if (minute === '*') {
      description += " of every hour";
    } else {
      description += " of every hour";
    }
  } else if (hour.includes('/')) {
    const interval = hour.split('/')[1];
    if (minute === '*') {
      description += ` of every ${interval} hours`;
    } else {
      description += `, every ${interval} hours`;
    }
  } else {
    if (minute === '*') {
      description += ` of hour ${hour}`;
    } else {
      description += ` at ${hour} o'clock`;
    }
  }

  // Handling day of month
  if (dayOfMonth === '*') {
    description += ", every day";
  } else if (dayOfMonth.includes('/')) {
    const interval = dayOfMonth.split('/')[1];
    description += `, every ${interval} days of the month`;
  } else {
    description += `, on the ${dayOfMonth}${getOrdinal(dayOfMonth)} day`;
  }

  // Handling month
  if (month === '*') {
    description += ", every month";
  } else if (month.includes('/')) {
    const interval = month.split('/')[1];
    description += `, every ${interval} months`;
  } else {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    description += `, in ${months[parseInt(month) - 1]}`;
  }

  // Handling day of week
  if (dayOfWeek === '*') {
    description += "";
  } else if (dayOfWeek.includes('/')) {
    const interval = dayOfWeek.split('/')[1];
    description += `, every ${interval} days of the week`;
  } else {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    description += `, on every ${days[parseInt(dayOfWeek)]}`;
  }

  return description.trim() + ".";
}

// Helper function for ordinal numbers
function getOrdinal(n: string): string {
  const num = parseInt(n);
  const s = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
