
export const DisplayController =async (req,res ) => {
    try {
       res.send([global.food_items,global.foodCatagory ])  
    } catch (error) {
        console.error(error.message);
        res.send("Serever Error")
    }
}