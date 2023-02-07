import Joi from 'joi'

const validator = (schema : any) => (payload : any) =>
    schema.validate(payload, {abortEarly: false})

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
  confirmPassword: Joi.string().equal(Joi.ref('password')).required()
})
const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
})


const studentRecordSchema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
    gender: Joi.string().valid("male", "female").required(),
    address: Joi.string().alphanum().min(3).max(30).required(),
    mobile: Joi.number().required(),
    dob: Joi.date().required(),
    age: Joi.number().required()
})

exports.validateSignup = validator(signupSchema)
exports.validateSignIn = validator(signInSchema)
exports.validateStudentRecords = validator(studentRecordSchema)