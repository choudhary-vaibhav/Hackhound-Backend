const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userServices = require('../services/userServices');

async function registerUser(req, res){
    try{
        let userObject = req.body ? req.body : null;
        console.log(userObject);

        if(userObject === null){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const password = userObject.password;
        const saltRounds = 10;
        //generating a salt
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            if(err){
                response.status(403).json({message:'Error in user registration! '});
            }else{
                //generating the hash
                bcrypt.hash(password, salt, (err, hash)=>{
                    if(err){
                        response.status(403).json({message:'Error in user registration! '});
                    }else{
                        console.log(hash)
                        userObject.password = hash;
                        userServices.addUser(userObject, res);

                    }
                })
            }
        });
        
        //userObject.password = await genHash(userObject.password);
    //     console.log(userObject.password)
        
    //     if(!result){
    //       return res.status(400).json({ error: 'Something Wrong When User Was Been Registered!' });
    //     }


    //   return res.status(201).json({ user_id: result._id });
    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

async function login(req, res){
    try{
        const email = req.body.email ? req.body.email : null;
        const password = req.body.password ? req.body.password : null;

        if(email === null || password === null){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const doc = await userServices.getUser(email)
            if(doc && doc.email){
                bcrypt.compare(password, doc.password, (err, result)=>{
                    if(result == true){
                        //jwt token if the password matches
                        const token = jwt.sign({id:doc.id}, process.env.JWT_SECRET, {expiresIn: '60000'});
            
                        return res.status(200).json({
                            user:{
                            id:doc._id,
                            name:doc.name,
                            email:doc.email
                            },
                            message: "Login Successful",
                            accessToken: token
                        });

                    }else if(result == false){
                        return res.status(404).json({message:'Invalid Password! '});
                    }else{
                        return res.status(500).json({message:'Internal Server Error! ', err});
                    }
                })
            }else{
                return res.status(404).json({message:'Invalid Email Provided! '});
            }

    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

module.exports = {
    registerUser,
    login,
}