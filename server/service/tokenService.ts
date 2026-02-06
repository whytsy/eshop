import jwt, { type JwtPayload } from 'jsonwebtoken'
import JWT_Secret from '../helpers/JWTSecret'
import { UserDto } from '../dto/User.dto'
import { type ROLE } from '../middleware/roleMiddleware'
import { DbErrorHandler } from '../errors/DbErrorHandler'
import { Transaction } from 'sequelize'
import { Token } from '../database/models/index'

interface DecodedToken extends JwtPayload {
    id: number
    email: string
    role: ROLE
}

class TokenService {
    generateJWT (user: UserDto) {
        const refreshSecret = JWT_Secret.getRefreshSecret()
        const accessSecret = JWT_Secret.getAccessSecret()
        
        const refreshToken = jwt.sign({...user}, refreshSecret, {expiresIn: '1h'})
        const accessToken = jwt.sign({...user}, accessSecret, {expiresIn: '30m'})
        return {refreshToken, accessToken}
    }

    validateAccessToken(token: string) {
        try {
            const secret = JWT_Secret.getAccessSecret()
            const decoded = jwt.verify(token, secret) as DecodedToken
            return new UserDto({
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            })
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const secret = JWT_Secret.getRefreshSecret()
            const decoded = jwt.verify(token, secret) as DecodedToken
            return new UserDto({
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            })
        } catch (e) {
            return null
        }
    }

    async findToken(token: string) {
        try {
            const tokenData = await Token.findOne({where: {refreshToken: token}})
            return tokenData
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async saveToken(userId: number, token: string) {
        try {
            const tokenData = await Token.findOne({where: {userId}})

            if (tokenData) {
                tokenData.refreshToken = token
                return await tokenData.save()
            }
            const newTokenData = await Token.create({userId, refreshToken: token})
            return newTokenData;
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async deleteByToken(token: string) {
        try {
            await Token.destroy({where: {refreshToken: token}})
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async deleteByUserId(userId: number, transaction?: Transaction) {
        try {
            await Token.destroy({where: {userId}, transaction: transaction})
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }
}

export default new TokenService()