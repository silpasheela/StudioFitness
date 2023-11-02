const Joi = require('joi')

const signUpValidation = Joi.object({
    
    fullName: Joi.string()
            .min(4)
            .max(40)
            // .required()
            .messages({
                "any.required": "Name is required",
            }),
    email: Joi.string()
        .email({ minDomainSegments: 2})
        // .required()
        .messages({
            "any.required": "Email is required",
            "string.email": "Invalid email format",
        }),
    mobileNumber: Joi.string()
                .pattern(/^[0-9]{10}$/)
                // .required()
                .messages({
                    "any.required": "Mobile number is required",
                    "string.pattern.base": "Mobile number must be a 10-digit number",
                }),
    password: Joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$'))
            // .required()
            .messages({
                "any.required": "Password is required",
                "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
            }),
    confirmPassword: Joi.string()
                    .valid(Joi.ref('password'))
                    // .required()
                    .messages({
                        "any.required": "Confirm password is required",
                        "any.only": "Password does not match", 
                    }),
    gender: Joi.string()
            // .required()
            .messages({
                "any.required": "This field is required"
            }),
    dateOfBirth: Joi.date()
                .min('1-1-1900')
                .max('12-31-2013')
                // .required()
                .messages({
                    'date.base': '"dateOfBirth" must be a valid date',
                    'date.min': '"dateOfBirth" must be later than Jan 1, 1900',
                    'date.max': '"dateOfBirth" must be earlier than Dec 31, 2013',
                    'any.required': 'This field is required'
                })
})


const loginValidation = Joi.object({
    
    email: Joi.string()
        .email({ minDomainSegments: 2})
        .required()
        .messages({
            "any.required": "Email is required",
            "string.email": "Invalid email format",
        }),
    password: Joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$'))
            .required()
            .messages({
                "any.required": "Password is required",
            })
})

const userProfileUpdateValidation = Joi.object({

    fullName: Joi.string()
    .min(4)
    .max(40)
    // .required()
    .messages({
        "any.required": "Name is required",
    }),
    gender: Joi.string()
        .required()
        .messages({
            "any.required": "This field is required"
    }),
    mobileNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "any.required": "Mobile number is required",
            "string.pattern.base": "Mobile number must be a 10-digit number",
    }),
    address: Joi.object({
        street: Joi.string()
                .required()
                .messages({
                    "any.required": "Street is required",
        }),
        city: Joi.string()
                .required()
                .messages({
                    "any.required": "City is required",
        }),
        state: Joi.string()
                .required()
                .messages({
                    "any.required": "State is required",
        }),
        zip: Joi.string()
                .required()
                .messages({
                    "any.required": "Pin code is required",
        }),
    }),
    dateOfBirth: Joi.date()
            .min('1-1-1900')
            .max('12-31-2013')
            // .required()
            .messages({
                'date.base': '"dateOfBirth" must be a valid date',
                'date.min': '"dateOfBirth" must be later than Jan 1, 1900',
                'date.max': '"dateOfBirth" must be earlier than Dec 31, 2013',
                'any.required': 'This field is required'
    }),
    age: Joi.number()
        .required()
        .messages({
            "any.required": "This field is required"
    }),
    weight: Joi.number()
        .required()
        .messages({
            "any.required": "This field is required"
    }),
    height: Joi.number()
        .required()
        .messages({
            "any.required": "This field is required"
    }),
    profilePicture: Joi.string().optional(),
    bio: Joi.string().optional(),
    stripeCustomerId:Joi.string().optional(),

})


const profilePictureValidation = Joi.object({
    profilePicture: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').optional(),
    bio: Joi.string().optional(),
})


const trainerProfileUpdateValidation = Joi.object({
    mobileNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .messages({
        "any.required": "Mobile number is required",
        "string.pattern.base": "Mobile number must be a 10-digit number",
    }),
    // address: Joi.object({
        street: Joi.string()
                .optional()
                .messages({
                    "any.required": "Street is required",
        }),
        city: Joi.string()
                .optional()
                .messages({
                    "any.required": "City is required",
        }),
        state: Joi.string()
                .optional()
                .messages({
                    "any.required": "State is required",
        }),
        zip: Joi.string()
                .optional()
                .messages({
                    "any.required": "Pin code is required",
        }),
    // }),
    qualification: Joi.string()
        .optional()
        .messages({
            "any.required": "This field is required"
    }),
    certificate: Joi.string()
        // .valid('application/pdf')
        .optional()
        .messages({
            "any.required": "This field is required"
    }),
    service: Joi.string()
        .optional()
        .messages({
            "any.required": "This field is required"
    }),
    // profilePicture: Joi.string().valid('image/jpeg', 'image/png').optional(),
})

module.exports = {
    signUpValidation,
    loginValidation,
    userProfileUpdateValidation,
    trainerProfileUpdateValidation,
    profilePictureValidation
}