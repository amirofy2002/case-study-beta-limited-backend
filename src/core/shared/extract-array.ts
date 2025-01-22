export const extractArray = (text: string) => {
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  const trimmedText = text.substring(start, end + 1);
  return trimmedText.replaceAll('\n', '');
};
