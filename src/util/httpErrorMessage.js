// The equivalent, for the raw fetches that we make against GitHub and
// GitLab, of the error that loadData composes for WSAPI calls. Those
// fetches do not go through Okapi, so they cannot use loadData itself.
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
