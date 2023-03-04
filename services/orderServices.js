const Order = require("../models/Order");

async function createOrder(orderObj){
    const order = new Order(orderObj);

    await order.save();

    if(order._id){
        return order._id;
    }
    return null;
}

async function getOrderAll(userID){
    const data = await Order.find({
        user_id: userID
    });

    if(data){
        return data;
    }
    return null;
}

async function getOrderOne(orderID){
    const data = await Order.findOne({
        _id: orderID
    });

    if(data){
        return data;
    }
    return null;
}

async function cancelOrder(orderID){
    const data = await Order.findOneAndDelete({
        _id: orderID,
    });

    if(data){
        return true;
    }
    return false;
}

module.exports = {
    getOrderAll,
    createOrder,
    cancelOrder,
    getOrderOne
}