const Order = require("../models/Order");

async function createOrder(orderObj){
    const order = new Order(orderObj);

    await order.save();

    if(order._id){
        return true;
    }
    return false;
}

async function getOrder(orderID){
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
    getOrder,
    createOrder,
    cancelOrder,
}