export default {
  create: (req, res) => {
    res.send('create route');
  },
  adduser: (req, res) => {
    const id = req.params.id;
    res.send(`adduser route, id: ${id}`);
  },
  postmessage: (req, res) => {
    const id = req.params.id;
    res.send(`postmessage route, group id: ${id}`);
  },
  getmessages: (req, res) => {
    const id = req.params.id;
    res.send(`getmessages route, group id: ${id}`);
  }
};
