const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const dateFilter = require('nunjucks-date-filter')
const cors = require('cors')
const index = require('./routes/index');
const productRoute = require('./routes/product.routes');

class App {
  constructor () {
    this.express = express()
    this.http = require('http').createServer(this.express)
    this.io = require('socket.io')(this.http)
    this.websocket = null
    this.isDev = process.env.NODE_ENV !== 'production'
    
    this.cors()
    this.middlewares()
    this.routes()
    this.views()
  }

  cors () {
    this.express.use(cors())
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(express.json())
  }


  routes () {
    this.express.use(require('./routes'))
    this.express.use('/api/', productRoute)
    this.express.use(index)
  }

  views () {
    const env = nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    env.addFilter('date', dateFilter)

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  sendMessage (event, message) {
    this.io.sockets.emit(event, message)
  }

  start () {
    const port = process.env.PORT || 8000

    this.http.listen(port, () => {
      console.log(`API HTTP rodando na porta: ${port}`)
    })

    this.io.on('connection', socket => {
      console.log(`Painel conectado: ${socket.id}`)
    })
  }
}

class Singleton {
  constructor () {
    if (!Singleton.instance) {
      Singleton.instance = new App()
    }
  }

  getInstance () {
    return Singleton.instance
  }

  sendMessage (event, message) {
    console.log('Entrou')
    return Singleton.instance.sendMessage(event, message)
  }
}

module.exports = new Singleton()
