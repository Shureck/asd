const userIdExtractor = incomingMessage => {
  return {
    "timezone": "UTC",
    "user.id": incomingMessage.headers["user-id"]
  };
};

module.exports = {
  options: {
    appendPlugins: ["postgraphile-plugin-connection-filter", "pg-relation-tag-plugin"],
    pgSettings: userIdExtractor,
    connection: `postgres://postgres:postgres@postgres:5432/postgres`,
    cors: true,
    schema: [
      "public"
    ],
    watch: true,
    bodySizeLimit: "100MB",
    maxPoolSize: 5
  },
};
