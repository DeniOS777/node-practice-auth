app.get("/drinks/:search", async (req, res) => {
  const { search } = req.params;
  const array = search.split(",");
  
