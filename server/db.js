const typeorm = require('typeorm');

class Creator {
    constructor(id, name, img, url) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.url = url;
    }
}

const EntitySchema = require('typeorm').EntitySchema;

const CreatorSchema = new EntitySchema({
    name: 'Creator',
    target: Creator,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        img: {
            type: "text"
        },
        url: {
            type: "text"
        }

    }
})

async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "password",
        database: "testscraper_creators",
        synchronize: true,
        logging: false,
        entities: [
            CreatorSchema
        ]
    })
}

async function getAllCreators() {
    const connection = await getConnection()
    const creatorRepo = connection.getRepository(Creator)
    const creators = await creatorRepo.find()
    connection.close()

    return creators
}

async function insertCreator(name, tag, url) {
    const connection = await getConnection()

    const creator = new Creator()
    creator.name = name
    creator.tag = tag
    creator.url = url

    const creatorRepo = connection.getRepository(Creator)
    const res = await creatorRepo.save(creator)

    const allCreators = await creatorRepo.find()
    connection.close()
    return allCreators
}


module.exports = {
    getAllCreators,
    insertCreator
}