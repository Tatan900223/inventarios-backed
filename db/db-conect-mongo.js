// Importamos mongoose
const mongoose = require('mongoose');

const getConnection = async () => {

    try {

        const url = 'mongodb://adminiud:U1b1WNgU9sNSZetH@ac-ejoqbfv-shard-00-00.qbplsal.mongodb.net:27017,ac-ejoqbfv-shard-00-01.qbplsal.mongodb.net:27017,ac-ejoqbfv-shard-00-02.qbplsal.mongodb.net:27017/inventariosiud?ssl=true&replicaSet=atlas-e3vo6q-shard-0&authSource=admin&retryWrites=true&w=majority&appName=AtlasCluster'
    
    await mongoose.connect(url);

    console.log('Conexion exitosa');

    } catch (error) {
        console.log(error);
    }

    
}

module.exports = {
    getConnection,
}