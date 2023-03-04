const menuServices = require('../services/menuServices');

async function addCategory(req, res){
    try{
        const category = req.body.category ? req.body.category : null;
        if(category === null){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const categoryID = await menuServices.addCategory(category);

        if(!categoryID){
            return res.status(400).json({message:'Not Created! '});
        }

        return res.status(201).json({ category_id: categoryID });
    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

async function addItem(req, res){
    try{
        const category = req.params.category ? req.params.category : null;
        const itemObj = req.body.itemObj ? req.body.itemObj : null;
        //console.log(itemObj)
        //console.log(category)

        if(category === null || itemObj === null){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const result = await menuServices.addItem(category, itemObj);

        if(!result){
            return res.status(400).json({message:'Not Added! '});
        }

        return res.status(200).json({message:'Added! '});
    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

async function getCategories(req, res){
    try{
        const result = await menuServices.getCategories();

        if(result === null){
            return res.status(400).json({message:'Error!'});
        }

        return res.status(200).json(result);
    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

async function getItems(req, res){
    try{
        const category = req.params.category ? req.params.category : null;

        if(category === null){
            return res.status(400).json({ message: "Parameter Error!" });
        }

        const result = await menuServices.getItems(category);

        if(result === null){
            return res.status(400).json({message:'Error!'});
        }

        return res.status(200).json(result);
    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getCategories,
    getItems,
    addCategory,
    addItem
}