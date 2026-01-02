import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const registerCompanyValidator = vine.compile(
  vine.object({
    ownerName: vine.string().trim().minLength(2).maxLength(100),
    ownerEmail: vine.string().trim().email().unique({ table: 'users', column: 'email' }),
    ownerPassword: vine.string().minLength(6).maxLength(20),
    companyName: vine
      .string()
      .trim()
      .minLength(2)
      .maxLength(100)
      .unique({ table: 'companies', column: 'name' }),
    planId: vine.number().positive().parse(Number),
  })
)

registerCompanyValidator.messagesProvider = new SimpleMessagesProvider({
  // ownerName
  'ownerName.required': 'Owner name is required',
  'ownerName.string': 'Owner name must be a string',
  'ownerName.minLength': 'Owner name must be at least {{ min }} characters',
  'ownerName.maxLength': 'Owner name must not exceed {{ max }} characters',

  // ownerEmail
  'ownerEmail.required': 'Owner email is required',
  'ownerEmail.email': 'Please provide a valid email address',
  'ownerEmail.database.unique': 'This email is already registered',

  // ownerPassword
  'ownerPassword.required': 'Password is required',
  'ownerPassword.minLength': 'Password must be at least {{ min }} characters',
  'ownerPassword.maxLength': 'Password must not exceed {{ max }} characters',

  // companyName
  'companyName.required': 'Company name is required',
  'companyName.minLength': 'Company name must be at least {{ min }} characters',
  'companyName.maxLength': 'Company name must not exceed {{ max }} characters',
  'companyName.database.unique': 'Company name already exists',

  // planId
  'planId.required': 'Plan is required',
  'planId.number': 'Plan must be a valid number',
  'planId.positive': 'Plan must be a positive number',
})

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail(),
    password: vine.string(),
  })
)
loginValidator.messagesProvider = new SimpleMessagesProvider({
  // email
  'email.required': 'Email is required',
  'email.email': 'Please provide a valid email address',

  // password
  'password.required': 'Password is required',
})


