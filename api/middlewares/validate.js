export function validateEmailAndPassword(req, res, next) {
    if (req.path.startsWith(`/register`)) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ success: false, message: "Неправильный формат Email. Правильный формат: aaa@gmail.com" });
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(req.body.password)) {
            return res.status(400).json({ success: false, message: "Пароль должен содержать по крайней мере одну цифру, одну букву в нижнем регистре, одну букву в верхнем регистре, и должен состоять из по крайней мере 8 символов." });
        }

        const phoneRegex = /^\+7\d{10}$/;
        if (!phoneRegex.test(req.body.phoneNumber)) {
            return res.status(400).json({ success: false, message: "Неправильный формат номера телефона. Правильный формат \"+79999999999\"" });
        }
    }
    next();
}