const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {

        return res.status(401).json({
            status: false,
            message: "Akses ditolak. Silakan login terlebih dahulu."
        });

    }


    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.admin = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            status: false,
            message: "Session tidak valid atau sudah expired"
        });

    }

}

module.exports = authMiddleware;