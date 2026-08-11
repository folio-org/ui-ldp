// Renders a failed response as a human-readable message, digging the
// detail out of the JSON body when there is one. Used both by loadData
// for WSAPI calls and by the raw fetches that we make against GitHub
// and GitLab, which do not go through Okapi and so cannot use loadData.
//
async function httpErrorMessage(intl, res) {
  const text = await res.text();
  let detail = text;
  if (text.startsWith('{')) {
    try {
      detail = JSON.parse(text).message;
    } catch (e) {
      detail = text;
    }
  }

  return intl.formatMessage(
    { id: 'ui-ldp.error.http' },
    { status: res.status, text: res.statusText, detail },
  );
}

export default httpErrorMessage;
