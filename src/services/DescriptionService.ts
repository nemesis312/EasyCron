export function generateCronDescription(
    minute: string, 
    hour: string, 
    dayOfMonth: string, 
    month: string, 
    dayOfWeek: string
  ): string {
    let description = "The cron job will execute ";
  
    // Minute
    if (minute === '*') {
      description += "every minute";
    } else {
      description += `at minute ${minute}`;
    }
  
    // Hour
    if (hour === '*') {
      if (minute === '*') {
        description += " of every hour";
      } else {
        description += " of every hour";
      }
    } else {
      if (minute === '*') {
        description += ` of ${hour} o'clock`;
      } else {
        description += ` at ${hour} o'clock`;
      }
    }
  
    // Day of Month
    if (dayOfMonth === '*') {
      description += " of every day";
    } else {
      description += ` on the ${dayOfMonth}${getOrdinal(dayOfMonth)} day`;
    }
  
    // Month
    if (month === '*') {
      description += " of every month";
    } else {
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
      description += ` in ${months[parseInt(month) - 1]}`;
    }
  
    // Day of Week
    if (dayOfWeek !== '*') {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      description += ` on every ${days[parseInt(dayOfWeek)]}`;
    }
  
    return description;
  }
  
  function getOrdinal(n: string): string {
    const num = parseInt(n);
    const s = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }
  
  // Example usage:
  console.log(generateCronDescription('1', '*', '*', '*', '*')); // Every minute
  console.log(generateCronDescription('*', '1', '*', '*', '*')); // Every hour at minute 1
  console.log(generateCronDescription('*', '*', '12', '*', '*')); // Every month on the 12th day
  