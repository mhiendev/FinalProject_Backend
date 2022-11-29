const knex = require('../database/knex');

class StationeryService{
    constructor(){
        this.customers = knex('customers');
        this.products = knex('product');
        this.orders = knex('orderlist')
    }

    #getCustomer(payload){
        const stationery = { ...payload };
        const stationeryProperties = [
            "fullname", "address", "phone", "vip_mbrshp"
        ];
        //Remove non-customer properties
        Object.keys(stationery).forEach(function(key) {
            if(stationeryProperties.indexOf(key) == -1) {
                delete stationery[key];
            }
        });
        return stationery;
    }
    async createCus(payload) {
        const stationery = this.#getCustomer(payload);
        const [id] = await this.customers.insert(stationery);
        return {id, ...stationery};
    }
    
    #getProduct(payload){
        const stationery = { ...payload };
        const stationeryProperties = [
            "prod_name", "quantity", "unit_price", "prod_detail"
        ];
        //Remove non-products properties
        Object.keys(stationery).forEach(function(key) {
            if(stationeryProperties.indexOf(key) == -1) {
                delete stationery[key];
            }
        });
        return stationery;
    }
    async createPrd(payload) {
        const stationery = this.#getProduct(payload);
        const [id] = await this.products.insert(stationery);
        return {id, ...stationery};
    }

    async allPrd(){
        return await this.products.select('*');
    } 

    async findPrdByName(prod_name){
        return await this.products
            .where('prod_name', 'like', `%${prod_name}%`)
            .select('*');
    }

    async update(id, payload){
        const update = this.#getProduct(payload);
        return await this.products.where('id', id).update(update);
    }

    async delete(id){
        return await this.orders.where('id', id).del();
    }
    
    async findOrdByName(ord_name){
        return await this.orders
            .select('product.id as product_id', 'orderlist.id', 'orderlist.purchased_day', 'product.unit_price',
            'orderlist.total', 'product.prod_name', 'customers.fullname').first()
            .join('product', 'product.id', 'orderlist.prod_id')
            .leftJoin('customers', 'customers.id', 'orderlist.cus_id')
            .where('customers.fullname', 'like', `%${ord_name}%`)
    }

    async allOrd(){
        return await this.orders
            .select('product.id as product_id', 'orderlist.id', 'orderlist.purchased_day', 'product.unit_price',
            'orderlist.total', 'product.prod_name', 'customers.fullname')
            .join('product', 'product.id', 'orderlist.prod_id')
            .leftJoin('customers', 'customers.id', 'orderlist.cus_id')
    } 

    async allVIP(){
        return await this.customers.where('vip_mbrshp', 1).select('*');
    }

    async getProd(id){
        return await this.products.where('id', id).select("*").first()
    }
}

module.exports = StationeryService;
