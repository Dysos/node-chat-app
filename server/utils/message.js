var generateMessage = (from,text) => {
    return {
        from, 
        text,
        createdAt: new Date().toString()
    };
};

module.exports = {generateMessage};