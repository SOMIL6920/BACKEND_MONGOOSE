import jwt from "jsonwebtoken";
export const isLoggedIn = async (req, res, next) => {
    try {
        console.log("req.cookies");
        let token = req.cookies?.token

        console.log('Token Found:', token ? "Yes" : "No");
        if(!token) {
            console.log("No token");
            return res.status(401).json({
                sucess: false,
                message: "Authentication failed"
            })
            
        }
         
         jwt.verify(token, process.env.JWT_SECRET)
         console.log("decoded data:", decoded);
         req.user = decoded;

          
        
    } catch (error) {
        console.log("Auth middleware failure");
        return res.status(500).json({
            sucess: false,
            message: "Internal server error"
        })
        
    }

    next();
}