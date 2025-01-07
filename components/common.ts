export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    return formatted;
  } catch (e) {
    return dateString;
  }
};