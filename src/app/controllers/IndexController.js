
class IndexController {
  async tela (req, res) {
    return res.render('index')
  }
}

module.exports = new IndexController()
