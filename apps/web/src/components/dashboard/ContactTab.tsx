import { Button } from '@/components/ui/button'

const ContactTab = () => {
  return (
    <div className="p-6 bg-background rounded-lg shadow-md">
      <p className="mb-6 ">
        We value your input! Please provide your name, email, and a detailed
        message regarding your inquiry or feedback. Our team will respond
        promptly.
      </p>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 border border-muted rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 border border-muted rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            required
            className="w-full h-32  px-4 py-2 border border-muted rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <Button type="submit" variant="primary" className="w-full py-2">
          Send Message
        </Button>
      </form>
    </div>
  )
}

export default ContactTab
