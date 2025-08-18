export function handleShareBlog(blog: any, url?: string) {
  if (navigator.share) {
    navigator
      .share({
        title: blog?.title,
        text: blog?.description,
        url: url || window.location.href,
      })
      .then(() => {
        console.log("Berhasil dishare");
      })
      .catch((err) => {
        console.error("Gagal share:", err);
      });
  } else {
    alert("Browser belum support Web Share");
  }
}
