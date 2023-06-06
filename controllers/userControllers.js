const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class UserController {
  getUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  };

  createUser = async (req, res) => {
    const { name, email, cpf, verificado } = req.body;
    try {
      // Verifica se já existe um usuário com o mesmo CPF
      const existingUser = await prisma.user.findUnique({
        where: { cpf },
      });

      if (existingUser) {
        // Se já existe um usuário com o mesmo CPF, atualiza o e-mail dele
        const updatedUser = await prisma.user.update({
          where: { id: existingUser.id },
          data: { email },
        });
        res.json(updatedUser);
      } else {
        // Se não existe um usuário com o mesmo CPF, cria um novo usuário
        const newUser = await prisma.user.create({
          data: { name, email, cpf, verificado },
        });
        // Adiciona o id do novo usuário ao newids
        try {
          // Adiciona o id do novo usuário ao newids
          await prisma.newids.create({
            data: { user_id: newUser.id },
          });
        } catch (error) {
          console.error(error);
        }
        res.json(newUser);
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar ou atualizar usuário." });
    }
  };

  updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, cpf, verificado, emails_cadastrados } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email, cpf, verificado, emails_cadastrados },
      });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.json(deletedUser);
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir usuário." });
    }
  };
};
