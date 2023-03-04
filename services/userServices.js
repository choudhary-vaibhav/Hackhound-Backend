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

async function appendOrderID(userID, orderID){
    const result = await User.updateOne({
        _id: userID,
    },
    {
        $push: {
            orders: orderID,
        }
    });

    if(result.modifiedCount>0){
        return true;
    }
    return false;
}

async function getCart(userID){
    const data = await User.findOne({_id: userID}).lean();

    if(data){
        let total_price = 0;
        for(let i=0; i<data.cart.length; i++){
            total_price += data.cart[i].price * data.cart[i].quantity;
        }

        const result = {
            "total_price": total_price,
            "items": data.cart,
        }
        return result;
    }
    return null;
}

async function addItemToCart(userID, itemObj){
    const result = await User.updateOne({
        _id: userID,
    },
    {
        $push: {
            cart: itemObj,
        }
    });

    if(result.modifiedCount>0){
        return true;
    }
    return false;
}

async function removeItemFromCart(userID, itemID){
    const result = await User.updateOne({
        _id: userID,
        'cart._id': itemID,
    },
    {
        $pull: {
            'cart': {
                _id: itemID,
            }
        }
    });

    if(result.modifiedCount>0){
        return true;
    }
    return false;
}

async function clearCart(userID){
    const result = await User.updateOne({
        _id: userID,
    },
    {
        $set: {
            cart: []
        }
    });

    if(result.modifiedCount>0){
        return true;
    }
    return false;  
}

async function updateItemCount(userID, itemID, new_quantity){
    const result = await User.updateOne({
        _id: userID,
        'cart._id': itemID,
    },
    {
        $set: {
            "cart.$.quantity": new_quantity,
        }
    });

    if(result.modifiedCount>0){
        return true;
    }
    return false; 
}

module.exports = {
    addUser,
    getUser,
    getUserByID,
    getCart,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    updateItemCount,
    appendOrderID,
}