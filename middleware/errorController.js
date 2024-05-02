exports.checkError = async (req, res, next) => {
    const {
        username,
        verifyPassword,
        password
    } = req.body;
    if (username === '') {
        return res.send('Oy walang laman yung username')
    }
    if (password === '' && verifyPassword === '') {
        return res.send('Oy walang laman yung password o verifypassword mo')
    }
    if (password !== verifyPassword) {
        return res.send('Oy hindi magkamuka yung password mosa verify!')
    }
    next()

}