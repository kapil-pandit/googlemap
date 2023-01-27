// require("dotenv").config();

const credentials = require('../credentials.json');

module.exports = {

    SERVER: {
        PORT:credentials.port,
        HOST:credentials.host,
    },
    ADMIN_PIN: credentials.admin.pin,
    ADMIN_EMAIL: credentials.admin.email,
    ADMIN_LOGIN_KEY: credentials.admin.loginKey,
    ALLOWED_USERS: credentials.allowedUsers,
    MONGO_DB_URL: credentials.database,
    JWT_PRIVATE_KEY: credentials.jwt.privateKey,
    JWT_REFRESH_KEY: credentials.jwt.refreshKey,
    JWT_REFRESH_EXPIRY: credentials.jwt.refreshExpiry,
    ENCRYPTION_SALT: credentials.encryptionSalt,
    ENCRYPTION_SALT_ADMIN: credentials.encryptionSaltAdmin,

    ALLOWED_ORIGINS: [
        "http://localhost:3000",
    ],


    AWS: {
        accessKeyId: credentials.aws.accessKeyId,
        secretAccessKey: credentials.aws.secretAccessKey,
        region: credentials.aws.region,
        bucketName: credentials.aws.bucketName,
        distributionURL: credentials.aws.distributionURL,
    },

    GOOGLE: {
        AUD: credentials.google.aud,
        AUD_IOS: credentials.google.audiOS,
        AUD_WEB: credentials.google.audWeb,
    },

    DB_COLLECTIONS: {
        MUSIC: "MusicModel",
        USER: "UserModel",
        WALLET: "WalletModel",
        TOKEN_TRANSACTION: "TokenTransactionModel",
        CASH_TRANSACTION: "CashTransactionModel",
        NFT: "NFTModel",
        PLAYLIST: "PlaylistModel",
        PLAYLIST_NFT: "PlaylistNFTModel",
        AUCTION: "AuctionModel",
        SUSBSCRIPTION: "SubscriptionModel",
        STREAMING_HISTORY: "StreamingHistoryModel",
        SUBSCRIBER: "SubscriberModel",
        ALBUM: "AlbumModel",
        VIEW: "ViewModel",
    },

    PAYMENT_GATEWAY: {
        client_id: credentials.paypal.client_id,
        client_secret: credentials.paypal.client_secret,
        URL: credentials.paypal.URL,
        mode: credentials.paypal.mode,
    },

};
