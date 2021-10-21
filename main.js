const NodeA = require("./nodeA")

async function program() {

    const nodeA = new NodeA()
    nodeA.start()
}

program();