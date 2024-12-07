

const LoptopSchema = require('../schema/Loptops')


const addLoptop = async (req, res) => {
    const { brand, model, serialno, status, purchaseDate } = req.body;

    try {

        const newLaptop = new LoptopSchema({
            brand, model, serialno, status, purchaseDate
        })

        const data = await newLaptop.save()

        res.send({
            status: 201,
            message: "New Loptop Added",
            data: data
        })

    } catch (err) {
        console.log(err)
        res.send({
            status: 500,
            message: "Server  Error"
        })
    }

}

const getLoptop = async (req, res) => {

    try {

        const totalLaptops = await LoptopSchema.countDocuments();
        const availableLaptops = await LoptopSchema.countDocuments({ status: 'available' });
        const assignedLaptops = await LoptopSchema.countDocuments({ status: 'assigned' });
        const maintenanceLaptops = await LoptopSchema.countDocuments({ status: 'maintenance' });

        const loptops = await LoptopSchema.find({});

        res.send({
            statsu: 200,
            data: loptops,
            totalLaptops,
            availableLaptops,
            assignedLaptops,
            maintenanceLaptops
        })
    } catch (err) {
        res.send({
            status: 500,
            error: 'Server error'
        })
    }


}

const updateLoptop = async (req, res) => {

    const { id } = req.params;

    const { brand, model, serialno, status, purchaseDate } = req.body;
    try {


        if (!brand && !model && !serialno && !status && !purchaseDate) {
            return res.send({

                status: 400,
                message: 'No valid fields to update',

            })
        }
        const updatedLaptop = await LoptopSchema.findByIdAndUpdate(id, { brand, model, serialno, status, purchaseDate }, { new: true })

        if (!updatedLaptop) {
            return res.status(404).json({ error: 'Laptop not found' });
        }
        res.json(updatedLaptop);

    } catch (err) {

        console.log(err)
        res.send({
            status: 400,
            message: "Updation error"
        })
    }
}

const deleteLoptop = async (req, res) => {

    const { id } = req.params;

    try {

        const deleteLoptop = await LoptopSchema.findByIdAndDelete(id)

        if (!deleteLoptop) {
            res.send({
                status: 404,
                message: 'Laptop not found'
            })
        }

        res.send({
            status: 200,
            message: 'Loptop Deleted'
        })

    } catch (err) {
        res.send({
            status: 400,
            message: "Deleting the Lapto Failed"
        })
    }

}

module.exports = { addLoptop, getLoptop, updateLoptop, deleteLoptop }