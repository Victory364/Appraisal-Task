export function formatMoney(amount, currency) {
  const symbol = typeof currency === 'string'
    ? (currency === 'NGN' ? '₦' : currency)
    : (currency?.symbol || '₦');
  return `${symbol}${Number(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatMoneyNoDecimals(amount, currency) {
  const symbol = typeof currency === 'string'
    ? (currency === 'NGN' ? '₦' : currency)
    : (currency?.symbol || '₦');
  return `${symbol}${Number(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function parseDateTaken(dateStr) {
  const monthsMap = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };
  let startMonth = 4; // May
  let startYear = 2026;
  if (dateStr) {
    const parts = dateStr.split(/[\s,]+/);
    for (const part of parts) {
      const clean = part.toLowerCase().substring(0, 3);
      if (monthsMap[clean] !== undefined) {
        startMonth = monthsMap[clean];
      } else if (/^\d{4}$/.test(part)) {
        startYear = parseInt(part, 10);
      }
    }
  }
  return { startMonth, startYear };
}

export function addDaysToDateString(dateStr, daysToAdd) {
  const monthsMap = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };
  const monthsArr = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  let startDay = 1;
  let startMonth = 4; // May
  let startYear = 2026;
  
  if (dateStr) {
    const parts = dateStr.split(/[\s,]+/);
    for (const part of parts) {
      const clean = part.toLowerCase().substring(0, 3);
      if (monthsMap[clean] !== undefined) {
        startMonth = monthsMap[clean];
      } else if (/^\d{4}$/.test(part)) {
        startYear = parseInt(part, 10);
      } else if (/^\d{1,2}$/.test(part)) {
        startDay = parseInt(part, 10);
      }
    }
  }

  const date = new Date(startYear, startMonth, startDay);
  date.setDate(date.getDate() + daysToAdd);
  
  const mName = monthsArr[date.getMonth()];
  return `${date.getDate()} ${mName}, ${date.getFullYear()}`;
}

export function getApprovalAndDisbursalDates(dateTakenStr) {
  const monthsMap = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };
  let day = 25;
  let month = 4; // May
  let year = 2026;
  if (dateTakenStr) {
    const parts = dateTakenStr.split(/[\s,]+/);
    for (const part of parts) {
      const clean = part.toLowerCase().substring(0, 3);
      if (monthsMap[clean] !== undefined) {
        month = monthsMap[clean];
      } else if (/^\d{4}$/.test(part)) {
        year = parseInt(part, 10);
      } else if (/^\d{1,2}$/.test(part)) {
        day = parseInt(part, 10);
      }
    }
  }
  
  const disbursalDate = new Date(year, month, day);
  const approvalDate = new Date(year, month, day);
  approvalDate.setDate(disbursalDate.getDate() - 16);
  
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  return {
    approvalDateStr: formatter.format(approvalDate),
    disbursalDateStr: formatter.format(disbursalDate)
  };
}
