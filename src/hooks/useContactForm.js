/*
  hooks/useContactForm.js
  ─────────────────────────────────────────────
  LESSON: Custom Hooks
  
  A custom hook is a function that:
    1. Starts with "use" (convention, enforced by linter)
    2. Can call other hooks (useState, useEffect, etc.)
    3. Returns data/functions for components to use
  
  WHY custom hooks?
    Without this hook, every form component would need:
      - 8+ useState calls
      - The same handleChange logic
      - The same EmailJS submit logic
    That's massive code duplication.
    
    With this hook, any component just calls:
      const { fields, handleChange, handleSubmit, status, message } = useContactForm(...)
    
    And gets everything ready to use. One line.
  
  HOW EmailJS works:
    EmailJS is a service that sends emails from the browser
    without a backend server. It works like this:
      Browser → EmailJS API → Your Email (Gmail/Outlook/etc.)
    
    You configure templates on emailjs.com with variables like
    {{from_name}}, {{message}}, etc., and we fill them here.
*/
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { CONFIG } from '../data/index.js'

/*
  initialFields: object with field names and empty string values
  Example: { name: '', email: '', message: '' }
  
  The hook is generic — pass any shape of initial fields.
  This makes it reusable for ALL our forms (quick form, full form, etc.)
*/
export function useContactForm(initialFields) {
  // One state object for all fields
  const [fields, setFields] = useState(initialFields)
  
  /*
    status tracks the email sending lifecycle:
      'idle'    → nothing happening
      'loading' → email is being sent (show spinner/disable button)
      'success' → email sent! (show success message)
      'error'   → something went wrong (show error)
  */
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  /*
    handleChange uses CURRYING:
    It's a function that RETURNS a function.
    
    handleChange('name') returns (event) => { ... }
    
    This lets us write:  onChange={handleChange('name')}
    Instead of:          onChange={(e) => setFields({...fields, name: e.target.value})}
    
    The [fieldName] syntax is a "computed property key" —
    it uses the variable's value as the key name.
    
    IMMUTABILITY: We never mutate state directly!
    {...fields} creates a NEW object with all existing fields.
    Then [fieldName]: e.target.value adds/updates that one field.
    React detects the new object reference and re-renders.
  */
  const handleChange = (fieldName) => (e) => {
    setFields(prev => ({ ...prev, [fieldName]: e.target.value }))
  }

  /*
    handleSubmit is async because emailjs.send() returns a Promise.
    Promises represent future values (async operations).
    await pauses execution until the Promise resolves.
    try/catch handles success vs failure.
    
    e.preventDefault() stops the default browser form behavior
    (which would reload the page — deadly in a SPA!).
  */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      /*
        emailjs.send(serviceId, templateId, templateParams, publicKey)
        
        templateParams maps to your EmailJS template variables.
        {{from_name}} in the template = fields.name here.
      */
      await emailjs.send(
        CONFIG.emailjs.serviceId,
        CONFIG.emailjs.templateId,
        {
          from_name:  fields.name    || fields.contact || '',
          reply_to:   fields.email   || '',
          hotel:      fields.hotel   || '',
          phone:      fields.phone   || '',
          service:    fields.service || '',
          delay:      fields.delay   || '',
          duration:   fields.duration|| '',
          message:    fields.message || '',
        },
        CONFIG.emailjs.publicKey
      )
      await emailjs.send(
  CONFIG.emailjs.serviceId,
  'template_autoreply',
  {
    to_name:  fields.name || fields.contact || '',
    to_email: fields.email || '',
  },
  CONFIG.emailjs.publicKey
)

      setStatus('success')
      setMessage('✅ Message envoyé ! Nous vous répondons sous 1h.')
      // Reset all fields back to initial empty state
      setFields(initialFields)

    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setMessage('❌ Erreur d\'envoi. Appelez-nous directement au ' + CONFIG.contact.phone)
    }
  }

  // Expose only what components need
  return { fields, handleChange, handleSubmit, status, message }
}
