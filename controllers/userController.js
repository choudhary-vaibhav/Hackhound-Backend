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
                        const token = jwt.sign({id:doc.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
            
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
                        return res.status(400).json({message:'Invalid Password! '});
                    }else{
                        return res.status(400).json({message:'Internal Server Error! ', err});
                    }
                })
            }else{
                return res.status(404).json({message:'Invalid Email Provided! '});
            }

    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

async function getProfile(req, res){
    try{
        const email = req.body.email ? req.body.email : null;
        if(!email){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const result = await userServices.getUser(email);

        if(!result){
            return res.status(400).json({message:'There is some Problem! '});
        }
        const resultObj = {
            name: result.name,
            "_id": result._id,
            email: result.email,
            contact: result.contact
        }

        res.status(200).json(resultObj);
    }catch(err){
        return res.status(400).json({ error: err.message });
    } 
}

async function getCart(req, res){
    try{
        const user_id = req.params.user_id ? req.params.user_id : null;

        if(!user_id){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const result = await userServices.getCart(user_id);

        if(result === null){
            return res.status(400).json({message:'There is some Problem! '});
        }

        res.status(200).json(result);
    }catch(err){
        return res.status(400).json({ error: err.message });
    } 
}

async function clearCart(req, res){
    try{
        const user_id = req.params.user_id ? req.params.user_id : null;

        if(!user_id){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const result = await userServices.clearCart(user_id);

        if(result === null){
            return res.status(400).json({message:'There is some Problem! '});
        }

        res.status(200).json({message:'Cart is Now Empty! '});

    }catch(err){
        return res.status(400).json({ error: err.message });
    } 
}

async function addItemToCart(req, res){
    try{
        const user_id = req.params.user_id ? req.params.user_id : null;
        const itemObj = req.body ? req.body : null;

        if(!user_id || !itemObj){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const result = await userServices.addItemToCart(user_id, itemObj);

        if(result === null){
            return res.status(400).json({message:'There is some Problem! '});
        }

        res.status(200).json({message:'Item Added! '});
    }catch(err){
        return res.status(400).json({ error: err.message });
    } 
    
}

async function removeItemToCart(req, res){
    try{
        const user_id = req.params.user_id ? req.params.user_id : null;
        const item_id = req.body.item_id ? req.body.item_id : null;

        if(!user_id || !item_id){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const result = await userServices.removeItemFromCart(user_id, item_id);

        if(result === null){
            return res.status(400).json({message:'There is some Problem! '});
        }

        res.status(200).json({message:'Item Removed! '});
    }catch(err){
        return res.status(400).json({ error: err.message });
    } 
    
}

async function updateItemCount(req, res){
    try{
        const user_id = req.params.user_id ? req.params.user_id : null;
        const item_id = req.body.item_id ? req.body.item_id : null;
        const new_quantity = req.body.new_quantity ? req.body.new_quantity : null;

        if(!user_id || !item_id){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const result = await userServices.updateItemCount(user_id, item_id, new_quantity);

        if(result === null){
            return res.status(400).json({message:'There is some Problem! '});
        }

        res.status(200).json({message:'Item Quantity Updated! '});
    }catch(err){
        return res.status(400).json({ error: err.message });
    } 
    
}



module.exports = {
    registerUser,
    login,
    getProfile,
    getCart,
    clearCart,
    addItemToCart,
    removeItemToCart,
    updateItemCount,
}