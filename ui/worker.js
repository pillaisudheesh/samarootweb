export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      const targetUrl = new URL(
        url.pathname + url.search,
        "https://marketing-api.samaroot.in",
      );

      const headers = new Headers(request.headers);
      headers.delete("host");

      const apiRequest = new Request(targetUrl, request);
      headers.forEach((value, key) => {
        apiRequest.headers.set(key, value);
      });

      return fetch(apiRequest);
    }

    return env.ASSETS.fetch(request);
  },
};
