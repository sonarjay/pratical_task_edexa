module.exports = {
    connectionType: 'local',
    option: {
        autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect , [ it's Number larger than Max_Value are represented as infiniy ]
        reconnectInterval: 500, // Reconnect every 500ms
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        promiseLibrary: global.Promise,
    },
    local: {
        mode: 'local',
        mongo: {
            host: 'localhost',
            port: 27017,
            user: 'root',
            password: '',
            database: 'empDB'
        }

    }
}