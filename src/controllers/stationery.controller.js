const StationeryService = require('../StationeryService/stationery.service');
const ApiError = require('../api-error');

//Create and Save a new product
exports.createPrd = async(req, res, next) => {
    if(!req.body?.prod_name){
        return next(new ApiError(400, 'Product name can not be empty'));
    }

    try{
        const stationeryService = new StationeryService();
        const product = await stationeryService.createPrd(req.body);
        return res.send(product);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while creating a product')
        );
    }
};

//Retrieve all products from the database
exports.findAllProd = async (req, res, next) => {
    let products = []

    try {
        const stationeryService = new StationeryService();
        const {prod_name} = req.query;
        if(prod_name){
            products = await stationeryService.findPrdByName(prod_name);
        } else {
            products = await stationeryService.allPrd();
        }
    }catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error ocurred while retrieving products')
        );
    }
    return res.send(products); 
}

//Retrieve all orders from the database
exports.findAllOrd = async (req, res, next) => {
    let orders = []

    try {
        const stationeryService = new StationeryService();
        const {ord_name} = req.query;
        if(ord_name){
            orders = await stationeryService.findOrdByName(ord_name);
        } else {
            orders = await stationeryService.allOrd();
        }
    }catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error ocurred while retrieving orders')
        );
    }
    return res.send(orders); 
}

//Retrieve all orders from the database
exports.getPrd = async (req, res, next) => {
    try{
        const stationeryService = new StationeryService();
        const product = await stationeryService.getProd(req.params.id);
        if(!product){
            return next(new ApiError(404, 'Product not found'));
        }
        return res.send(product);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(
                500,
                `Error retrieving product with id=${req.params.id}`
            )
        );
    }
};

//Update a product
exports.updatePrd = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try{
        const stationeryService = new StationeryService();
        const updated = await stationeryService.update(req.params.id, req.body);
        if(!updated){
            return next(new ApiError(404, 'Product not found'));
        }
        return res.send({ message: 'Product was updated successfully' });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error updating product with id=${req.params.id}`)
        );
    }
};

//Delete an order with the specified id in the request
exports.deleteOrd = async (req, res, next) => {
    try{
        const stationeryService = new StationeryService();
        const deleted = await stationeryService.delete(req.params.id);
        if(!deleted){
            return next(new ApiError(404, 'Order not found'));
        }
        return res.send({ message: 'An Order was deleted successfully'});
    } catch (error){
        console.log(error);
        return next(
            new ApiError(
                500,

                `Could not delete order with id=${req.params.id}`
            )
        );
    }
};

exports.findAllVIP = async(req, res, next) =>{
    try{
        const stationeryService = new StationeryService();
        const vips = await stationeryService.allVIP();
        return res.send(vips);
    }catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                'An error existed while retrieving VIP customers'
            )
        )
    }
}