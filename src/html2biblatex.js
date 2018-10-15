(() => {
  function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }

  function jsDate2bibTex(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    // Add zero prefix:
    if (dd < 10) {
      dd = `0${dd}`;
    }

    // Add zero prefix:
    if (mm < 10) {
      mm = `0${mm}`;
    }

    // create string for date:
    return `${yyyy}-${mm}-${dd}`;
  }

  const title = document.title;
  const url = document.URL;

  // get author if meta tag exists:
  const author_tag = document.querySelector("[name=author]");
  const author = author_tag == null ? "" : author_tag.content;

  const today = new Date();
  const urldate = jsDate2bibTex(today);

  const date = jsDate2bibTex(new Date(document.lastModified));

  // remove special characters for citation key:
  let title_key = title.replace(/[^0-9a-z]/gi, "");

  // create citation key:
  const citationKey = `${title_key}-${date}`;

  const type = "@Online";
  const filename = `:./references/${window.location.pathname
    .slice(1)
    .replace(/\//g, "-")}.html:html`;

  // Replace german umlauts with latex commands:
  let title_tex = title
    .replace(/\u00e4/g, '\\"a')
    .replace(/\u00c4/g, '\\"A')
    .replace(/\u00f6/g, '\\"o')
    .replace(/\u00d6/g, '\\"O')
    .replace(/\u00fc/g, '\\"u')
    .replace(/\u00dc/g, '\\"U')
    .replace(/\u00DF/g, '\\"s');

  // generate BiBTeX entry:
  const bibTexEntry = `${type} {${citationKey},\n\
\ \ title = {${title_tex}},\n\
\ \ date = {${date}},\n\
${author ? `\ \ author = {${author}},\n` : ""}\
\ \ file = {${filename}},\n\
\ \ url = {${url}},\n\
\ \ urldate = {${urldate}},\n\
\ \ note = {Visited on ${urldate}},\n\
}`;

  copyToClipboard(bibTexEntry);
})();
