const requireLogin = (req,res,next)=>{
    if(!req.user){
        res.redirect('/login')
    }
    next();
}
