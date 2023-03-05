const orderServices = require('../services/orderServices');
const userServices = require('../services/userServices');

async function createOrder(req, res){
    try{
        let orderObj = req.body ? req.body : null;

        if(!orderObj){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const cart = await userServices.getCart(orderObj.user_id);
        orderObj.items = cart.items;
        orderObj.total_price = cart.total_price;

        const result = await orderServices.createOrder(orderObj);

        if(result){
            const isAdded = await userServices.appendOrderID(orderObj.user_id, result);

            if(isAdded){
                return res.status(201).json({ order_id: result });
            }else{
                return res.status(400).json({message:'Created But Not Appended in User Collection Doc! '});

            }
        }

        return res.status(400).json({message:'Not Created! '});
    }catch(err){
        return res.status(400).json({ error: err.message });
    } 
}

async function getOrderAll(req, res){
    try{
        const user_id = req.body.user_id ? req.body.user_id : null;

        if(!user_id){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const result = await orderServices.getOrderAll(user_id);

        if(result === null){
            return res.status(400).json({message:'There is some Problem! '});
        }

        res.status(200).json(result);
    }catch(err){
        return res.status(400).json({ error: err.message });
    } 
}

async function getOrderOne(req, res){
    try{
        const order_id = req.body.order_id ? req.body.order_id : null;

        if(!order_id){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const result = await orderServices.getOrderOne(order_id);

        if(result === null){
            return res.status(400).json({message:'There is some Problem! '});
        }

        res.status(200).json(result);
    }catch(err){
        return res.status(400).json({ error: err.message });
    } 
}

async function cancelOrder(req, res){
    try{
        const order_id = req.body.order_id ? req.body.order_id : null;

        if(!order_id){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const result = await orderServices.cancelOrder(order_id);

        if(!result){
            return res.status(400).json({message:'There is some Problem! '});
        }

        res.status(200).json({message:'Order Cancelled! '});
    }catch(err){
        return res.status(400).json({ error: err.message });
    } 
}

module.exports = {
    getOrderAll,
    cancelOrder,
    createOrder,
    getOrderOne,
}

