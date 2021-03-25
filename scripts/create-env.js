const fs = require('fs') // Requiere file system, para trabajar directamente con el so y poder guardar o envair datos
fs.writeFileSync('./.env',`API=${process.env.API}\n`)