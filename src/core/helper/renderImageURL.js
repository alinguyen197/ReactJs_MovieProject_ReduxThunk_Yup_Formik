export const renderImageUrl = (url) => {
  if (!url) return;
  if (!url.includes("https")) return url.replace("http", "https");
  return url;
};
