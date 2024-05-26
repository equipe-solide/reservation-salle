require('module-alias/register');
const { PrismaClient } = require('@prisma/client');
const { users, issues } = new PrismaClient(); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

// generate random token 
const generateRandomToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 32;
  let token = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  
  return token;
};

const unset = (obj, properties) => {
    properties.forEach(property => {
        delete obj[property];
    });
}

module.exports = {
    index: async(req, res, next) => {
       try {
            const users_ = await users.findMany(); 
            return res.json(users_);

       } catch (error) {
            next(error);
       } 
    }, 
    show: async(req, res, next) => {
        try {
            const { id } = req.params;
            const user = await users.findFirst({ where: {id: +id} }); 
            return res.json(user);

        } catch (error) {
            next(error);
        }
    },

    register: async(req, res, next) => {
        try {
            const { nom, prenoms, email, password, role } = req.body;
            const userExists = await users.findFirst({ where: { email } });
            if (userExists) return res.json({ error: "Cet users existe déja" });

            // Hash password 
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const new_user = await users.create({
                data: {nom, prenoms, email, password: hashedPassword, role },
            }); 

            // remove id and password attributes from new_user
            unset(new_user, ['id', 'password']);
            
            return res.json(new_user);

        } catch (error) {
            next(error);
        }
    }, 
    login: async(req, res, next) => {
        try {
            const { email, password } = req.body; 

            // Get user from users table
            const user = await users.findFirst({ where: { email } });
            if (!user) return res.json({ error: "Cet utilisateur n'existe pas" });

            // check password using bcrypt
            bcrypt.compare(password, user.password, async (err, result) => {
                if(err) throw new Error(err)

                if(result) {
                    const randomToken = generateRandomToken();
                    const access_token = jwt.sign(
                        {email: user.email}, 
                        randomToken, 
                        { expiresIn:"24h" }
                    ); 
                
                    res.cookie('auth_token', randomToken, {
                        httpOnly: true, 
                        sameSite: 'None', 
                        secure: true, 
                        maxAge: 24 * 60 * 60 * 1000
                    }); 

                    return res.json({ 
                        access_token, 
                        user: { email: user.email, role: user.role }
                    });
                }

                else return res.json({ error: "Mot de passe incorrect" });
            }) 

        } catch (error) {
            next(error);
        }
    }, 
    updateRole: async(req, res, next) => {
        try {
            const { id } = req.params;
            const { role } = req.body;

            const updatedUser = await users.update({
                where: {id: +id}, 
                data: { role }
            })

            unset(updatedUser, ['id', 'password']);
            return res.json(updatedUser);

        } catch (error) {
            next(error);
        }
    }, 
    
    updatePassword: async(req, res, next) => {
        try {
            const { id } = req.params;
            const { password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const updatedUser = await users.update({
                where: {id: +id}, 
                data: { password: hashedPassword }
            });

            unset(updatedUser, ['id', 'password']);
            return res.json(updatedUser);
         
        } catch (error) {
            next(error);
        }
    }, 

    delete: async(req, res, next) => {
        try {
            const { id } = req.params;
            const deletedUser = await users.delete({ where: {id: +id} }); 
            unset(deletedUser, ['id', 'password']);
            return res.json(deletedUser);
           
        } catch (error) {
            next(error);
        }
    }
}