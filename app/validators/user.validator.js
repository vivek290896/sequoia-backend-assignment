const { body, validationResult } = require('express-validator/check')
const userValidationRules = () => {
    return [
        body('name').exists(),
        body('email','invalid email_id').isEmail(),
        body('type','please enter valid user type').isIn(['user','admin']),
        body('password').isLength({ min: 5 }),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userValidationRules,
    validate,
}