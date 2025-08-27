export function formatDate(d) {
    const newdate = new Date(d);
    const weekday = newdate.toLocaleString('en-US', { weekday: 'short' });
    const month = newdate.toLocaleString('en-US', { month: 'short' });
    const date = newdate.getDate();
    const year = newdate.getFullYear();
    return `${weekday} ${date} ${year}`;
  }