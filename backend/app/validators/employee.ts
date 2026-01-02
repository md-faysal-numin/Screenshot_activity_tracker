import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createEmployeeValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    email: vine
      .string()
      .trim()
      .email()
      .normalizeEmail()
      .unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(6).maxLength(100),
  })
)
createEmployeeValidator.messagesProvider = new SimpleMessagesProvider({
  // name
  'name.required': 'Employee name is required',
  'name.minLength': 'Name must be at least {{ min }} characters',
  'name.maxLength': 'Name must not exceed {{ max }} characters',

  // email
  'email.required': 'Employee email is required',
  'email.email': 'Please provide a valid email address',
  'email.database.unique': 'Email is already in exists',

  // password
  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least {{ min }} characters',
  'password.maxLength': 'Password must not exceed {{ max }} characters',
})
