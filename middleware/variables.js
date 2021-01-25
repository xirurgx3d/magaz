module.exports = (req,res,next) =>{
    console.log(req.session.autif)
    if(req.session.autif){
        res.locals.isauth = req.session.autif
        next()
    }else{
        console.log('404')
    }
    
}