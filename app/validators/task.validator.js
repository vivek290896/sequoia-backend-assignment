const { body, validationResult } = require('express-validator/check')
const taskValidationRules = () => {
    return [
        body('title','Please enter the title').exists(),
        body('project_id','please enter the project id').exists(),
        body('status','please enter valid task status').isIn(['Backlog', 'InProgress', 'Done']),
        body('due_date','due_date cannot be empty').exists(),
        body('description','description cannot be empty').exists(),
        body('assignee_email','assignee_id cannot be empty or invalid email').isEmail(),
        body('assigner_email','assigner_id cannot be empty or invalid email').isEmail()
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
    taskValidationRules,
    validate,
}