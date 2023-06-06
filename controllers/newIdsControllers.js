const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class NewIdsController {

    getNewIds = async(req, res) => {
        try {
            const newIds = await prisma.newids.findMany();
            res.status(200).json(newIds);
        } catch (error) {           
                res.status(500).json({ error: "Erro ao buscar newIds." });
            
        }
    }

    createNewIds = async(req, res) => {
        const { user_id } = req.body;
        try {
            const newIds = await prisma.newids.create({
                data: { user_id },
            });
            res.json(newIds);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar newIds." });
        }
    }

    updateNewIds = async(req, res) => {
        const { id } = req.params;
        const { user_id } = req.body;
        try {
            const updatedNewIds = await prisma.newids.update({
                where: { id: parseInt(id) },
                data: { user_id },
            });
            res.json(updatedNewIds);
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar newIds." });
        }
    }

    deleteNewIds = async(req, res) => {
        const { id } = req.params;
        try {
            const deletedNewIds = await prisma.newids.delete({
                where: { id: parseInt(id) },
            });
            res.json(deletedNewIds);
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar newIds." });
        }
    }
}