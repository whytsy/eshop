class JWT_Secret {
    getRefreshSecret() {
        const secret = process.env.JWT_SECRET_REFRESH
        if (!secret) {
            throw Error("Couldn't find JWT secret")
        }
        return secret
    }

    getAccessSecret() {
        const secret = process.env.JWT_SECRET_ACCESS
        if (!secret) {
            throw Error("Couldn't find JWT secret")
        }
        return secret
    }
}

export default new JWT_Secret()