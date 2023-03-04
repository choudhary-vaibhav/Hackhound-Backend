const { User } = require('../models/User');

async function addUser(userObj, res){
    //console.log(userObj)
    const user = new User(userObj);
    const exists = await User.exists({email: userObj.email}); 
    if (exists){
        return res.status(400).json({ error: 'User Already Exists!' });
    }
    await user.save();
    return res.status(201).json({user_id: user._id });
}

async function getUser(email){
    const data = await User.findOne({
        email: email
    });

    if(data){
        return data;
    }
    return null;
}

async function getUserByID(userID){
    const data = await User.findOne({_id : userID});

    if(data){
        return true;
    }
    return false;
}

module.exports = {
    addUser,
    getUser,
    getUserByID,
}