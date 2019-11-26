module.exports = {
    jwt: {
        access: {
            expiresIn: '1h',
            key: "e0eebdb5b9eecf9e5375db572dc234528dfc5369882e587b57059c0e2bf6cb9d79dfd48e196a0a984ea8988d8a236196d8387558ea199d33e4ac4771f71b6f5a"
        },
        refresh: {
            expiresIn: '5h',
            key: "46d9c482733678a62879a8850b83cc4f584a3869ea412e2c8d96fdb80c2ad2040a683d81d0fd616365b4f84999baf8faafc2761c9a804cec9608d9e9ee3ecfa6"
        },
    },
    mongoUri: 'mongodb://localhost:27017/myAPI',
    PORT: 3000
};