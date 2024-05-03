async function fetchPageContent(url, pluginServer) {
  const response = await fetch(
    `${pluginServer}/get-content?url=${encodeURIComponent(url)}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch web content: ${response.status} - ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.responseObject;
}

async function read_web_page_content(params, userSettings) {
  const { url } = params;
  const { pluginServer } = userSettings;

  if (!pluginServer) {
    throw new Error(
      'Missing plugin server URL. Please set it in the plugin settings.'
    );
  }

  const cleanPluginServer = pluginServer.replace(/\/$/, '');

  try {
    return await fetchPageContent(url, cleanPluginServer);
  } catch (error) {
    console.error('Error summarizing webpage:', error);
    return 'Error: Unable to generate a summary. Please try again later.';
  }
}
