const { body, validationResult } = require('express-validator/check')
const projectValidationRules = () => {
    return [
        body('name','Please enter the project name').exists(),
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
    projectValidationRules,
    validate,
}
