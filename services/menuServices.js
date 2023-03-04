const { Menu } = require("../models/Menu");


async function addCategory(category){
    const categoryObj = {
        category: category,
        items: [],
    }
    const Category = new Menu(categoryObj);
    const exists = await Menu.exists({
        category: {
            $regex: Category.category,
            $options: "i",
          },
    });
    if(exists){
        return false;
    }
    await Category.save();
    return Category._id;
}

async function addItem(Category, itemObj){
    const result = await Menu.updateOne({
        category: Category,
        "items.name": { $ne: itemObj.name }
    },
    {
        $push: {
            items: itemObj
        }
    });
    //console.log(result)

    if(result.modifiedCount > 0){
        return true;
    }
    return false
}

async function getCategories(){
    const result = await Menu.find();

    if(result.length > 0){
        return result;
    }
    return null;
}

async function getItems(category){
    const result = await Menu.findOne({category: category});

    if(result){
        return result.items;
    }
    return null;
}

module.exports = {
    addCategory,
    addItem,
    getCategories,
    getItems,
}