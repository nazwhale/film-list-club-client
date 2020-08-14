export function capitalizeFirstLetterOfEachWord(string) {
  return string.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}
